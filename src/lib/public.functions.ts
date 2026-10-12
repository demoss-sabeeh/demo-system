import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { bookingDayBounds, businessLocalToIso, isSlotWithinBusinessHours, validateBookingDate, validateBookingSlot } from "./booking-validation";
import { createPublicCustomer, createPublicVehicle, serviceBySlug } from "./intake.server";
import { knowledgeAsText, SERVICES, BUSINESS, TIME_SLOTS, ADDONS, addonBySlug } from "./knowledge";

function configuredPublicBusinessId(): string {
  const businessId = process.env["OPERANTSCALE_PUBLIC_BUSINESS_ID"];
  if (!businessId || !z.string().uuid().safeParse(businessId).success) {
    throw new Error("Public business is not configured.");
  }
  return businessId;
}

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
    const businessId = configuredPublicBusinessId();
    const svc = await serviceBySlug(db, businessId, data.serviceSlug);
    const customerId = await createPublicCustomer(db, businessId, data.contact);
    const vehicleId = await createPublicVehicle(db, businessId, customerId, data.vehicle);
    const premium = ["BMW", "Porsche", "Mercedes", "Mercedes-AMG", "Audi", "Land Rover", "Range Rover", "Chevrolet"].some((m) => data.vehicle.make.toLowerCase().includes(m.toLowerCase()));
    const estimate = svc.price_from + (premium ? 300 : 100);
    const { data: lead, error } = await db
      .from("leads")
      .insert({
        business_id: businessId,
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
    const { error: activityError } = await db.from("lead_activities").insert({
      business_id: businessId,
      lead_id: lead.id,
      customer_id: customerId,
      type: "inquiry",
      title: "Website inquiry submitted",
      detail: `Quote request for ${svc.name} on ${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}`,
    });
    if (activityError) throw new Error("We couldn't record your request activity.");
    const { error: notificationError } = await db.from("notifications").insert({
      business_id: businessId,
      title: "New website inquiry",
      body: `${data.contact.firstName} ${data.contact.lastName} requested ${svc.name}.`,
    });
    if (notificationError) throw new Error("We couldn't notify the business about your request.");
    return { leadId: lead.id, service: svc.name, estimate };
  });

// A booking is one or more services plus optional add-ons, done in one visit.
const cartSchema = {
  serviceSlugs: z.array(z.string().max(60)).min(1, "Choose at least one service").max(4).optional(),
  serviceSlug: z.string().max(60).optional(),
  addonSlugs: z.array(z.string().max(60)).max(ADDONS.length).default([]),
};

type DBClient = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

async function resolveCart(db: DBClient, businessId: string, input: { serviceSlugs?: string[]; serviceSlug?: string; addonSlugs: string[] }) {
  const slugs = [...new Set(input.serviceSlugs?.length ? input.serviceSlugs : input.serviceSlug ? [input.serviceSlug] : [])];
  if (!slugs.length) throw new Error("Choose at least one service.");
  const services = await Promise.all(slugs.map((slug) => serviceBySlug(db, businessId, slug)));
  const addons = [...new Set(input.addonSlugs)].map((slug) => {
    const a = addonBySlug(slug);
    if (!a) throw new Error("Unknown add-on.");
    return a;
  });
  const durationHours = services.reduce((t, s) => t + Number(s.duration_hours), 0) + addons.reduce((t, a) => t + a.durationHours, 0);
  const price = services.reduce((t, s) => t + s.price_from, 0) + addons.reduce((t, a) => t + a.price, 0);
  const label = [services.map((s) => s.name).join(" + "), addons.length ? `add-ons: ${addons.map((a) => a.name).join(", ")}` : ""].filter(Boolean).join("; ");
  return { primary: services[0], services, addons, durationHours, price, label };
}

async function bookedRanges(db: DBClient, businessId: string, date: string) {
  const bounds = bookingDayBounds(date);
  const { data: rows, error } = await db
    .from("appointments")
    .select("starts_at,duration_hours")
    .eq("business_id", businessId)
    .gte("starts_at", bounds.start)
    .lt("starts_at", bounds.end)
    .not("status", "in", "(cancelled,no_show)");
  if (error) throw new Error("Could not load appointment availability.");
  return (rows ?? []).map((r) => {
    const start = new Date(r.starts_at).getTime();
    return [start, start + Number(r.duration_hours) * 3_600_000] as const;
  });
}

