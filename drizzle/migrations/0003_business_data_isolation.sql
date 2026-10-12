-- Business ownership boundary. Existing rows are intentionally left with
-- business_id = NULL and become inaccessible to authenticated users until
-- their ownership is explicitly verified and assigned by an administrator.
-- Never backfill existing rows based only on their demo/business labels.

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  public_catalog boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.business_members (
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now(),
  constraint business_members_pkey primary key (business_id, user_id),
  constraint business_members_one_business_per_user_key unique (user_id)
);

alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
revoke all on public.businesses, public.business_members from public, anon, authenticated;
grant select on public.businesses, public.business_members to authenticated;
grant all on public.businesses, public.business_members to service_role;

create or replace function public.is_business_member(_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select _business_id is not null and exists (
    select 1
    from public.business_members
    where business_id = _business_id
      and user_id = auth.uid()
  )
$$;

create or replace function public.current_business_id()
returns uuid
language plpgsql
stable
security definer
set search_path = pg_catalog, public
as $$
declare
  _business_id uuid;
begin
  select business_id
  into _business_id
  from public.business_members
  where user_id = auth.uid();

  if _business_id is null then
    raise exception 'No business membership is configured for this user';
  end if;

  return _business_id;
end
$$;

create or replace function public.is_business_public(_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1
    from public.businesses
    where id = _business_id
      and public_catalog
  )
$$;

revoke all on function public.is_business_member(uuid) from public, anon;
revoke all on function public.current_business_id() from public, anon;
revoke all on function public.is_business_public(uuid) from public;
grant execute on function public.is_business_member(uuid), public.current_business_id() to authenticated;
grant execute on function public.is_business_public(uuid) to anon, authenticated, service_role;

create policy "Members can view their businesses"
  on public.businesses for select to authenticated
  using (public.is_business_member(id));
create policy "Users can view their own memberships"
  on public.business_members for select to authenticated
  using (user_id = (select auth.uid()));

-- Add nullable ownership columns first; assigning defaults afterwards avoids
-- assigning the current user/business to historical rows during migration.
do $$
declare
  _table text;
begin
  foreach _table in array array[
    'services', 'customers', 'vehicles', 'leads', 'lead_activities', 'quotes',
    'quote_items', 'appointments', 'messages', 'follow_ups', 'automations',
    'automation_runs', 'notifications'
  ] loop
    execute format(
      'alter table public.%I add column business_id uuid references public.businesses(id) on delete restrict',
      _table
    );
    execute format('alter table public.%I enable row level security', _table);
    execute format(
      'alter table public.%I alter column business_id set default public.current_business_id()',
      _table
    );
    execute format(
      'alter table public.%I add constraint %I unique (business_id, id)',
      _table,
      _table || '_business_id_id_key'
    );
    execute format(
      'drop policy if exists "Staff full access" on public.%I',
      _table
    );
    execute format(
      'create policy "Business member select" on public.%I for select to authenticated using (business_id = (select public.current_business_id()))',
      _table
    );
    execute format(
      'create policy "Business member insert" on public.%I for insert to authenticated with check (business_id = (select public.current_business_id()))',
      _table
    );
    execute format(
      'create policy "Business member update" on public.%I for update to authenticated using (business_id = (select public.current_business_id())) with check (business_id = (select public.current_business_id()))',
      _table
    );
    execute format(
      'create policy "Business member delete" on public.%I for delete to authenticated using (business_id = (select public.current_business_id()))',
      _table
    );
  end loop;
end
$$;

-- A public catalogue is opt-in per business, and never exposes inactive rows.
drop policy if exists "Public can view active services" on public.services;
create policy "Public can view published active services"
  on public.services for select to anon
  using (active and public.is_business_public(business_id));

-- Replace single-column relationships with tenant-consistent foreign keys.
-- Column-specific SET NULL preserves business_id and existing history.
alter table public.vehicles drop constraint vehicles_customer_id_fkey;
alter table public.vehicles
  add constraint vehicles_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade;

alter table public.leads drop constraint leads_customer_id_fkey;
alter table public.leads drop constraint leads_vehicle_id_fkey;
alter table public.leads drop constraint leads_service_id_fkey;
alter table public.leads
  add constraint leads_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade,
  add constraint leads_business_vehicle_fkey
  foreign key (business_id, vehicle_id) references public.vehicles (business_id, id) on delete set null (vehicle_id),
  add constraint leads_business_service_fkey
  foreign key (business_id, service_id) references public.services (business_id, id) on delete set null (service_id);

alter table public.lead_activities drop constraint lead_activities_lead_id_fkey;
alter table public.lead_activities drop constraint lead_activities_customer_id_fkey;
alter table public.lead_activities
  add constraint lead_activities_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id),
  add constraint lead_activities_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade;

