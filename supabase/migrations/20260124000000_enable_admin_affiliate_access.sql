-- Enable Admin access to affiliates table
create policy "Admins can view all affiliates"
  on public.affiliates for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (select email from auth.users where id = auth.uid()) = 'harsh.tank@systrocode.tech'
  );

-- Enable Admin access to referrals table
create policy "Admins can view all referrals"
  on public.referrals for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (select email from auth.users where id = auth.uid()) = 'harsh.tank@systrocode.tech'
  );

-- Enable Admin access to payouts table
create policy "Admins can view all payouts"
  on public.payouts for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    ) or (select email from auth.users where id = auth.uid()) = 'harsh.tank@systrocode.tech'
  );
