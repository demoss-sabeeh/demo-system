-- Run only against a disposable database after applying migrations 0000-0004.
-- All fixtures and attempted mutations are rolled back at the end.
begin;

insert into auth.users (id, aud, role, email)
values
  ('10000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'tenant-a@example.test'),
  ('10000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'tenant-b@example.test');

insert into public.businesses (id, name)
values
  ('20000000-0000-0000-0000-000000000001', 'Tenant A Test'),
  ('20000000-0000-0000-0000-000000000002', 'Tenant B Test');

insert into public.business_members (business_id, user_id, role)
values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'owner'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'owner');

insert into public.services (id, business_id, slug, name) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'tenant-a-service', 'Tenant A Service'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'tenant-b-service', 'Tenant B Service');
insert into public.customers (id, business_id, first_name, last_name, email) values
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Tenant', 'A', 'tenant-a-customer@example.test'),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'Tenant', 'B', 'tenant-b-customer@example.test');
insert into public.vehicles (id, business_id, customer_id, year, make, model) values
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 2024, 'Test', 'A'),
  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 2024, 'Test', 'B');
insert into public.leads (id, business_id, customer_id, vehicle_id, service_id) values
  ('60000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001'),
  ('60000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002');
insert into public.lead_activities (id, business_id, lead_id, customer_id, type, title) values
  ('70000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'test', 'Tenant A activity'),
  ('70000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'test', 'Tenant B activity');
insert into public.quotes (id, business_id, number, customer_id, lead_id) values
  ('80000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'TENANT-A-TEST', '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001'),
  ('80000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'TENANT-B-TEST', '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002');
insert into public.quote_items (id, business_id, quote_id, description) values
  ('90000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000001', 'Tenant A item'),
  ('90000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '80000000-0000-0000-0000-000000000002', 'Tenant B item');
insert into public.appointments (id, business_id, customer_id, lead_id, starts_at) values
  ('a0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', now()),
  ('a0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', now());
insert into public.messages (id, business_id, customer_id, lead_id, direction, body) values
  ('b0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'inbound', 'Tenant A message'),
  ('b0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', 'inbound', 'Tenant B message');
insert into public.follow_ups (id, business_id, customer_id, lead_id, type) values
  ('c0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'quote'),
  ('c0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', 'quote');
insert into public.automations (id, business_id, key, name, trigger) values
  ('d0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'tenant-a-test', 'Tenant A automation', 'test'),
  ('d0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'tenant-b-test', 'Tenant B automation', 'test');
insert into public.automation_runs (id, business_id, automation_id, customer_id, lead_id) values
  ('e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001'),
  ('e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002');
insert into public.notifications (id, business_id, title) values
  ('f0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Tenant A notification'),
  ('f0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'Tenant B notification');

create function pg_temp.assert_denied(_statement text)
returns void
language plpgsql
as $$
begin
  execute _statement;
  raise exception using errcode = 'P0001', message = 'Expected row-level security denial was not raised';
exception when insufficient_privilege then
  null;
end
$$;

set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}',
  true
);

do $$
declare
  _own_businesses integer;
  _other_businesses integer;
  _own_memberships integer;
  _other_memberships integer;
begin
  select count(*) into _own_businesses from public.businesses
  where id = '20000000-0000-0000-0000-000000000001';
  select count(*) into _other_businesses from public.businesses
  where id = '20000000-0000-0000-0000-000000000002';
  select count(*) into _own_memberships from public.business_members
  where user_id = '10000000-0000-0000-0000-000000000001';
  select count(*) into _other_memberships from public.business_members
  where user_id = '10000000-0000-0000-0000-000000000002';
  if _own_businesses <> 1 or _other_businesses <> 0
     or _own_memberships <> 1 or _other_memberships <> 0 then
    raise exception 'Business or membership SELECT isolation failed';
  end if;
end
$$;

select pg_temp.assert_denied($query$
  insert into public.businesses (name) values ('Unauthorized business')
$query$);
select pg_temp.assert_denied($query$
  update public.businesses set name = 'Unauthorized' where id = '20000000-0000-0000-0000-000000000001'
$query$);
select pg_temp.assert_denied($query$
  delete from public.businesses where id = '20000000-0000-0000-0000-000000000001'
$query$);
select pg_temp.assert_denied($query$
  insert into public.business_members (business_id, user_id)
  values ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001')
$query$);
select pg_temp.assert_denied($query$
  update public.business_members set role = 'owner'
  where business_id = '20000000-0000-0000-0000-000000000001'
    and user_id = '10000000-0000-0000-0000-000000000001'
$query$);
select pg_temp.assert_denied($query$
  delete from public.business_members
  where business_id = '20000000-0000-0000-0000-000000000001'
    and user_id = '10000000-0000-0000-0000-000000000001'
$query$);
select pg_temp.assert_denied($query$
  select public.submit_public_quote_request(
    '20000000-0000-0000-0000-000000000001',
    '{"firstName":"Unauthorized","lastName":"Caller","email":"unauthorized@example.test","phone":"2145550100"}',
    '{"year":2024,"make":"Test","model":"Unauthorized","color":""}',
    'tenant-a-service'
  )
$query$);
select pg_temp.assert_denied($query$
  select public.submit_public_booking_request(
    '20000000-0000-0000-0000-000000000001',
    '{"firstName":"Unauthorized","lastName":"Caller","email":"unauthorized@example.test","phone":"2145550100"}',
    '{"year":2024,"make":"Test","model":"Unauthorized","color":""}',
    'tenant-a-service',
    current_date + 1,
    '8:00 AM',
    now() + interval '1 day',
    ''
  )
$query$);

select pg_temp.assert_denied($query$
  insert into public.services (business_id, slug, name)
  values ('20000000-0000-0000-0000-000000000002', 'unauthorized-insert-service', 'Unauthorized')
$query$);
select pg_temp.assert_denied($query$
  insert into public.customers (business_id, first_name, last_name, email)
  values ('20000000-0000-0000-0000-000000000002', 'Unauthorized', 'Insert', 'unauthorized@example.test')
$query$);
select pg_temp.assert_denied($query$
  insert into public.vehicles (business_id, customer_id, year, make, model)
  values ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 2024, 'Test', 'Unauthorized')
$query$);
select pg_temp.assert_denied($query$
  insert into public.leads (business_id, customer_id)
  values ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002')
$query$);
select pg_temp.assert_denied($query$
  insert into public.lead_activities (business_id, lead_id, customer_id, type, title)
  values ('20000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'test', 'Unauthorized')
$query$);
select pg_temp.assert_denied($query$
  insert into public.quotes (business_id, number, customer_id)
  values ('20000000-0000-0000-0000-000000000002', 'UNAUTHORIZED-QUOTE', '40000000-0000-0000-0000-000000000002')
$query$);
select pg_temp.assert_denied($query$
  insert into public.quote_items (business_id, quote_id, description)
  values ('20000000-0000-0000-0000-000000000002', '80000000-0000-0000-0000-000000000002', 'Unauthorized')
$query$);
select pg_temp.assert_denied($query$
  insert into public.appointments (business_id, customer_id, starts_at)
  values ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', now())
$query$);
select pg_temp.assert_denied($query$
  insert into public.messages (business_id, customer_id, direction, body)
  values ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'inbound', 'Unauthorized')
$query$);
select pg_temp.assert_denied($query$
  insert into public.follow_ups (business_id, customer_id, type)
  values ('20000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'quote')
$query$);
select pg_temp.assert_denied($query$
  insert into public.automations (business_id, key, name, trigger)
  values ('20000000-0000-0000-0000-000000000002', 'unauthorized-insert', 'Unauthorized', 'test')
$query$);
select pg_temp.assert_denied($query$
  insert into public.automation_runs (business_id, automation_id)
  values ('20000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002')
$query$);
select pg_temp.assert_denied($query$
  insert into public.notifications (business_id, title)
  values ('20000000-0000-0000-0000-000000000002', 'Unauthorized')
$query$);

do $$
declare
  _table text;
  _visible integer;
  _affected integer;
  _tables text[] := array[
    'services', 'customers', 'vehicles', 'leads', 'lead_activities', 'quotes',
    'quote_items', 'appointments', 'messages', 'follow_ups', 'automations',
    'automation_runs', 'notifications'
  ];
begin
  foreach _table in array _tables loop
    execute format('select count(*) from public.%I where business_id = $1', _table)
      into _visible using '20000000-0000-0000-0000-000000000002'::uuid;
    if _visible <> 0 then
      raise exception 'Cross-business SELECT was permitted on %', _table;
    end if;

    execute format('select count(*) from public.%I where business_id = $1', _table)
      into _visible using '20000000-0000-0000-0000-000000000001'::uuid;
    if _visible <> 1 then
      raise exception 'Own-business SELECT failed on %', _table;
    end if;

    begin
      execute format('update public.%I set business_id = $1 where business_id = $2', _table)
        using '20000000-0000-0000-0000-000000000002'::uuid,
              '20000000-0000-0000-0000-000000000001'::uuid;
      raise exception 'Cross-business UPDATE was permitted on %', _table;
    exception when insufficient_privilege then
      null;
    end;

    execute format('delete from public.%I where business_id = $1', _table)
      using '20000000-0000-0000-0000-000000000002'::uuid;
    get diagnostics _affected = row_count;
    if _affected <> 0 then
      raise exception 'Cross-business DELETE affected rows on %', _table;
    end if;
  end loop;

  begin
    insert into public.leads (business_id, customer_id)
    values (
      '20000000-0000-0000-0000-000000000001',
      '40000000-0000-0000-0000-000000000002'
    );
    raise exception 'Cross-business relationship was permitted';
  exception when foreign_key_violation then
    null;
  end;
end
$$;

set local role service_role;
do $$
declare
  _appointment_date date := current_date + 1;
  _appointment_time text;
  _starts_at timestamptz;
  _quote_result jsonb;
  _booking_result jsonb;
  _before_count integer;
  _after_count integer;
begin
  while extract(isodow from _appointment_date) > 5 loop
    _appointment_date := _appointment_date + 1;
  end loop;
  _appointment_time := case when extract(isodow from _appointment_date) = 6 then '10:00 AM' else '8:00 AM' end;
  _starts_at := ((_appointment_date::text || ' ' || _appointment_time)::timestamp without time zone)
    at time zone 'America/Chicago';

  _quote_result := public.submit_public_quote_request(
    '20000000-0000-0000-0000-000000000001',
    '{"firstName":"Atomic","lastName":"Quote","email":"atomic-quote@example.test","phone":"2145550191"}',
    '{"year":2024,"make":"Test","model":"Quote","color":"Black"}',
    'tenant-a-service',
    null,
    null,
    null,
    ''
  );
  if not (_quote_result ? 'leadId') or not (_quote_result ? 'estimate') then
    raise exception 'Atomic quote request returned an invalid result';
  end if;

  _booking_result := public.submit_public_booking_request(
    '20000000-0000-0000-0000-000000000001',
    '{"firstName":"Atomic","lastName":"Booking","email":"atomic-booking@example.test","phone":"2145550192"}',
    '{"year":2024,"make":"Test","model":"Booking","color":"Blue"}',
    'tenant-a-service',
    _appointment_date,
    _appointment_time,
    _starts_at,
    ''
  );
  if not (_booking_result ? 'appointmentId') or _booking_result->>'service' <> 'Tenant A Service' then
    raise exception 'Atomic booking request returned an invalid result';
  end if;

  select count(*) into _before_count
  from public.customers
  where business_id = '20000000-0000-0000-0000-000000000001';
  begin
    perform public.submit_public_quote_request(
      '20000000-0000-0000-0000-000000000001',
      '{"firstName":"Atomic","lastName":"Rollback","email":"atomic-rollback@example.test","phone":"2145550193"}',
      '{"year":"invalid","make":"Test","model":"Rollback","color":""}',
      'tenant-a-service'
    );
    raise exception 'Invalid public quote unexpectedly succeeded';
  exception when invalid_text_representation then
    null;
  end;
  select count(*) into _after_count
  from public.customers
  where business_id = '20000000-0000-0000-0000-000000000001';
  if _after_count <> _before_count then
    raise exception 'Failed public quote left a partial customer record';
  end if;
end
$$;

reset role;
do $$
declare
  _suffix text := txid_current()::text;
  _service uuid;
  _customer uuid;
  _vehicle uuid;
  _lead uuid;
  _quote uuid;
  _appointment uuid;
begin
  insert into public.services (slug, name)
  values ('tenant-a-crud-' || _suffix, 'CRUD service')
  returning id into _service;
  update public.services set name = 'Updated CRUD service' where id = _service;

  insert into public.customers (first_name, last_name, email)
  values ('CRUD', 'Customer', 'crud-' || _suffix || '@example.test')
  returning id into _customer;
  update public.customers set notes = 'Updated by tenant A' where id = _customer;

  insert into public.vehicles (customer_id, year, make, model)
  values (_customer, 2024, 'Test', 'CRUD')
  returning id into _vehicle;
  update public.vehicles set color = 'Blue' where id = _vehicle;

  insert into public.leads (customer_id, vehicle_id, service_id)
  values (_customer, _vehicle, _service)
  returning id into _lead;
  update public.leads set status = 'qualified' where id = _lead;

  insert into public.quotes (number, customer_id, lead_id, vehicle_id, service_id)
  values ('CRUD-' || _suffix, _customer, _lead, _vehicle, _service)
  returning id into _quote;
  update public.quotes set status = 'sent' where id = _quote;

  insert into public.appointments (customer_id, vehicle_id, service_id, lead_id, starts_at)
  values (_customer, _vehicle, _service, _lead, now())
  returning id into _appointment;
  begin
    insert into public.appointments (customer_id, vehicle_id, service_id, lead_id, starts_at)
    values (_customer, _vehicle, _service, _lead, now() + interval '30 minutes');
    raise exception 'Overlapping appointment was permitted';
  exception when exclusion_violation then
    null;
  end;
  update public.appointments set status = 'completed' where id = _appointment;

  delete from public.appointments where id = _appointment;
  delete from public.quotes where id = _quote;
  delete from public.leads where id = _lead;
  delete from public.vehicles where id = _vehicle;
  delete from public.customers where id = _customer;
  delete from public.services where id = _service;
end
$$;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}',
  true
);
insert into public.customers (first_name, last_name, email)
values ('Default', 'Tenant', 'default-tenant@example.test');
do $$
begin
  if not exists (
    select 1 from public.customers
    where email = 'default-tenant@example.test'
      and business_id = '20000000-0000-0000-0000-000000000001'
  ) then
    raise exception 'Default business assignment failed';
  end if;
end
$$;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000003', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000003","role":"authenticated"}',
  true
);
do $$
begin
  begin
    perform public.current_business_id();
    raise exception 'A user without membership received a business context';
  exception when raise_exception then
    if sqlerrm <> 'No business membership is configured for this user' then
      raise;
    end if;
  end;
end
$$;

reset role;
do $$
begin
  if has_table_privilege('anon', 'public.customers', 'select')
     or has_table_privilege('anon', 'public.customers', 'insert')
     or has_table_privilege('anon', 'public.customers', 'update')
     or has_table_privilege('anon', 'public.customers', 'delete') then
    raise exception 'Anonymous role has private customer table privileges';
  end if;
end
$$;

rollback;
