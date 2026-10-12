import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type DB = SupabaseClient<Database>;

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
