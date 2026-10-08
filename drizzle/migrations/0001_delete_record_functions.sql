create or replace function public.delete_lead(_id uuid) returns void language plpgsql security invoker set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not authorized'; end if;
  update quotes set lead_id = null where lead_id = _id;
  update appointments set lead_id = null where lead_id = _id;
  update messages set lead_id = null where lead_id = _id;
  update follow_ups set lead_id = null where lead_id = _id;
  update automation_runs set lead_id = null where lead_id = _id;
  update lead_activities set lead_id = null where lead_id = _id;
  delete from leads where id = _id;
  if not found then raise exception 'Lead not found'; end if;
end $$;

create or replace function public.delete_vehicle(_id uuid) returns void language plpgsql security invoker set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not authorized'; end if;
  update leads set vehicle_id = null where vehicle_id = _id;
  update quotes set vehicle_id = null where vehicle_id = _id;
  update appointments set vehicle_id = null where vehicle_id = _id;
  update follow_ups set vehicle_id = null where vehicle_id = _id;
  delete from vehicles where id = _id;
  if not found then raise exception 'Vehicle not found'; end if;
end $$;

create or replace function public.delete_customer(_id uuid) returns void language plpgsql security invoker set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not authorized'; end if;
  delete from quote_items where quote_id in (select id from quotes where customer_id = _id);
  delete from automation_runs where customer_id = _id or lead_id in (select id from leads where customer_id = _id);
  delete from lead_activities where customer_id = _id or lead_id in (select id from leads where customer_id = _id);
  delete from messages where customer_id = _id;
  delete from follow_ups where customer_id = _id;
  delete from appointments where customer_id = _id;
  delete from quotes where customer_id = _id;
  delete from leads where customer_id = _id;
  delete from vehicles where customer_id = _id;
  delete from customers where id = _id;
  if not found then raise exception 'Customer not found'; end if;
end $$;

create or replace function public.delete_service(_id uuid) returns void language plpgsql security invoker set search_path = public as $$
declare n int;
begin
  if auth.uid() is null then raise exception 'Not authorized'; end if;
  select (select count(*) from leads where service_id = _id) + (select count(*) from quotes where service_id = _id) + (select count(*) from appointments where service_id = _id) into n;
  if n > 0 then raise exception 'This service is used by % lead(s), quote(s) or appointment(s). Deactivate it instead.', n; end if;
  delete from services where id = _id;
  if not found then raise exception 'Service not found'; end if;
end $$;

revoke execute on function public.delete_lead(uuid), public.delete_vehicle(uuid), public.delete_customer(uuid), public.delete_service(uuid) from public, anon;
grant execute on function public.delete_lead(uuid), public.delete_vehicle(uuid), public.delete_customer(uuid), public.delete_service(uuid) to authenticated;