alter table public.quotes drop constraint quotes_lead_id_fkey;
alter table public.quotes drop constraint quotes_customer_id_fkey;
alter table public.quotes drop constraint quotes_vehicle_id_fkey;
alter table public.quotes drop constraint quotes_service_id_fkey;
alter table public.quotes
  add constraint quotes_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id),
  add constraint quotes_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade,
  add constraint quotes_business_vehicle_fkey
  foreign key (business_id, vehicle_id) references public.vehicles (business_id, id) on delete set null (vehicle_id),
  add constraint quotes_business_service_fkey
  foreign key (business_id, service_id) references public.services (business_id, id) on delete set null (service_id);

alter table public.quote_items drop constraint quote_items_quote_id_fkey;
alter table public.quote_items
  add constraint quote_items_business_quote_fkey
  foreign key (business_id, quote_id) references public.quotes (business_id, id) on delete cascade;

alter table public.appointments drop constraint appointments_customer_id_fkey;
alter table public.appointments drop constraint appointments_vehicle_id_fkey;
alter table public.appointments drop constraint appointments_service_id_fkey;
alter table public.appointments drop constraint appointments_lead_id_fkey;
alter table public.appointments
  add constraint appointments_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade,
  add constraint appointments_business_vehicle_fkey
  foreign key (business_id, vehicle_id) references public.vehicles (business_id, id) on delete set null (vehicle_id),
  add constraint appointments_business_service_fkey
  foreign key (business_id, service_id) references public.services (business_id, id) on delete set null (service_id),
  add constraint appointments_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id);

alter table public.messages drop constraint messages_customer_id_fkey;
alter table public.messages drop constraint messages_lead_id_fkey;
alter table public.messages
  add constraint messages_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade,
  add constraint messages_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id);

alter table public.follow_ups drop constraint follow_ups_customer_id_fkey;
alter table public.follow_ups drop constraint follow_ups_vehicle_id_fkey;
alter table public.follow_ups drop constraint follow_ups_lead_id_fkey;
alter table public.follow_ups
  add constraint follow_ups_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete cascade,
  add constraint follow_ups_business_vehicle_fkey
  foreign key (business_id, vehicle_id) references public.vehicles (business_id, id) on delete set null (vehicle_id),
  add constraint follow_ups_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id);

alter table public.automation_runs drop constraint automation_runs_automation_id_fkey;
alter table public.automation_runs drop constraint automation_runs_customer_id_fkey;
alter table public.automation_runs drop constraint automation_runs_lead_id_fkey;
alter table public.automation_runs
  add constraint automation_runs_business_automation_fkey
  foreign key (business_id, automation_id) references public.automations (business_id, id) on delete cascade,
  add constraint automation_runs_business_customer_fkey
  foreign key (business_id, customer_id) references public.customers (business_id, id) on delete set null (customer_id),
  add constraint automation_runs_business_lead_fkey
  foreign key (business_id, lead_id) references public.leads (business_id, id) on delete set null (lead_id);
