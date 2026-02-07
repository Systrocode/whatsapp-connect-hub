-- Fix Remaining RLS Performance Warnings
-- Address "Auth RLS Initialization Plan" and "Multiple Permissive Policies"

-- 1. Profiles
-- Fix "Auth RLS Initialization Plan" for INSERT
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Fix "Multiple Permissive Policies" for SELECT
-- Consolidate "Profiles are viewable by users and admins" and "Users can view their own profile"
DROP POLICY IF EXISTS "Profiles are viewable by users and admins" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view own or admin profiles" ON public.profiles FOR SELECT TO authenticated USING (
  (select auth.uid()) = id 
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

-- 2. Broadcast Campaigns
-- Fix "Multiple Permissive Policies" for SELECT
DROP POLICY IF EXISTS "Broadcasts modifiable by owner" ON public.broadcast_campaigns;
DROP POLICY IF EXISTS "Broadcasts viewable by owner and admin" ON public.broadcast_campaigns;
DROP POLICY IF EXISTS "Users can manage their campaigns" ON public.broadcast_campaigns; -- Potential other name

-- Re-create stricter, non-overlapping policies
CREATE POLICY "Broadcasts viewable by owner and admin" ON public.broadcast_campaigns FOR SELECT TO authenticated USING (
  user_id = (select auth.uid()) 
  OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
  OR (select email from auth.users where id = (select auth.uid())) = 'harsh.tank@systrocode.tech'
);

CREATE POLICY "Broadcasts modifiable by owner" ON public.broadcast_campaigns FOR UPDATE TO authenticated USING (
  user_id = (select auth.uid())
);

CREATE POLICY "Broadcasts deletable by owner" ON public.broadcast_campaigns FOR DELETE TO authenticated USING (
  user_id = (select auth.uid())
);

CREATE POLICY "Broadcasts insertable by owner" ON public.broadcast_campaigns FOR INSERT TO authenticated WITH CHECK (
  user_id = (select auth.uid())
);

-- 3. Ad Performance
-- Fix "Multiple Permissive Policies" for SELECT
DROP POLICY IF EXISTS "Users can manage performance for their campaigns" ON public.ad_performance;
DROP POLICY IF EXISTS "Users can view performance for their campaigns" ON public.ad_performance;

-- Consolidated policies
CREATE POLICY "Users and admins can view performance" ON public.ad_performance FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND (
      user_id = (select auth.uid())
      OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = (select auth.uid()) AND role = 'admin')
    )
  )
);

CREATE POLICY "Users can manage performance" ON public.ad_performance FOR INSERT TO authenticated WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);

CREATE POLICY "Users can update performance" ON public.ad_performance FOR UPDATE TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);

CREATE POLICY "Users can delete performance" ON public.ad_performance FOR DELETE TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.broadcast_campaigns 
    WHERE id = campaign_id AND user_id = (select auth.uid())
  )
);
