import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type DB = SupabaseClient<Database>;

export type ContactInput = { firstName: string; lastName: string; email: string; phone: string };
export type VehicleInput = { year: number; make: string; model: string; color: string };

export async function createPublicCustomer(db: DB, businessId: string, c: ContactInput) {
  const { data, error } = await db
    .from("customers")
    .insert({
      business_id: businessId,
      first_name: c.firstName.trim(),
      last_name: c.lastName.trim(),
      email: c.email.trim().toLowerCase(),
      phone: c.phone.trim(),
    })
    .select("id")
    .single();
  if (error) throw new Error("Could not save your contact details.");
  return data.id;
}

export async function createPublicVehicle(db: DB, businessId: string, customerId: string, v: VehicleInput) {
  const { data, error } = await db
    .from("vehicles")
    .insert({
      business_id: businessId,
      customer_id: customerId,
      year: v.year,
      make: v.make.trim(),
      model: v.model.trim(),
      color: v.color.trim(),
    })
    .select("id")
    .single();
  if (error) throw new Error("Could not save your vehicle.");
  return data.id;
}

export async function serviceBySlug(db: DB, businessId: string, slug: string) {
  const { data, error } = await db
    .from("services")
    .select("id,name,price_from,duration_hours")
    .eq("business_id", businessId)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw new Error("Could not load the requested service.");
  if (!data) throw new Error("Unknown service.");
  return data;
}
