-- Fix "permission denied for table users" error
-- Create a SECURITY DEFINER function to check for super admin email securely

-- 1. Create secure function
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'harsh.tank@systrocode.tech'
  );
$$;

-- 2. Update Policies to use the secure function instead of direct table access

-- Affiliates
DROP POLICY IF EXISTS "Affiliates and admins can view profiles" ON public.affiliates;
CREATE POLICY "Affiliates and admins can view profiles" ON public.affiliates FOR SELECT TO authenticated USING (
  (select auth.uid()) = user_id 
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Referrals
DROP POLICY IF EXISTS "Affiliates and admins can view referrals" ON public.referrals;
CREATE POLICY "Affiliates and admins can view referrals" ON public.referrals FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = referrals.affiliate_id AND user_id = (select auth.uid()))
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Invoices
DROP POLICY IF EXISTS "Users and admins can view invoices" ON public.invoices;
CREATE POLICY "Users and admins can view invoices" ON public.invoices FOR SELECT TO authenticated USING (
  (select auth.uid()) = user_id
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Payouts
DROP POLICY IF EXISTS "Affiliates and admins can view payouts" ON public.payouts;
CREATE POLICY "Affiliates and admins can view payouts" ON public.payouts FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = payouts.affiliate_id AND user_id = (select auth.uid()))
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Posts
DROP POLICY IF EXISTS "Everyone can view published or admin posts" ON public.posts;
CREATE POLICY "Everyone can view published or admin posts" ON public.posts FOR SELECT USING (
  published = true 
  OR (
    (select auth.role()) = 'authenticated' 
    AND (
      public.has_role((select auth.uid()), 'admin')
      OR public.is_super_admin()
    )
  )
);

-- Profiles
DROP POLICY IF EXISTS "Users can view own or admin profiles" ON public.profiles;
CREATE POLICY "Users can view own or admin profiles" ON public.profiles FOR SELECT TO authenticated USING (
  (select auth.uid()) = id 
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Broadcast Campaigns
DROP POLICY IF EXISTS "Broadcasts viewable by owner and admin" ON public.broadcast_campaigns;
CREATE POLICY "Broadcasts viewable by owner and admin" ON public.broadcast_campaigns FOR SELECT TO authenticated USING (
  user_id = (select auth.uid()) 
  OR public.has_role((select auth.uid()), 'admin')
  OR public.is_super_admin()
);

-- Ad Performance (Updates existing policy)
DROP POLICY IF EXISTS "Users and admins can view performance" ON public.ad_performance;
CREATE POLICY "Users and admins can view performance" ON public.ad_performance FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND (
      user_id = (select auth.uid())
      OR public.has_role((select auth.uid()), 'admin')
      OR public.is_super_admin()
    )
  )
);
