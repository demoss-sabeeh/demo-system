import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findOrCreateCustomer, findOrCreateVehicle, runInstantResponse, serviceBySlug } from "./intake.server";
import { knowledgeAsText, SERVICES, BUSINESS, TIME_SLOTS } from "./knowledge";

const contact = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
});
const vehicle = z.object({
  year: z.coerce.number().int().min(1950).max(2030),
  make: z.string().trim().min(1).max(40),
  model: z.string().trim().min(1).max(60),
  color: z.string().trim().max(40).default(""),
});

const quoteSchema = z.object({
  contact,
  vehicle,
  serviceSlug: z.string().max(60),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  preferredTime: z.string().max(30).optional(),
  condition: z.string().max(40).optional(),
  notes: z.string().max(1000).optional(),
});

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quoteSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const svc = await serviceBySlug(db, data.serviceSlug);
    const customerId = await findOrCreateCustomer(db, data.contact);
    const vehicleId = await findOrCreateVehicle(db, customerId, data.vehicle);
    const premium = ["BMW", "Porsche", "Mercedes", "Mercedes-AMG", "Audi", "Land Rover", "Range Rover", "Chevrolet"].some((m) => data.vehicle.make.toLowerCase().includes(m.toLowerCase()));
    const estimate = svc.price_from + (premium ? 300 : 100);
    const { data: lead, error } = await db
      .from("leads")
      .insert({
        customer_id: customerId,
        vehicle_id: vehicleId,
        service_id: svc.id,
        source: "website",
        status: "new",
        estimated_value: estimate,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime || null,
        vehicle_condition: data.condition || null,
        notes: data.notes ?? "",
      })
      .select("id")
      .single();
    if (error || !lead) throw new Error("We couldn't submit your request. Please try again.");
    await db.from("lead_activities").insert({ lead_id: lead.id, customer_id: customerId, type: "inquiry", title: "Website inquiry submitted", detail: `Quote request for ${svc.name} on ${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}` });
    await db.from("notifications").insert({ title: "New website inquiry", body: `${data.contact.firstName} ${data.contact.lastName} requested ${svc.name}.` });
    await runInstantResponse(db, { leadId: lead.id, customerId, firstName: data.contact.firstName, serviceName: svc.name });
    return { leadId: lead.id, service: svc.name, estimate };
  });

export const getAvailability = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const start = new Date(`${data.date}T00:00:00-06:00`);
    const end = new Date(start.getTime() + 30 * 3600 * 1000);
    const { data: rows } = await db
      .from("appointments")
      .select("starts_at")
      .gte("starts_at", start.toISOString())
      .lt("starts_at", end.toISOString())
      .not("status", "in", "(cancelled,no_show)");
    const taken = (rows ?? []).map((r) =>
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" }).format(new Date(r.starts_at)),
    );
    const day = new Date(`${data.date}T12:00:00Z`).getUTCDay();
    if (day === 0) return { slots: [] as { time: string; available: boolean }[], closed: true };
    const slots = (day === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS).map((t) => ({ time: t, available: !taken.includes(t) }));
    return { slots, closed: false };
  });

const bookingSchema = z.object({
  contact,
  vehicle,
  serviceSlug: z.string().max(60),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().max(20),
  startsAt: z.string().datetime(),
  notes: z.string().max(1000).optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const svc = await serviceBySlug(db, data.serviceSlug);
    const { data: clash } = await db.from("appointments").select("id").eq("starts_at", data.startsAt).not("status", "in", "(cancelled,no_show)").limit(1);
    if (clash && clash.length) throw new Error("That time was just booked. Please choose another slot.");
    const customerId = await findOrCreateCustomer(db, data.contact);
    const vehicleId = await findOrCreateVehicle(db, customerId, data.vehicle);
    const { data: lead } = await db
      .from("leads")
      .insert({ customer_id: customerId, vehicle_id: vehicleId, service_id: svc.id, source: "website", status: "booked", estimated_value: svc.price_from, preferred_date: data.date, preferred_time: data.time, notes: data.notes ?? "" })
      .select("id")
      .single();
    const { data: appt, error } = await db
      .from("appointments")
      .insert({ customer_id: customerId, vehicle_id: vehicleId, service_id: svc.id, lead_id: lead?.id ?? null, starts_at: data.startsAt, duration_hours: svc.duration_hours, status: "confirmed", notes: data.notes ?? "" })
      .select("id, location")
      .single();
    if (error || !appt) throw new Error("We couldn't confirm your appointment. Please try again.");
    if (lead) {
      await db.from("lead_activities").insert([
        { lead_id: lead.id, customer_id: customerId, type: "inquiry", title: "Online booking submitted", detail: `${svc.name} on ${data.date} at ${data.time}` },
        { lead_id: lead.id, customer_id: customerId, type: "booked", title: "Appointment booked", detail: `${svc.name} confirmed for ${data.date} at ${data.time}` },
      ]);
    }
    await db.from("messages").insert({ customer_id: customerId, lead_id: lead?.id ?? null, channel: "sms", direction: "outbound", automated: true, body: `You're confirmed! ${svc.name} on ${data.date} at ${data.time} at ${BUSINESS.address}. Reply C to confirm or R to reschedule.` });
    await db.from("follow_ups").insert({ customer_id: customerId, vehicle_id: vehicleId, lead_id: lead?.id ?? null, type: "appointment_reminder", reason: "Appointment reminder — 24 hours before", next_contact_at: new Date(new Date(data.startsAt).getTime() - 24 * 3600 * 1000).toISOString(), status: "scheduled" });
    const { data: auto } = await db.from("automations").select("id").eq("key", "appointment_reminder").maybeSingle();
    if (auto) await db.from("automation_runs").insert({ automation_id: auto.id, lead_id: lead?.id ?? null, customer_id: customerId, summary: `Reminder scheduled for ${data.contact.firstName}` });
    await db.from("notifications").insert({ title: "New online booking", body: `${data.contact.firstName} ${data.contact.lastName} booked ${svc.name}.` });
    return { appointmentId: appt.id, location: appt.location, service: svc.name };
  });

