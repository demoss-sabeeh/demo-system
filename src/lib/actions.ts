// Business actions for the admin workspace. Each one writes the record and
// logs the matching timeline activity so every screen stays connected.
import { supabase } from "@/integrations/supabase/client";
import type { LeadStatus } from "./format";

async function must<R>(p: PromiseLike<{ data: R | null; error: { message: string } | null }>) {
  const { data, error } = await p;
  if (error) throw new Error(error.message);
  return data as R;
}

export async function logActivity(a: { lead_id?: string | null; customer_id: string; type: string; title: string; detail?: string }) {
  await must(supabase.from("lead_activities").insert({ ...a, detail: a.detail ?? "" }));
}

const STATUS_TITLES: Record<LeadStatus, string> = {
  new: "Moved to New", contacted: "Customer contacted", qualified: "Lead qualified", quoted: "Moved to Quoted", booked: "Moved to Booked", completed: "Service completed", lost: "Marked lost",
};

export async function setLeadStatus(lead: { id: string; customer_id: string }, status: LeadStatus) {
  await must(supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", lead.id));
  await logActivity({ lead_id: lead.id, customer_id: lead.customer_id, type: status, title: STATUS_TITLES[status] });
}

export const quoteNumber = () => `Q-${(Date.now() % 100000).toString().padStart(5, "0")}`;

export async function createQuote(input: {
  lead_id?: string | null; customer_id: string; vehicle_id?: string | null; service_id?: string | null;
  items: { description: string; quantity: number; unit_price: number }[]; discount?: number; notes?: string; status?: string;
}) {
  const number = quoteNumber();
  const quote = (await must(
    supabase.from("quotes").insert({
      number, lead_id: input.lead_id ?? null, customer_id: input.customer_id, vehicle_id: input.vehicle_id ?? null, service_id: input.service_id ?? null,
      status: input.status ?? "draft", discount: input.discount ?? 0, notes: input.notes ?? "", expires_at: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    }).select("id, number").single(),
  )) as { id: string; number: string };
  if (input.items.length) await must(supabase.from("quote_items").insert(input.items.map((it, i) => ({ ...it, quote_id: quote.id, sort: i }))));
  await logActivity({ lead_id: input.lead_id, customer_id: input.customer_id, type: "quote", title: "Quote created", detail: `${quote.number} prepared` });
  const total = Math.max(0, input.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - (input.discount ?? 0));
  if (input.lead_id) await must(supabase.from("leads").update({ status: "quoted", estimated_value: total, updated_at: new Date().toISOString() }).eq("id", input.lead_id));
  if (input.status === "sent") await quoteSentEffects({ number: quote.number, customer_id: input.customer_id, lead_id: input.lead_id ?? null });
  return quote;
}

export async function updateQuote(id: string, patch: { status?: string; discount?: number; notes?: string }, items?: { description: string; quantity: number; unit_price: number }[]) {
  await must(supabase.from("quotes").update(patch).eq("id", id));
  if (items) {
    await must(supabase.from("quote_items").delete().eq("quote_id", id));
    if (items.length) await must(supabase.from("quote_items").insert(items.map((it, i) => ({ ...it, quote_id: id, sort: i }))));
  }
}

async function quoteSentEffects(quote: { number: string; customer_id: string; lead_id: string | null }) {
  await logActivity({ lead_id: quote.lead_id, customer_id: quote.customer_id, type: "quote", title: "Quote sent", detail: quote.number });
  await must(supabase.from("messages").insert({ customer_id: quote.customer_id, lead_id: quote.lead_id, channel: "email", direction: "outbound", automated: true, body: `Your quote ${quote.number} from Apex Auto Detailing is ready to review.` }));
  await must(supabase.from("follow_ups").insert({ customer_id: quote.customer_id, lead_id: quote.lead_id, type: "quote", reason: `Follow up on ${quote.number} if not accepted`, last_contact_at: new Date().toISOString(), next_contact_at: new Date(Date.now() + 48 * 3600000).toISOString(), status: "scheduled" }));
}

export async function setQuoteStatus(quote: { id: string; number: string; customer_id: string; lead_id: string | null }, status: string) {
  await must(supabase.from("quotes").update({ status }).eq("id", quote.id));
  const titles: Record<string, string> = { sent: "Quote sent", accepted: "Quote accepted", declined: "Quote declined", viewed: "Quote viewed", expired: "Quote expired" };
  if (status !== "sent") await logActivity({ lead_id: quote.lead_id, customer_id: quote.customer_id, type: "quote", title: titles[status] ?? "Quote updated", detail: quote.number });
  if (status === "sent") await quoteSentEffects(quote);
  if (status === "declined" && quote.lead_id) await must(supabase.from("leads").update({ status: "lost" }).eq("id", quote.lead_id));
}

export async function bookAppointment(input: { lead_id?: string | null; customer_id: string; vehicle_id?: string | null; service_id?: string | null; starts_at: string; duration_hours: number; customerName?: string; serviceName?: string }) {
  const appt = await must(
    supabase.from("appointments").insert({ lead_id: input.lead_id ?? null, customer_id: input.customer_id, vehicle_id: input.vehicle_id ?? null, service_id: input.service_id ?? null, starts_at: input.starts_at, duration_hours: input.duration_hours, status: "confirmed" }).select("id").single(),
  );
  if (input.lead_id) await must(supabase.from("leads").update({ status: "booked", updated_at: new Date().toISOString() }).eq("id", input.lead_id));
  await logActivity({ lead_id: input.lead_id, customer_id: input.customer_id, type: "booked", title: "Appointment booked", detail: input.serviceName ?? "" });
  await must(supabase.from("messages").insert({ customer_id: input.customer_id, lead_id: input.lead_id ?? null, channel: "sms", direction: "outbound", automated: true, body: `You're confirmed for ${input.serviceName ?? "your appointment"}. We'll send a reminder 24 hours before.` }));
  await must(supabase.from("follow_ups").insert({ customer_id: input.customer_id, vehicle_id: input.vehicle_id ?? null, lead_id: input.lead_id ?? null, type: "appointment_reminder", reason: "Appointment reminder — 24 hours before", next_contact_at: new Date(new Date(input.starts_at).getTime() - 24 * 3600000).toISOString(), status: "scheduled" }));
  await logActivity({ lead_id: input.lead_id, customer_id: input.customer_id, type: "reminder", title: "Reminder scheduled", detail: "SMS reminder 24 hours before" });
  return appt;
}

export async function setAppointmentStatus(a: { id: string; customer_id: string; vehicle_id: string | null; lead_id: string | null }, status: string) {
  await must(supabase.from("appointments").update({ status }).eq("id", a.id));
  if (status === "completed") {
    await logActivity({ lead_id: a.lead_id, customer_id: a.customer_id, type: "completed", title: "Service completed", detail: "Vehicle history updated" });
    if (a.lead_id) await must(supabase.from("leads").update({ status: "completed" }).eq("id", a.lead_id));
    await must(supabase.from("follow_ups").insert({ customer_id: a.customer_id, vehicle_id: a.vehicle_id, lead_id: a.lead_id, type: "post_service", reason: "Post-service check-in and review request", next_contact_at: new Date(Date.now() + 86400000).toISOString(), status: "scheduled" }));
  }
}

export async function sendMessage(m: { customer_id: string; lead_id?: string | null; channel: "sms" | "email" | "ai"; body: string }) {
  await must(supabase.from("messages").insert({ ...m, lead_id: m.lead_id ?? null, direction: "outbound" }));
  await logActivity({ lead_id: m.lead_id, customer_id: m.customer_id, type: "message", title: `${m.channel === "email" ? "Email" : "SMS"} sent`, detail: m.body.slice(0, 80) });
}

export async function createFollowUp(f: { customer_id: string; vehicle_id?: string | null; lead_id?: string | null; type: string; reason: string; next_contact_at: string }) {
  await must(supabase.from("follow_ups").insert({ customer_id: f.customer_id, type: f.type, reason: f.reason, next_contact_at: f.next_contact_at, vehicle_id: f.vehicle_id ?? null, lead_id: f.lead_id ?? null, status: "scheduled" }));
  await logActivity({ lead_id: f.lead_id, customer_id: f.customer_id, type: "follow_up", title: "Follow-up created", detail: f.reason });
}

export async function resetDemo() {
  const { error } = await supabase.rpc("reset_demo");
  if (error) throw new Error(error.message);
}
