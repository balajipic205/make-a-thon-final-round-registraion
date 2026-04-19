-- =====================================================================
-- Make-a-Thon 7.0 — PATCH v2
-- Run this AFTER schema.sql + storage_buckets.sql + make_admin.sql.
-- Safe to re-run.
--
-- Adds:
--  • record_admin_login_attempt RPC (alias used by frontend)
--  • Tightens storage bucket size limits (member-photos 1 MB, payment 2 MB)
-- =====================================================================

-- 1) Frontend calls record_admin_login_attempt; we expose it as an alias.
create or replace function public.record_admin_login_attempt(p_email text, p_success boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_login_attempts (user_id, email, success)
  values (auth.uid(), p_email, p_success);
end;
$$;

grant execute on function public.record_admin_login_attempt(text, boolean) to anon, authenticated;

-- 2) Tighten bucket size limits to match UI rules.
update storage.buckets
   set file_size_limit = 1048576       -- 1 MB
 where id = 'member-photos';

update storage.buckets
   set file_size_limit = 2097152       -- 2 MB
 where id = 'payment-screenshots';