// ---------------- AI assistant ----------------
type ChatMsg = { role: "user" | "assistant"; content: string };
type Action = "quote" | "book" | null;

function demoReply(history: ChatMsg[]): { reply: string; action: Action } {
  const last = history[history.length - 1]?.content.toLowerCase() ?? "";
  const svc = SERVICES.find((s) => last.includes(s.name.toLowerCase().split(" ")[0]) || last.includes(s.slug.split("-")[0])) ??
    (last.includes("coat") ? SERVICES[1] : last.includes("ppf") || last.includes("film") ? SERVICES[3] : last.includes("swirl") || last.includes("polish") ? SERVICES[2] : undefined);
  const car = last.match(/(20\d\d)\s+([a-z-]+)\s+([a-z0-9-]+)/i);
  if (/(friday|monday|tuesday|wednesday|thursday|saturday|tomorrow|available|availability|book|appointment|schedule)/.test(last)) {
    return { reply: "Let me help you find an available appointment. Our studio has openings at 8:00 AM, 10:00 AM, 1:00 PM and 3:00 PM on weekdays. Tap **Book appointment** below to pick a time.", action: "book" };
  }
  if (/hour|open|close/.test(last)) {
    return { reply: `We're open ${BUSINESS.hours.map((h) => `${h.day}: ${h.time}`).join(" · ")}.`, action: null };
  }
  if (svc && /(how much|price|cost|\$)/.test(last)) {
    const who = car ? `vehicles like the ${car[2][0].toUpperCase()}${car[2].slice(1)} ${car[3].toUpperCase()}` : "most vehicles";
    return { reply: `Our ${svc.name.toLowerCase()} packages for ${who} start around $${svc.priceFrom}. The final recommendation depends on the condition of the paint. Would you like to request a quote?`, action: "quote" };
  }
  if (svc && /(how long|duration|time)/.test(last)) {
    return { reply: `${svc.name} typically takes about ${svc.durationHours} hours. Larger vehicles or paint that needs correction can take longer.`, action: null };
  }
  if (svc) {
    return { reply: `**${svc.name}** — ${svc.description} It starts at $${svc.priceFrom} and takes about ${svc.durationHours} hours. Would you like a quote?`, action: "quote" };
  }
  if (/prepare|before/.test(last)) return { reply: "Just remove personal items from the cabin and trunk — no need to wash beforehand. Decontamination is part of every service.", action: null };
  return { reply: "I can help with services, pricing ranges, timing, preparation and booking. For example: *“How much is ceramic coating on a 2024 BMW M4?”*", action: null };
}

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) })).min(1).max(30) }).parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ...demoReply(data.messages), mode: "demo" as const };
    try {
      const system = `You are the virtual assistant for ${BUSINESS.name} in Dallas, TX. Answer ONLY using the knowledge below. If the answer isn't in it, say you're not sure and offer to connect them with the team. Be concise (2-4 sentences), warm and professional. Quote prices as "starting around" ranges and note the final price depends on paint condition. Never invent availability; say you can help find a time. End your message with the tag [ACTION:quote] if the customer should request a quote, [ACTION:book] if they want to schedule, or nothing otherwise.\n\nKNOWLEDGE:\n${knowledgeAsText()}`;
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages: [{ role: "system", content: system }, ...data.messages] }),
      });
      if (!res.ok) throw new Error(`gateway ${res.status}`);
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      let text = json.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) throw new Error("empty");
      let action: Action = null;
      const m = text.match(/\[ACTION:(quote|book)\]/i);
      if (m) {
        action = m[1].toLowerCase() as Action;
        text = text.replace(m[0], "").trim();
      }
      return { reply: text, action, mode: "ai" as const };
    } catch (e) {
      console.error("assistant fallback", e);
      return { ...demoReply(data.messages), mode: "demo" as const };
    }
  });
