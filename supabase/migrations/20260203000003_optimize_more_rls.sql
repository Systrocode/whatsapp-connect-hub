-- Optimizing RLS Policies Phase 2
-- Fixes "Auth RLS Initialization Plan" and "Multiple Permissive Policies" warnings

-- 1. Affiliates
DROP POLICY IF EXISTS "Users can view their own affiliate profile" ON public.affiliates;
CREATE POLICY "Users can view their own affiliate profile" ON public.affiliates FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create their own affiliate profile" ON public.affiliates;
CREATE POLICY "Users can create their own affiliate profile" ON public.affiliates FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Admins can view all affiliates" ON public.affiliates;
CREATE POLICY "Admins can view all affiliates" ON public.affiliates FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin') 
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 2. Referrals
DROP POLICY IF EXISTS "Affiliates can view their own referrals" ON public.referrals;
CREATE POLICY "Affiliates can view their own referrals" ON public.referrals FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = referrals.affiliate_id AND user_id = (select auth.uid()))
);

DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referrals;
CREATE POLICY "Admins can view all referrals" ON public.referrals FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 3. Payouts
DROP POLICY IF EXISTS "Affiliates can view their own payouts" ON public.payouts;
CREATE POLICY "Affiliates can view their own payouts" ON public.payouts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = payouts.affiliate_id AND user_id = (select auth.uid()))
);

DROP POLICY IF EXISTS "Affiliates can request payouts" ON public.payouts;
CREATE POLICY "Affiliates can request payouts" ON public.payouts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.affiliates WHERE id = payouts.affiliate_id AND user_id = (select auth.uid()))
);

DROP POLICY IF EXISTS "Admins can view all payouts" ON public.payouts;
CREATE POLICY "Admins can view all payouts" ON public.payouts FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 4. Invoices
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
CREATE POLICY "Users can view their own invoices" ON public.invoices FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Admins can view all invoices" ON public.invoices;
CREATE POLICY "Admins can view all invoices" ON public.invoices FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 5. Team Invites
DROP POLICY IF EXISTS "Admins can manage invites" ON public.team_invites;
CREATE POLICY "Admins can manage invites" ON public.team_invites FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.team_members
    WHERE team_members.team_id = team_invites.team_id
    AND team_members.user_id = (select auth.uid())
    AND team_members.role IN ('owner', 'admin')
  )
);

-- 6. Posts (Consolidating duplicates and optimizing)
-- Drop all variants found in logs/files
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;

-- Create consolidated optimal policies
CREATE POLICY "Public get view published posts" ON public.posts FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all posts" ON public.posts FOR ALL TO authenticated USING (
  public.has_role((select auth.uid()), 'admin')
);

-- 7. Campaign Leads
-- "Users can insert leads for their campaigns"
DROP POLICY IF EXISTS "Users can insert leads for their campaigns" ON public.campaign_leads;
CREATE POLICY "Users can insert leads for their campaigns" ON public.campaign_leads FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can delete leads for their campaigns" ON public.campaign_leads;
CREATE POLICY "Users can delete leads for their campaigns" ON public.campaign_leads FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);

-- 8. Ad Performance
DROP POLICY IF EXISTS "Users can view performance for their campaigns" ON public.ad_performance;
CREATE POLICY "Users can view performance for their campaigns" ON public.ad_performance FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can manage performance for their campaigns" ON public.ad_performance;
CREATE POLICY "Users can manage performance for their campaigns" ON public.ad_performance FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);
