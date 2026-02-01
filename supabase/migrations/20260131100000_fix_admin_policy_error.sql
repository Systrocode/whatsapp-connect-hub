-- Fix permission denied error by avoiding direct query to auth.users in RLS policies for admin check
-- Previous policies tried to SELECT from auth.users which is restricted for normal users, causing "permission denied for table users"

-- 1. Affiliates
drop policy if exists "Admins can view all affiliates" on public.affiliates;
create policy "Admins can view all affiliates"
  on public.affiliates for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (auth.jwt() ->> 'email') = 'harsh.tank@systrocode.tech'
  );

-- 2. Referrals
drop policy if exists "Admins can view all referrals" on public.referrals;
create policy "Admins can view all referrals"
  on public.referrals for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (auth.jwt() ->> 'email') = 'harsh.tank@systrocode.tech'
  );

-- 3. Payouts
drop policy if exists "Admins can view all payouts" on public.payouts;
create policy "Admins can view all payouts"
  on public.payouts for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (auth.jwt() ->> 'email') = 'harsh.tank@systrocode.tech'
  );
