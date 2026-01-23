-- Fix ambiguous email column reference by fully qualifying it
create or replace function public.get_admin_affiliates()
returns table (
  id uuid,
  user_id uuid,
  referral_code text,
  commission_rate numeric,
  total_earnings numeric,
  status text,
  created_at timestamp with time zone,
  email text,
  business_name text
)
security definer
set search_path = public
language plpgsql
as $$
declare
  current_user_email text;
begin
  -- Get current user email (explicitly alias table to avoid ambiguity with output param 'email')
  select u.email into current_user_email from auth.users u where u.id = auth.uid();

  -- Check if the requesting user is an admin OR is the super admin (case insensitive)
  if not exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid()
    and ur.role = 'admin'
  ) and lower(current_user_email) != 'harsh.tank@systrocode.tech' then
    raise exception 'Access denied';
  end if;

  return query
  select
    a.id,
    a.user_id,
    a.referral_code,
    a.commission_rate,
    a.total_earnings,
    a.status,
    a.created_at,
    u.email::text,
    p.business_name
  from public.affiliates a
  left join auth.users u on a.user_id = u.id
  left join public.profiles p on a.user_id = p.id
  order by a.created_at desc;
end;
$$;
