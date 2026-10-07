// "Run Demo" — walks John Smith's ceramic coating journey, writing real records step by step.
import { supabase } from "@/integrations/supabase/client";
import { localToIso } from "./format";
import { quoteNumber } from "./actions";

export type DemoStep = { key: string; label: string; detail: string };

export const DEMO_STEPS: DemoStep[] = [
  { key: "inquiry", label: "New inquiry received", detail: "John Smith requests Ceramic Coating for a 2024 BMW M4 on the website." },
  { key: "lead", label: "Lead created", detail: "Customer, vehicle and lead records are created and linked." },
  { key: "contacted", label: "Customer contacted", detail: "Instant Lead Response sends an SMS within seconds." },
  { key: "qualified", label: "Lead qualified", detail: "John replies with paint condition and Friday availability." },
  { key: "quote", label: "Quote generated", detail: "Itemized ceramic coating quote for $1,200 is sent." },
  { key: "booked", label: "Appointment booked", detail: "Friday 10:00 AM is confirmed in the calendar." },
  { key: "reminder", label: "Reminder scheduled", detail: "SMS reminder queued for 24 hours before the visit." },
];

function nextFriday() {
  const now = new Date();
  const d = new Date(now);
  const dow = now.getDay();
  d.setDate(now.getDate() + (((5 - dow + 7) % 7) || 7));
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(d);
}

type Ctx = { customerId?: string; vehicleId?: string; leadId?: string; serviceId?: string; quoteId?: string; startsAt?: string };

async function ins(table: string, row: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from(table as any) as any).insert(row).select("id").single();
  if (error) throw new Error(error.message);
  return (data as { id: string }).id;
}

async function auto(key: string, ctx: Ctx, summary: string) {
  const { data } = await supabase.from("automations").select("id").eq("key", key).maybeSingle();
  if (data) await ins("automation_runs", { automation_id: data.id, lead_id: ctx.leadId, customer_id: ctx.customerId, summary });
}

const act = (ctx: Ctx, type: string, title: string, detail = "") => ins("lead_activities", { lead_id: ctx.leadId, customer_id: ctx.customerId, type, title, detail });

export async function runDemoStep(key: string, ctx: Ctx): Promise<Ctx> {
  switch (key) {
    case "inquiry": {
      const { data: svc } = await supabase.from("services").select("id").eq("slug", "ceramic-coating").single();
      const customerId = await ins("customers", { first_name: "John", last_name: "Smith", email: `john.smith+${Date.now() % 10000}@example.com`, phone: "(214) 555-0142", city: "Dallas, TX" });
      return { ...ctx, customerId, serviceId: svc?.id };
    }
    case "lead": {
      const vehicleId = await ins("vehicles", { customer_id: ctx.customerId, year: 2024, make: "BMW", model: "M4", color: "Black" });
      const leadId = await ins("leads", { customer_id: ctx.customerId, vehicle_id: vehicleId, service_id: ctx.serviceId, source: "website", status: "new", estimated_value: 1200, preferred_date: nextFriday(), preferred_time: "Morning", vehicle_condition: "Good", notes: "New car, wants long-term protection." });
      const c = { ...ctx, vehicleId, leadId };
      await act(c, "inquiry", "Website inquiry submitted", "Quote request for Ceramic Coating on 2024 BMW M4");
      await ins("notifications", { title: "New website inquiry", body: "John Smith requested Ceramic Coating." });
      return c;
    }
    case "contacted": {
      await ins("messages", { customer_id: ctx.customerId, lead_id: ctx.leadId, channel: "sms", direction: "outbound", automated: true, body: "Hi John, thanks for reaching out to Apex Auto Detailing! We received your Ceramic Coating request for your 2024 BMW M4. Is the paint new, or are there any swirls or chips we should know about?" });
      await act(ctx, "auto_response", "Automatic response sent", "Instant Lead Response sent an SMS");
      await supabase.from("leads").update({ status: "contacted" }).eq("id", ctx.leadId!);
      await auto("instant_lead_response", ctx, "SMS response sent to John");
      return ctx;
    }
    case "qualified": {
      await ins("messages", { customer_id: ctx.customerId, lead_id: ctx.leadId, channel: "sms", direction: "inbound", body: "Paint is basically new, maybe a couple light swirls. Can I come Friday?" });
      await act(ctx, "contacted", "Customer replied", "Paint near-new, prefers Friday");
      await supabase.from("leads").update({ status: "qualified" }).eq("id", ctx.leadId!);
      await act(ctx, "qualified", "Lead qualified", "Vehicle, service and timing confirmed");
      return ctx;
    }
    case "quote": {
      const quoteId = await ins("quotes", { number: quoteNumber(), lead_id: ctx.leadId, customer_id: ctx.customerId, vehicle_id: ctx.vehicleId, service_id: ctx.serviceId, status: "sent", discount: 0, notes: "Includes single-stage polish to remove light swirls.", expires_at: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10) });
      await supabase.from("quote_items").insert([
        { quote_id: quoteId, description: "Ceramic Coating — 5-year package", quantity: 1, unit_price: 899, sort: 0 },
        { quote_id: quoteId, description: "Single-stage paint correction", quantity: 1, unit_price: 201, sort: 1 },
        { quote_id: quoteId, description: "Wheel face & glass coating", quantity: 1, unit_price: 100, sort: 2 },
      ]);
      await supabase.from("leads").update({ status: "quoted" }).eq("id", ctx.leadId!);
      await act(ctx, "quote", "Quote created", "$1,200 ceramic coating quote sent");
      await ins("messages", { customer_id: ctx.customerId, lead_id: ctx.leadId, channel: "email", direction: "outbound", automated: true, body: "Your Apex quote is ready: Ceramic Coating for your 2024 BMW M4 — $1,200. Friday 10:00 AM is available." });
      return { ...ctx, quoteId };
    }
    case "booked": {
      const startsAt = localToIso(nextFriday(), "10:00 AM");
      await supabase.from("quotes").update({ status: "accepted" }).eq("id", ctx.quoteId!);
      await ins("appointments", { customer_id: ctx.customerId, vehicle_id: ctx.vehicleId, service_id: ctx.serviceId, lead_id: ctx.leadId, starts_at: startsAt, duration_hours: 6, status: "confirmed" });
      await supabase.from("leads").update({ status: "booked" }).eq("id", ctx.leadId!);
      await act(ctx, "booked", "Appointment booked", "Ceramic Coating · Friday 10:00 AM");
      await ins("messages", { customer_id: ctx.customerId, lead_id: ctx.leadId, channel: "sms", direction: "outbound", automated: true, body: "You're confirmed for Friday at 10:00 AM at 2211 Commerce St. See you then!" });
      return { ...ctx, startsAt };
    }
    case "reminder": {
      await ins("follow_ups", { customer_id: ctx.customerId, vehicle_id: ctx.vehicleId, lead_id: ctx.leadId, type: "appointment_reminder", reason: "Appointment reminder — 24 hours before", next_contact_at: new Date(new Date(ctx.startsAt!).getTime() - 24 * 3600000).toISOString(), status: "scheduled" });
      await act(ctx, "reminder", "Reminder scheduled", "SMS reminder 24 hours before");
      await auto("appointment_reminder", ctx, "Reminder scheduled for John");
      return ctx;
    }
  }
  return ctx;
}
