
-- ============ SCHEMA ============
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null default '',
  description text not null default '',
  ideal_customer text not null default '',
  includes text[] not null default '{}',
  duration_hours numeric(4,1) not null default 2,
  price_from integer not null default 0,
  price_to integer,
  active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null default '',
  city text not null default 'Dallas, TX',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index customers_email_idx on public.customers (lower(email));

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  year integer not null,
  make text not null,
  model text not null,
  color text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index vehicles_customer_idx on public.vehicles(customer_id);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  source text not null default 'website' check (source in ('website','google','instagram','facebook','phone','referral')),
  status text not null default 'new' check (status in ('new','contacted','qualified','quoted','booked','completed','lost')),
  estimated_value integer not null default 0,
  preferred_date date,
  preferred_time text,
  vehicle_condition text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_status_idx on public.leads(status);
create index leads_customer_idx on public.leads(customer_id);
create index leads_created_idx on public.leads(created_at desc);

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete cascade,
  type text not null,
  title text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);
create index activities_lead_idx on public.lead_activities(lead_id, created_at);
create index activities_created_idx on public.lead_activities(created_at desc);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  lead_id uuid references public.leads(id) on delete set null,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','sent','viewed','accepted','declined','expired')),
  discount integer not null default 0,
  notes text not null default '',
  expires_at date,
  created_at timestamptz not null default now()
);
create index quotes_customer_idx on public.quotes(customer_id);
create index quotes_lead_idx on public.quotes(lead_id);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  description text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price integer not null default 0,
  sort integer not null default 0
);
create index quote_items_quote_idx on public.quote_items(quote_id);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  starts_at timestamptz not null,
  duration_hours numeric(4,1) not null default 2,
  status text not null default 'confirmed' check (status in ('requested','confirmed','in_progress','completed','cancelled','no_show')),
  location text not null default 'Apex Studio — 2211 Commerce St, Dallas, TX',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index appointments_start_idx on public.appointments(starts_at);
create index appointments_customer_idx on public.appointments(customer_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  channel text not null default 'sms' check (channel in ('sms','email','ai')),
  direction text not null check (direction in ('inbound','outbound')),
  body text not null,
  automated boolean not null default false,
  created_at timestamptz not null default now()
);
create index messages_customer_idx on public.messages(customer_id, created_at);

create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  type text not null check (type in ('quote','no_response','missed_inquiry','appointment_reminder','post_service','reactivation')),
  reason text not null default '',
  last_contact_at timestamptz,
  next_contact_at timestamptz,
  status text not null default 'pending' check (status in ('pending','scheduled','completed','cancelled')),
  created_at timestamptz not null default now()
);
create index follow_ups_next_idx on public.follow_ups(next_contact_at);

create table public.automations (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text not null default '',
  trigger text not null,
  conditions text[] not null default '{}',
  actions text[] not null default '{}',
  delay text,
  status text not null default 'active' check (status in ('active','paused')),
  sort integer not null default 0
);

create table public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_id uuid not null references public.automations(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'success' check (status in ('success','failed','skipped')),
  summary text not null default '',
  created_at timestamptz not null default now()
);
create index automation_runs_created_idx on public.automation_runs(created_at desc);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ GRANTS + RLS ============
do $$
declare t text;
begin
  foreach t in array array['services','customers','vehicles','leads','lead_activities','quotes','quote_items','appointments','messages','follow_ups','automations','automation_runs','notifications'] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Staff full access" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

grant select on public.services to anon;
create policy "Public can view active services" on public.services for select to anon using (active = true);

