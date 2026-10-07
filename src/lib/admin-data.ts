import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type T<N extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][N]["Row"];
export type Customer = T<"customers">;
export type Vehicle = T<"vehicles">;
export type Service = T<"services">;
export type Lead = T<"leads"> & { customer: Customer | null; vehicle: Vehicle | null; service: Service | null };
export type Activity = T<"lead_activities">;
export type QuoteItem = T<"quote_items">;
export type Quote = T<"quotes"> & { customer: Customer | null; vehicle: Vehicle | null; service: Service | null; items: QuoteItem[] };
export type Appointment = T<"appointments"> & { customer: Customer | null; vehicle: Vehicle | null; service: Service | null };
export type Message = T<"messages"> & { customer: Customer | null };
export type FollowUp = T<"follow_ups"> & { customer: Customer | null; vehicle: Vehicle | null };
export type Automation = T<"automations">;
export type AutomationRun = T<"automation_runs"> & { automation: Automation | null; customer: Customer | null };

const LIVE = { refetchInterval: 8000 } as const;

async function q<R>(p: PromiseLike<{ data: R | null; error: { message: string } | null }>): Promise<R> {
  const { data, error } = await p;
  if (error) throw new Error(error.message);
  return data as R;
}

const LEAD_SEL = "*, customer:customers(*), vehicle:vehicles(*), service:services(*)";

export const useLeads = () =>
  useQuery({ queryKey: ["db", "leads"], queryFn: () => q<Lead[]>(supabase.from("leads").select(LEAD_SEL).order("created_at", { ascending: false })), ...LIVE });

export const useLead = (id: string) =>
  useQuery({
    queryKey: ["db", "lead", id],
    queryFn: async () => {
      const lead = await q<Lead>(supabase.from("leads").select(LEAD_SEL).eq("id", id).single());
      const [activities, messages, quotes, appointments] = await Promise.all([
        q<Activity[]>(supabase.from("lead_activities").select("*").eq("lead_id", id).order("created_at")),
        q<Message[]>(supabase.from("messages").select("*, customer:customers(*)").eq("customer_id", lead.customer_id).order("created_at")),
        q<Quote[]>(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("lead_id", id).order("created_at", { ascending: false })),
        q<Appointment[]>(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("customer_id", lead.customer_id).order("starts_at", { ascending: false })),
      ]);
      return { lead, activities, messages, quotes, appointments };
    },
    ...LIVE,
  });

export const useCustomers = () =>
  useQuery({ queryKey: ["db", "customers"], queryFn: () => q<(Customer & { vehicles: Vehicle[]; leads: { id: string; status: string }[]; appointments: { id: string; starts_at: string }[] })[]>(supabase.from("customers").select("*, vehicles(*), leads(id,status), appointments(id,starts_at)").order("created_at", { ascending: false })) });

export const useCustomer = (id: string) =>
  useQuery({
    queryKey: ["db", "customer", id],
    queryFn: async () => {
      const [customer, vehicles, leads, quotes, appointments, messages, activities] = await Promise.all([
        q<Customer>(supabase.from("customers").select("*").eq("id", id).single()),
        q<Vehicle[]>(supabase.from("vehicles").select("*").eq("customer_id", id)),
        q<Lead[]>(supabase.from("leads").select(LEAD_SEL).eq("customer_id", id).order("created_at", { ascending: false })),
        q<Quote[]>(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("customer_id", id).order("created_at", { ascending: false })),
        q<Appointment[]>(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("customer_id", id).order("starts_at", { ascending: false })),
        q<Message[]>(supabase.from("messages").select("*, customer:customers(*)").eq("customer_id", id).order("created_at")),
        q<Activity[]>(supabase.from("lead_activities").select("*").eq("customer_id", id).order("created_at", { ascending: false })),
      ]);
      return { customer, vehicles, leads, quotes, appointments, messages, activities };
    },
  });

export const useVehicles = () =>
  useQuery({ queryKey: ["db", "vehicles"], queryFn: () => q<(Vehicle & { customer: Customer | null; appointments: { id: string; starts_at: string; status: string; service: { name: string } | null }[] })[]>(supabase.from("vehicles").select("*, customer:customers(*), appointments(id,starts_at,status,service:services(name))").order("created_at", { ascending: false })) });

export const useVehicle = (id: string) =>
  useQuery({
    queryKey: ["db", "vehicle", id],
    queryFn: async () => {
      const [vehicle, appointments, quotes] = await Promise.all([
        q<Vehicle & { customer: Customer | null }>(supabase.from("vehicles").select("*, customer:customers(*)").eq("id", id).single()),
        q<Appointment[]>(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("vehicle_id", id).order("starts_at", { ascending: false })),
        q<Quote[]>(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("vehicle_id", id).order("created_at", { ascending: false })),
      ]);
      return { vehicle, appointments, quotes };
    },
  });

export const useQuotes = () =>
  useQuery({ queryKey: ["db", "quotes"], queryFn: () => q<Quote[]>(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").order("created_at", { ascending: false })) });

export const useAppointments = () =>
  useQuery({ queryKey: ["db", "appointments"], queryFn: () => q<Appointment[]>(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").order("starts_at")), ...LIVE });

export const useMessages = () =>
  useQuery({ queryKey: ["db", "messages"], queryFn: () => q<Message[]>(supabase.from("messages").select("*, customer:customers(*)").order("created_at")), ...LIVE });

export const useFollowUps = () =>
  useQuery({ queryKey: ["db", "follow_ups"], queryFn: () => q<FollowUp[]>(supabase.from("follow_ups").select("*, customer:customers(*), vehicle:vehicles(*)").order("next_contact_at")) });

export const useAutomations = () =>
  useQuery({ queryKey: ["db", "automations"], queryFn: () => q<Automation[]>(supabase.from("automations").select("*").order("sort")) });

export const useAutomationRuns = () =>
  useQuery({ queryKey: ["db", "automation_runs"], queryFn: () => q<AutomationRun[]>(supabase.from("automation_runs").select("*, automation:automations(*), customer:customers(*)").order("created_at", { ascending: false }).limit(60)), ...LIVE });

export const useServices = () =>
  useQuery({ queryKey: ["db", "services"], queryFn: () => q<Service[]>(supabase.from("services").select("*").order("sort")) });

export const useRecentActivity = () =>
  useQuery({ queryKey: ["db", "activity"], queryFn: () => q<(Activity & { customer: Customer | null })[]>(supabase.from("lead_activities").select("*, customer:customers(*)").order("created_at", { ascending: false }).limit(14)), ...LIVE });

export function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["db"] });
}
