import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type DB = SupabaseClient<Database>;

export type ContactInput = { firstName: string; lastName: string; email: string; phone: string };
export type VehicleInput = { year: number; make: string; model: string; color: string };

export async function findOrCreateCustomer(db: DB, c: ContactInput) {
  const { data: existing } = await db
    .from("customers")
    .select("id")
    .ilike("email", c.email.trim())
    .limit(1)
    .maybeSingle();
  if (existing) {
    await db.from("customers").update({ phone: c.phone }).eq("id", existing.id);
    return existing.id;
  }
  const { data, error } = await db
    .from("customers")
    .insert({ first_name: c.firstName.trim(), last_name: c.lastName.trim(), email: c.email.trim().toLowerCase(), phone: c.phone.trim() })
    .select("id")
    .single();
  if (error) throw new Error("Could not save your contact details.");
  return data.id;
}

export async function findOrCreateVehicle(db: DB, customerId: string, v: VehicleInput) {
  const { data: existing } = await db
    .from("vehicles")
    .select("id")
    .eq("customer_id", customerId)
    .eq("year", v.year)
    .ilike("make", v.make.trim())
    .ilike("model", v.model.trim())
    .limit(1)
    .maybeSingle();
  if (existing) return existing.id;
  const { data, error } = await db
    .from("vehicles")
    .insert({ customer_id: customerId, year: v.year, make: v.make.trim(), model: v.model.trim(), color: v.color.trim() })
    .select("id")
    .single();
  if (error) throw new Error("Could not save your vehicle.");
  return data.id;
}

export async function serviceBySlug(db: DB, slug: string) {
  const { data } = await db.from("services").select("id,name,price_from,duration_hours").eq("slug", slug).maybeSingle();
  if (!data) throw new Error("Unknown service.");
  return data;
}

/** Runs the "Instant Lead Response" automation for a new lead. */
export async function runInstantResponse(db: DB, opts: { leadId: string; customerId: string; firstName: string; serviceName: string }) {
  const { data: auto } = await db.from("automations").select("id,status").eq("key", "instant_lead_response").maybeSingle();
  const now = Date.now();
  const at = (s: number) => new Date(now + s * 1000).toISOString();
  if (!auto || auto.status !== "active") return;
  await db.from("messages").insert({
    customer_id: opts.customerId,
    lead_id: opts.leadId,
    channel: "sms",
    direction: "outbound",
    automated: true,
    body: `Hi ${opts.firstName}, thanks for reaching out to Apex Auto Detailing! We received your ${opts.serviceName} request and a specialist will confirm details shortly. Reply here with any questions.`,
    created_at: at(2),
  });
  await db.from("lead_activities").insert({ lead_id: opts.leadId, customer_id: opts.customerId, type: "auto_response", title: "Automatic response sent", detail: "Instant Lead Response sent an SMS confirmation", created_at: at(2) });
  await db.from("automation_runs").insert({ automation_id: auto.id, lead_id: opts.leadId, customer_id: opts.customerId, summary: `SMS response sent to ${opts.firstName}` });
  await db.from("follow_ups").insert({
    customer_id: opts.customerId,
    lead_id: opts.leadId,
    type: "no_response",
    reason: "Confirm details if no reply within 2 hours",
    last_contact_at: at(2),
    next_contact_at: new Date(now + 2 * 3600 * 1000).toISOString(),
    status: "scheduled",
  });
}
