-- Fix Final "Multiple Permissive Policies" Warnings
-- Consolidate overlapping policies for Affiliates, Referrals, Payouts, Invoices, and Posts

-- 1. Affiliates
DROP POLICY IF EXISTS "Admins can view all affiliates" ON public.affiliates;
DROP POLICY IF EXISTS "Users can view their own affiliate profile" ON public.affiliates;

CREATE POLICY "Affiliates and admins can view profiles" ON public.affiliates FOR SELECT TO authenticated USING (
  (select auth.uid()) = user_id 
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 2. Referrals
DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Affiliates can view their own referrals" ON public.referrals;

CREATE POLICY "Affiliates and admins can view referrals" ON public.referrals FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = referrals.affiliate_id AND user_id = (select auth.uid()))
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 3. Invoices
DROP POLICY IF EXISTS "Admins can view all invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;

CREATE POLICY "Users and admins can view invoices" ON public.invoices FOR SELECT TO authenticated USING (
  (select auth.uid()) = user_id
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 4. Payouts
DROP POLICY IF EXISTS "Admins can view all payouts" ON public.payouts;
DROP POLICY IF EXISTS "Affiliates can view their own payouts" ON public.payouts;

CREATE POLICY "Affiliates and admins can view payouts" ON public.payouts FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = payouts.affiliate_id AND user_id = (select auth.uid()))
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 5. Posts
-- Split Admin "ALL" policy into specific actions to avoid overlapping with Public SELECT
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.posts;
DROP POLICY IF EXISTS "Public get view published posts" ON public.posts;

-- Consolidated View Policy (Public + Admin)
CREATE POLICY "Everyone can view published or admin posts" ON public.posts FOR SELECT USING (
  published = true 
  OR (auth.role() = 'authenticated' AND public.has_role((select auth.uid()), 'admin'))
);

-- Admin Modify Policies
CREATE POLICY "Admins can insert posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (
  public.has_role((select auth.uid()), 'admin')
);

CREATE POLICY "Admins can update posts" ON public.posts FOR UPDATE TO authenticated USING (
  public.has_role((select auth.uid()), 'admin')
);

CREATE POLICY "Admins can delete posts" ON public.posts FOR DELETE TO authenticated USING (
  public.has_role((select auth.uid()), 'admin')
);