-- ============ SEED FUNCTION ============
create or replace function public.seed_demo()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  fn text[] := array['Michael','Sarah','David','Emily','Chris','Jessica','Ryan','Ashley','Marcus','Lauren','Kevin','Olivia','Brandon','Megan','Tyler','Rachel','Jason','Natalie','Andrew','Hannah','Derek','Sophia','Justin','Taylor','Carlos','Priya'];
  ln text[] := array['Johnson','Martinez','Williams','Chen','Brown','Davis','Patel','Thompson','Garcia','Nguyen','Wilson','Anderson','Reed','Moore','Jackson','White','Harris','Clark','Lewis','Robinson','Walker','Young','Allen','King','Hernandez','Shah'];
  cities text[] := array['Dallas, TX','Plano, TX','Frisco, TX','Highland Park, TX','Irving, TX','Southlake, TX'];
  vmake text[] := array['BMW','BMW','Porsche','Tesla','Mercedes-AMG','Audi','Land Rover','Ford','Chevrolet','Toyota','Lexus'];
  vmodel text[] := array['M4','M3','911 Carrera S','Model Y','C63 S','RS5','Range Rover Sport','F-150 Lariat','Corvette Stingray','GR Supra','GX 550'];
  vyear int[] := array[2024,2023,2022,2024,2021,2023,2024,2022,2023,2022,2024];
  vcolor text[] := array['Black Sapphire','Brooklyn Grey','GT Silver','Pearl White','Obsidian Black','Nardo Grey','Santorini Black','Agate Black','Torch Red','Renaissance Red','Eminent White'];
  lstatus text[] := array['new','new','new','new','new','new','contacted','contacted','contacted','contacted','contacted','qualified','qualified','qualified','qualified','qualified','quoted','quoted','quoted','quoted','quoted','booked','booked','booked','booked','booked','completed','completed','completed','completed','lost','lost'];
  sources text[] := array['website','google','instagram','website','referral','facebook','phone'];
  svc uuid[];
  svc_price int[];
  svc_name text[];
  svc_dur numeric[];
  cust uuid[] := '{}';
  veh uuid[] := '{}';
  autos uuid[];
  c uuid; v uuid; l uuid; q uuid;
  i int; j int; si int; ci int; st text; created timestamptz; val int; qs text;
  day_off int; hrs int[] := array[8,10,13,15];
  ap_status text;
  fu_types text[] := array['quote','no_response','missed_inquiry','appointment_reminder','post_service','reactivation'];
  fu_reasons text[] := array['Quote sent — no response after 48 hours','Inquiry not answered within business hours','Missed call from website number','Appointment reminder — 24 hours before','Post-service check-in and review request','No visit in 6+ months — maintenance due'];
  qn int := 1040;
