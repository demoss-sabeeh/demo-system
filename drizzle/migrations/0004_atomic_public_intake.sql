-- Keep public intake multi-row writes atomic and protect appointment slots
-- against concurrent requests. These functions are callable only by the
-- trusted server-side service role; never expose that credential to a client.
-- Before deployment, validate this migration and the rollback-only SQL suite
-- on a disposable project and verify the target's applied migration history.

create or replace function public.submit_public_quote_request(
  p_business_id uuid,
  p_contact jsonb,
  p_vehicle jsonb,
  p_service_slug text,
  p_preferred_date date default null,
  p_preferred_time text default null,
  p_condition text default null,
  p_notes text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  _service record;
  _customer_id uuid;
  _vehicle_id uuid;
  _lead_id uuid;
  _estimate integer;
  _make text;
  _first_name text;
  _last_name text;
begin
  if p_business_id is null
     or nullif(btrim(p_contact->>'firstName'), '') is null
     or nullif(btrim(p_contact->>'lastName'), '') is null
     or nullif(btrim(p_contact->>'email'), '') is null
     or nullif(btrim(p_contact->>'phone'), '') is null then
    raise exception 'Invalid quote request';
  end if;

  select id, name, price_from
  into _service
  from public.services
  where business_id = p_business_id
    and slug = p_service_slug
    and active;
  if not found then
    raise exception 'Requested service is unavailable';
  end if;

  _first_name := btrim(p_contact->>'firstName');
  _last_name := btrim(p_contact->>'lastName');
  _make := btrim(p_vehicle->>'make');
  _estimate := _service.price_from + case
    when lower(_make) like '%bmw%'
      or lower(_make) like '%porsche%'
      or lower(_make) like '%mercedes%'
      or lower(_make) like '%audi%'
      or lower(_make) like '%land rover%'
      or lower(_make) like '%range rover%'
      or lower(_make) like '%chevrolet%' then 300
    else 100
  end;

  insert into public.customers (business_id, first_name, last_name, email, phone)
  values (
    p_business_id,
    _first_name,
    _last_name,
    lower(btrim(p_contact->>'email')),
    btrim(p_contact->>'phone')
  )
  returning id into _customer_id;

  insert into public.vehicles (business_id, customer_id, year, make, model, color)
  values (
    p_business_id,
    _customer_id,
    (p_vehicle->>'year')::integer,
    _make,
    btrim(p_vehicle->>'model'),
    coalesce(btrim(p_vehicle->>'color'), '')
  )
  returning id into _vehicle_id;

  insert into public.leads (
    business_id, customer_id, vehicle_id, service_id, source, status,
    estimated_value, preferred_date, preferred_time, vehicle_condition, notes
  )
  values (
    p_business_id, _customer_id, _vehicle_id, _service.id, 'website', 'new',
    _estimate, p_preferred_date, p_preferred_time, p_condition, coalesce(p_notes, '')
  )
  returning id into _lead_id;

  insert into public.lead_activities (business_id, lead_id, customer_id, type, title, detail)
  values (
    p_business_id, _lead_id, _customer_id, 'inquiry', 'Website inquiry submitted',
    format('Quote request for %s on %s %s %s', _service.name, p_vehicle->>'year', _make, btrim(p_vehicle->>'model'))
  );

  insert into public.notifications (business_id, title, body)
  values (
    p_business_id, 'New website inquiry',
    format('%s %s requested %s.', _first_name, _last_name, _service.name)
  );

  return jsonb_build_object(
    'leadId', _lead_id,
    'service', _service.name,
    'estimate', _estimate
  );
end
$$;

create or replace function public.submit_public_booking_request(
  p_business_id uuid,
  p_contact jsonb,
  p_vehicle jsonb,
  p_service_slug text,
  p_date date,
  p_time text,
  p_starts_at timestamptz,
  p_notes text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  _service record;
  _customer_id uuid;
  _vehicle_id uuid;
  _lead_id uuid;
  _appointment_id uuid;
  _location text;
  _local_start timestamp without time zone;
  _opening time without time zone;
  _closing time without time zone;
  _end_time time without time zone;
  _first_name text;
  _last_name text;
  _make text;
begin
  if p_business_id is null
     or p_date is null
     or p_starts_at is null
     or nullif(btrim(p_contact->>'firstName'), '') is null
     or nullif(btrim(p_contact->>'lastName'), '') is null
     or nullif(btrim(p_contact->>'email'), '') is null
     or nullif(btrim(p_contact->>'phone'), '') is null then
    raise exception 'Invalid appointment request';
  end if;

  -- Serialize booking attempts for this business. The slot is checked again
  -- while holding this transaction lock, making overlapping double-booking
  -- requests mutually exclusive.
  perform pg_advisory_xact_lock(hashtextextended(p_business_id::text, 0));

  select id, name, price_from, duration_hours
  into _service
  from public.services
  where business_id = p_business_id
    and slug = p_service_slug
    and active;
  if not found then
    raise exception 'Requested service is unavailable';
  end if;

  _local_start := p_starts_at at time zone 'America/Chicago';
  if (_local_start::date) <> p_date
     or to_char(_local_start, 'FMHH12:MI AM') <> p_time
     or p_starts_at <= now()
     or extract(isodow from p_date) = 7 then
    raise exception 'Choose a valid future appointment slot';
  end if;

  _opening := case when extract(isodow from p_date) = 6 then time '9:00 AM' else time '8:00 AM' end;
  _closing := case when extract(isodow from p_date) = 6 then time '4:00 PM' else time '6:00 PM' end;
  if (extract(isodow from p_date) = 6 and p_time not in ('10:00 AM', '1:00 PM'))
     or (extract(isodow from p_date) between 1 and 5 and p_time not in ('8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM')) then
    raise exception 'Choose an available appointment time';
  end if;

  _end_time := (_local_start + (_service.duration_hours * interval '1 hour'))::time;
  if _local_start::time < _opening
     or (_local_start + (_service.duration_hours * interval '1 hour'))::date <> p_date
     or _end_time > _closing then
    raise exception 'Service duration does not fit business hours';
  end if;

  if exists (
    select 1
    from public.appointments appointment
    where appointment.business_id = p_business_id
      and appointment.status not in ('cancelled', 'no_show')
      and appointment.starts_at < p_starts_at + (_service.duration_hours * interval '1 hour')
      and appointment.starts_at + (appointment.duration_hours * interval '1 hour') > p_starts_at
  ) then
    raise exception 'That time was just booked. Please choose another slot.';
  end if;

  _first_name := btrim(p_contact->>'firstName');
  _last_name := btrim(p_contact->>'lastName');
  _make := btrim(p_vehicle->>'make');

  insert into public.customers (business_id, first_name, last_name, email, phone)
  values (
    p_business_id,
    _first_name,
    _last_name,
    lower(btrim(p_contact->>'email')),
    btrim(p_contact->>'phone')
  )
  returning id into _customer_id;

  insert into public.vehicles (business_id, customer_id, year, make, model, color)
  values (
    p_business_id,
    _customer_id,
    (p_vehicle->>'year')::integer,
    _make,
    btrim(p_vehicle->>'model'),
    coalesce(btrim(p_vehicle->>'color'), '')
  )
  returning id into _vehicle_id;

  insert into public.leads (
    business_id, customer_id, vehicle_id, service_id, source, status,
    estimated_value, preferred_date, preferred_time, notes
  )
  values (
    p_business_id, _customer_id, _vehicle_id, _service.id, 'website', 'new',
    _service.price_from, p_date, p_time, coalesce(p_notes, '')
  )
  returning id into _lead_id;

  insert into public.appointments (
    business_id, customer_id, vehicle_id, service_id, lead_id,
    starts_at, duration_hours, status, notes
  )
  values (
    p_business_id, _customer_id, _vehicle_id, _service.id, _lead_id,
    p_starts_at, _service.duration_hours, 'requested', coalesce(p_notes, '')
  )
  returning id, location into _appointment_id, _location;

  insert into public.lead_activities (business_id, lead_id, customer_id, type, title, detail)
  values (
    p_business_id, _lead_id, _customer_id, 'inquiry',
    'Online appointment request submitted',
    format('%s requested for %s at %s', _service.name, p_date, p_time)
  );

  insert into public.notifications (business_id, title, body)
  values (
    p_business_id, 'New appointment request',
    format('%s %s requested %s for %s at %s.', _first_name, _last_name, _service.name, p_date, p_time)
  );

  return jsonb_build_object(
    'appointmentId', _appointment_id,
    'location', _location,
    'service', _service.name
  );
end
$$;

create or replace function public.prevent_appointment_overlap()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if new.business_id is null then
    raise exception using
      errcode = '23502',
      message = 'Business ownership is required for appointments';
  end if;

  if new.status in ('cancelled', 'no_show') then
    return new;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(new.business_id::text, 0));

  if exists (
    select 1
    from public.appointments appointment
    where appointment.business_id = new.business_id
      and appointment.id <> new.id
      and appointment.status not in ('cancelled', 'no_show')
      and appointment.starts_at < new.starts_at + (new.duration_hours * interval '1 hour')
      and appointment.starts_at + (appointment.duration_hours * interval '1 hour') > new.starts_at
  ) then
    raise exception using
      errcode = '23P01',
      message = 'Appointment overlaps an existing appointment',
      constraint = 'appointments_no_business_overlap';
  end if;

  return new;
end
$$;

create trigger appointments_prevent_overlap
  before insert or update of business_id, starts_at, duration_hours, status
  on public.appointments
  for each row
  execute function public.prevent_appointment_overlap();

revoke all privileges on function public.submit_public_quote_request(uuid, jsonb, jsonb, text, date, text, text, text)
  from public, anon, authenticated;
revoke all privileges on function public.submit_public_booking_request(uuid, jsonb, jsonb, text, date, text, timestamptz, text)
  from public, anon, authenticated;
revoke all privileges on function public.prevent_appointment_overlap() from public, anon, authenticated;
grant execute on function public.submit_public_quote_request(uuid, jsonb, jsonb, text, date, text, text, text)
  to service_role;
grant execute on function public.submit_public_booking_request(uuid, jsonb, jsonb, text, date, text, timestamptz, text)
  to service_role;
