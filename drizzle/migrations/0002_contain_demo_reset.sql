-- Production containment: remove the global demo reset RPC.
-- Before deployment, verify the target Supabase project and applied migration
-- history; apply this migration only through the reviewed deployment process.
-- Future demo reset functionality must use a separate demo database or an
-- explicitly isolated dataset with server-side scope enforcement.
do $$
begin
  if to_regprocedure('public.reset_demo()') is not null then
    execute 'revoke all privileges on function public.reset_demo() from public, anon, authenticated';
    execute 'drop function public.reset_demo()';
  end if;
end
$$;