begin
  -- services
  insert into services (slug,name,short_description,description,ideal_customer,includes,duration_hours,price_from,price_to,sort) values
  ('full-detail','Full Detail','Complete interior and exterior reset for daily drivers and weekend cars.','A meticulous top-to-bottom detail: hand wash, decontamination, machine-applied sealant, and a full interior deep clean with steam and leather care.','Owners who want their vehicle back to showroom condition before a sale, trip, or season change.',array['Two-bucket hand wash and foam pre-soak','Iron and tar decontamination','Clay bar treatment','6-month paint sealant','Interior vacuum, steam and shampoo','Leather clean and condition','Glass, trim and tire dressing'],4,349,549,1),
  ('ceramic-coating','Ceramic Coating','Multi-year gloss and protection bonded to your paint.','Professional-grade ceramic coating applied in a controlled studio after full paint preparation. Delivers deep gloss, hydrophobic protection and easier maintenance for years.','Owners of new or well-kept vehicles who want long-term protection and less time washing.',array['Paint preparation','Surface decontamination','Paint correction where required','Ceramic coating application','Wheel faces and glass coating','Final inspection under studio lighting'],6,899,2400,2),
  ('paint-correction','Paint Correction','Remove swirls, haze and light scratches with machine polishing.','Single- or multi-stage machine polishing to restore clarity and depth. Every vehicle is paint-depth measured before correction begins.','Dark-colored vehicles with visible swirl marks, or anyone preparing for ceramic coating.',array['Paint depth measurement','Test spot to set the process','One- to three-stage machine polish','Panel wipe and inspection','Sealant top coat'],8,499,1500,3),
  ('paint-protection-film','Paint Protection Film','Self-healing film against rock chips and road debris.','Precision-cut, self-healing urethane film installed on high-impact areas or the full vehicle. Nearly invisible and backed by manufacturer warranty.','Performance and highway-driven vehicles exposed to rock chips.',array['Front-end or full-body coverage options','Computer-cut patterns','Wrapped edges where possible','Self-healing top coat','Post-install inspection'],12,1800,6500,4),
  ('interior-detail','Interior Detail','Deep clean and protection for every interior surface.','Steam cleaning, extraction, and conditioning for seats, carpets, and trim. Ideal for family vehicles and lease returns.','Families, pet owners, and lease returns.',array['Full vacuum and compressed-air blowout','Steam clean of vents and crevices','Carpet and seat extraction','Leather clean and condition','Interior UV protectant','Odor treatment'],3,199,349,5),
  ('maintenance-detail','Maintenance Detail','Keep coated and protected vehicles looking new.','A safe maintenance wash and refresh designed for vehicles that already have coating or PPF. Recommended every 4–6 weeks.','Existing ceramic coating and PPF customers.',array['pH-neutral hand wash','Coating-safe decontamination','Ceramic booster top-up','Quick interior refresh','Wheel and tire clean'],2,129,199,6),
  ('fleet-detailing','Fleet / Commercial Detailing','Scheduled detailing for company vehicles and dealer inventory.','Recurring on-site or in-studio detailing for fleets, dealerships, and commercial vehicles with consolidated invoicing.','Dealerships, property managers, and service companies with 5+ vehicles.',array['On-site or in-studio service','Recurring schedule','Per-vehicle condition notes','Consolidated monthly invoicing'],2,79,149,7);

  select array_agg(id order by sort), array_agg(price_from order by sort), array_agg(name order by sort), array_agg(duration_hours order by sort)
    into svc, svc_price, svc_name, svc_dur from services;

  -- automations
  insert into automations (key,name,description,trigger,conditions,actions,delay,status,sort) values
  ('instant_lead_response','Instant Lead Response','Reply to every new website inquiry within seconds, day or night.','New website inquiry',array['Lead source is Website','Lead has not been contacted'],array['Create lead','Send SMS response','Notify team','Create follow-up'],null,'active',1),
  ('missed_inquiry_recovery','Missed Inquiry Recovery','Turn missed calls and unanswered inquiries into conversations.','Missed call or inquiry',array['No reply within 15 minutes'],array['Create lead','Send SMS message','Create follow-up'],'15 minutes','active',2),
  ('quote_follow_up','Quote Follow-Up','Nudge customers who have not accepted a quote.','Quote not accepted',array['Quote status is Sent or Viewed'],array['Send follow-up message','Create follow-up task'],'48 hours','active',3),
  ('appointment_reminder','Appointment Reminder','Reduce no-shows with a reminder before every appointment.','Upcoming appointment',array['Appointment is Confirmed'],array['Send SMS reminder','Send email reminder'],'24 hours before','active',4),
  ('post_service_follow_up','Post-Service Follow-Up','Check in after service and invite a review.','Appointment completed',array['Appointment status is Completed'],array['Send thank-you message','Recommend next service'],'1 day','active',5),
  ('customer_reactivation','Customer Reactivation','Bring back customers who are due for maintenance.','Customer inactive',array['No appointment in 180 days'],array['Create reactivation follow-up','Send maintenance offer'],'180 days','paused',6);
  select array_agg(id order by sort) into autos from automations;

  -- customers + vehicles
  for i in 1..26 loop
    insert into customers (first_name,last_name,email,phone,city,created_at)
    values (fn[i], ln[i], lower(fn[i]||'.'||ln[i])||'@example.com', '(214) 555-'||lpad((1000+i*37)::text,4,'0'), cities[1+(i%6)], now() - make_interval(days => 120 - i*4))
    returning id into c;
    cust := cust || c;
    j := 1 + ((i-1) % 11);
    insert into vehicles (customer_id,year,make,model,color,created_at)
    values (c, vyear[j], vmake[j], vmodel[j], vcolor[j], now() - make_interval(days => 120 - i*4)) returning id into v;
    veh := veh || v;
    if i in (1,4,9) then
      j := 1 + ((i+5) % 11);
      insert into vehicles (customer_id,year,make,model,color) values (c, vyear[j], vmake[j], vmodel[j], vcolor[j]);
    end if;
  end loop;

  -- leads + activities + quotes
  for i in 1..32 loop
    ci := 1 + ((i-1) % 26);
    si := 1 + ((i-1) % 7);
    st := lstatus[i];
    created := now() - make_interval(hours => (i-1)*19 + 2);
    val := svc_price[si] + ((i % 4) * 150);
    insert into leads (customer_id,vehicle_id,service_id,source,status,estimated_value,preferred_date,preferred_time,vehicle_condition,notes,created_at,updated_at)
    values (cust[ci], veh[ci], svc[si], sources[1+(i%7)], st, val, (current_date + ((i%10)-2)), (array['Morning','Midday','Afternoon'])[1+(i%3)], (array['Excellent','Good','Fair','Needs attention'])[1+(i%4)], '', created, created + interval '2 hours')
    returning id into l;

    insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values
      (l, cust[ci], 'inquiry', 'Inquiry received', 'Requested '||svc_name[si]||' via '||sources[1+(i%7)], created),
      (l, cust[ci], 'auto_response', 'Automatic response sent', 'Instant Lead Response sent an SMS confirmation', created + interval '20 seconds');
    if st <> 'new' then
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'contacted', 'Customer replied', 'Conversation started by SMS', created + interval '3 minutes');
    end if;
    if st in ('qualified','quoted','booked','completed') then
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'qualified', 'Lead qualified', 'Vehicle, service and timing confirmed', created + interval '8 minutes');
    end if;
    if st in ('quoted','booked','completed','lost') then
      qn := qn + 1;
      qs := case st when 'quoted' then (case when i%2=0 then 'sent' else 'viewed' end) when 'lost' then 'declined' else 'accepted' end;
      insert into quotes (number,lead_id,customer_id,vehicle_id,service_id,status,discount,notes,expires_at,created_at)
      values ('Q-'||qn, l, cust[ci], veh[ci], svc[si], qs, case when i%3=0 then 50 else 0 end, 'Pricing assumes paint condition confirmed at drop-off.', (created + interval '14 days')::date, created + interval '15 minutes')
      returning id into q;
      insert into quote_items (quote_id,description,quantity,unit_price,sort) values
        (q, svc_name[si], 1, svc_price[si], 1),
        (q, 'Paint decontamination & prep', 1, 100 + (i%4)*50, 2);
      if i % 2 = 0 then insert into quote_items (quote_id,description,quantity,unit_price,sort) values (q, 'Wheel & caliper coating', 1, 150, 3); end if;
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'quote', 'Quote created', 'Q-'||qn||' sent to customer', created + interval '15 minutes');
    end if;
    if st in ('booked','completed') then
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'booked', 'Appointment booked', svc_name[si]||' scheduled', created + interval '25 minutes');
    end if;
    if st = 'completed' then
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'completed', 'Service completed', 'Vehicle history updated', created + interval '2 days');
    end if;
    if st = 'lost' then
      insert into lead_activities (lead_id,customer_id,type,title,detail,created_at) values (l, cust[ci], 'lost', 'Marked lost', 'Customer chose to postpone', created + interval '3 days');
    end if;

    if i <= 10 then
      insert into messages (customer_id,lead_id,channel,direction,body,automated,created_at) values
        (cust[ci], l, 'sms', 'outbound', 'Hi '||fn[ci]||', thanks for reaching out to Apex Auto Detailing! We received your '||svc_name[si]||' request and a specialist will confirm details shortly.', true, created + interval '20 seconds'),
        (cust[ci], l, case when i%3=0 then 'email' else 'sms' end, 'inbound', (array['Thanks! Is Friday morning available?','How long does it usually take?','Do you offer pickup?','Great — the paint has a few swirl marks on the hood.','What is the warranty on that?'])[1+(i%5)], false, created + interval '3 minutes');
      if st <> 'new' and st <> 'contacted' then
        insert into messages (customer_id,lead_id,channel,direction,body,created_at) values (cust[ci], l, 'sms', 'outbound', 'Absolutely. I''ll put together a quote now and send over the available times.', created + interval '6 minutes');
      end if;
    end if;
  end loop;

  -- ai assistant conversations
  insert into messages (customer_id,channel,direction,body,automated,created_at) values
    (cust[12], 'ai', 'inbound', 'Do you work on Teslas? Wondering about ceramic coating on a Model Y.', false, now() - interval '5 hours'),
    (cust[12], 'ai', 'outbound', 'Yes — we coat Tesla vehicles regularly. Ceramic coating starts at $899 and takes about 6 hours. Would you like to request a quote?', true, now() - interval '5 hours' + interval '4 seconds'),
    (cust[15], 'ai', 'inbound', 'What are your hours on Saturday?', false, now() - interval '28 hours'),
    (cust[15], 'ai', 'outbound', 'We are open Saturday 9:00 AM – 4:00 PM. Would you like me to check availability?', true, now() - interval '28 hours' + interval '3 seconds');

  -- appointments
  for i in 1..22 loop
    ci := 1 + ((i*3) % 26);
    si := 1 + (i % 7);
    day_off := i - 11;
    ap_status := case
      when day_off < 0 then (case when i = 3 then 'no_show' when i = 6 then 'cancelled' else 'completed' end)
      when day_off = 0 then (case when i % 2 = 0 then 'in_progress' else 'confirmed' end)
      when day_off > 6 then 'requested'
      else 'confirmed' end;
    insert into appointments (customer_id,vehicle_id,service_id,starts_at,duration_hours,status,notes,created_at)
    values (cust[ci], veh[ci], svc[si], ((current_date + day_off)::timestamp + make_interval(hours => hrs[1+(i%4)])) at time zone 'America/Chicago', svc_dur[si], ap_status, '', now() - make_interval(days => 20 - i));
    if day_off = 0 and i % 2 = 1 then
      insert into appointments (customer_id,vehicle_id,service_id,starts_at,duration_hours,status)
      values (cust[(ci % 26)+1], veh[(ci % 26)+1], svc[6], ((current_date)::timestamp + interval '15 hours') at time zone 'America/Chicago', 2, 'confirmed');
    end if;
  end loop;

  -- follow-ups
  for i in 1..20 loop
    ci := 1 + ((i*5) % 26);
    insert into follow_ups (customer_id,vehicle_id,type,reason,last_contact_at,next_contact_at,status,created_at)
    values (cust[ci], veh[ci], fu_types[1+((i-1)%6)], fu_reasons[1+((i-1)%6)], now() - make_interval(days => (i%9)+1), now() + make_interval(days => (i%7)-2, hours => i), case when i%5=0 then 'completed' when i%4=0 then 'scheduled' when i=7 then 'cancelled' else 'pending' end, now() - make_interval(days => i));
  end loop;

  -- automation runs
  for i in 1..16 loop
    ci := 1 + ((i*7) % 26);
    insert into automation_runs (automation_id,customer_id,status,summary,created_at)
    values (autos[1+((i-1)%5)], cust[ci], case when i=9 then 'skipped' else 'success' end,
      (array['SMS response sent to '||fn[ci],'Recovery message sent to '||fn[ci],'Quote follow-up sent to '||fn[ci],'Reminder sent to '||fn[ci],'Thank-you message sent to '||fn[ci]])[1+((i-1)%5)],
      now() - make_interval(hours => i*6));
  end loop;

  insert into notifications (title,body,created_at) values
    ('New website inquiry','A new quote request arrived from the website.', now() - interval '2 hours'),
    ('Quote viewed','Q-1042 was opened by the customer.', now() - interval '6 hours'),
    ('Appointment tomorrow','3 confirmed appointments are scheduled for tomorrow.', now() - interval '20 hours');
end $$;

create or replace function public.reset_demo()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authorized';
  end if;
  truncate public.notifications, public.automation_runs, public.automations, public.follow_ups, public.messages,
    public.appointments, public.quote_items, public.quotes, public.lead_activities, public.leads,
    public.vehicles, public.customers, public.services restart identity cascade;
  perform public.seed_demo();
end $$;

revoke all on function public.seed_demo() from public, anon, authenticated;
revoke all on function public.reset_demo() from public, anon;
grant execute on function public.reset_demo() to authenticated;

select public.seed_demo();