const overlaps = (ranges: (readonly [number, number])[], start: number, end: number) => ranges.some(([s, e]) => start < e && s < end);

export const getAvailability = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ date: z.string().max(10), ...cartSchema }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const businessId = configuredPublicBusinessId();
    const weekday = validateBookingDate(data.date);
    if (weekday === 0) return { slots: [] as { time: string; available: boolean }[], closed: true, durationHours: 0 };
    const cart = await resolveCart(db, businessId, data);
    const ranges = await bookedRanges(db, businessId, data.date);
    const now = Date.now();
    const slots = (weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS).map((time) => {
      if (!isSlotWithinBusinessHours(data.date, time, cart.durationHours)) return { time, available: false };
      const start = new Date(businessLocalToIso(data.date, time)).getTime();
      return { time, available: start > now && !overlaps(ranges, start, start + cart.durationHours * 3_600_000) };
    });
    return { slots, closed: false, durationHours: cart.durationHours };
  });

const bookingSchema = z.object({
  contact,
  vehicle,
  ...cartSchema,
  date: z.string().max(10),
  time: z.string().max(20),
  notes: z.string().max(1000).optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const businessId = configuredPublicBusinessId();
    const cart = await resolveCart(db, businessId, data);
    const startsAt = validateBookingSlot(data.date, data.time, cart.durationHours);
    const proposedStart = new Date(startsAt).getTime();
    const ranges = await bookedRanges(db, businessId, data.date);
    if (overlaps(ranges, proposedStart, proposedStart + cart.durationHours * 3_600_000)) throw new Error("That time was just booked. Please choose another slot.");
    const customerId = await createPublicCustomer(db, businessId, data.contact);
    const vehicleId = await createPublicVehicle(db, businessId, customerId, data.vehicle);
    const notes = [`Requested: ${cart.label}`, data.notes?.trim()].filter(Boolean).join("\n");
    const { data: lead, error: leadError } = await db
      .from("leads")
      .insert({ business_id: businessId, customer_id: customerId, vehicle_id: vehicleId, service_id: cart.primary.id, source: "website", status: "new", estimated_value: cart.price, preferred_date: data.date, preferred_time: data.time, notes })
      .select("id")
      .single();
    if (leadError || !lead) throw new Error("We couldn't save your booking request. Please try again.");
    const { data: appt, error } = await db
      .from("appointments")
      .insert({ business_id: businessId, customer_id: customerId, vehicle_id: vehicleId, service_id: cart.primary.id, lead_id: lead.id, starts_at: startsAt, duration_hours: cart.durationHours, status: "requested", notes })
      .select("id, location")
      .single();
    if (error || !appt) {
      await db.from("leads").delete().eq("id", lead.id);
      throw new Error("We couldn't save your appointment. Please try again.");
    }
    const { error: activitiesError } = await db.from("lead_activities").insert({ business_id: businessId, lead_id: lead.id, customer_id: customerId, type: "inquiry", title: "Online appointment request submitted", detail: `${cart.label} requested for ${data.date} at ${data.time}` });
    if (activitiesError) throw new Error("We couldn't record booking activity.");
    const { error: notificationError } = await db.from("notifications").insert({ business_id: businessId, title: "New appointment request", body: `${data.contact.firstName} ${data.contact.lastName} requested ${cart.label} for ${data.date} at ${data.time}.` });
    if (notificationError) throw new Error("Could not notify the business about the booking.");
    return { appointmentId: appt.id, location: appt.location, service: cart.label, price: cart.price, durationHours: cart.durationHours };
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
      const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
        method: "POST",
        headers: { "Lovable-API-Key": key, Authorization: `Bearer ${key}`, "X-Lovable-AIG-SDK": "fetch", "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          instructions: system,
          input: data.messages.map((m) => ({ role: m.role, content: m.content })),
          reasoning: { effort: "low" },
          store: false,
          stream: true,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`gateway ${res.status}`);
      // Consume the SSE stream and collect output text deltas.
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const ev = JSON.parse(payload) as { type?: string; delta?: string };
            if (ev.type === "response.output_text.delta" && ev.delta) text += ev.delta;
          } catch {
            /* ignore partial */
          }
        }
      }
      text = text.trim();
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
