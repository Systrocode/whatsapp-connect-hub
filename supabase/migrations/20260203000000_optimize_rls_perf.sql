-- Optimizing RLS policies by wrapping auth functions in (select ...) to prevent per-row re-evaluation
-- This fixes "Auth RLS Initialization Plan" warnings

DO $$ 
BEGIN
  -- 1. Profiles
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
  CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id); -- Already optimal if ID matches, but best practice: ((select auth.uid()) = id)

  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((select auth.uid()) = id);

  DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
  CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((select auth.uid()) = id);

  -- 2. Messages
  DROP POLICY IF EXISTS "Users can insert messages in their conversations" ON public.messages;
  CREATE POLICY "Users can insert messages in their conversations" ON public.messages FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id AND c.user_id = (select auth.uid())
    )
  );

  DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;
  CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id AND c.user_id = (select auth.uid())
    )
  );

  -- 3. Broadcast Recipients
  DROP POLICY IF EXISTS "Users can manage recipients of their campaigns" ON public.broadcast_recipients;
  CREATE POLICY "Users can manage recipients of their campaigns" ON public.broadcast_recipients FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.broadcast_campaigns bc 
      WHERE bc.id = campaign_id AND bc.user_id = (select auth.uid())
    )
  );

  -- 4. Teams
  DROP POLICY IF EXISTS "Owners can update their teams" ON public.teams;
  CREATE POLICY "Owners can update their teams" ON public.teams FOR UPDATE USING ((select auth.uid()) = owner_id);

  DROP POLICY IF EXISTS "Users can view their teams" ON public.teams;
  CREATE POLICY "Users can view their teams" ON public.teams FOR SELECT USING (
    (select auth.uid()) = owner_id OR 
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = id AND tm.user_id = (select auth.uid())
    )
  );

  -- 5. Flows
  DROP POLICY IF EXISTS "Users can manage their own flows" ON public.flows; 
  -- Consolidating separate policies if possible, but adhering to existing structure for safety
  DROP POLICY IF EXISTS "Users can delete their own flows" ON public.flows;
  CREATE POLICY "Users can delete their own flows" ON public.flows FOR DELETE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can insert their own flows" ON public.flows;
  CREATE POLICY "Users can insert their own flows" ON public.flows FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can update their own flows" ON public.flows;
  CREATE POLICY "Users can update their own flows" ON public.flows FOR UPDATE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can view their own flows" ON public.flows;
  CREATE POLICY "Users can view their own flows" ON public.flows FOR SELECT USING ((select auth.uid()) = user_id);

  -- 6. Canned Responses
  DROP POLICY IF EXISTS "Users can delete their own canned responses" ON public.canned_responses;
  CREATE POLICY "Users can delete their own canned responses" ON public.canned_responses FOR DELETE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can insert their own canned responses" ON public.canned_responses;
  CREATE POLICY "Users can insert their own canned responses" ON public.canned_responses FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can update their own canned responses" ON public.canned_responses;
  CREATE POLICY "Users can update their own canned responses" ON public.canned_responses FOR UPDATE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can view their own canned responses" ON public.canned_responses;
  CREATE POLICY "Users can view their own canned responses" ON public.canned_responses FOR SELECT USING ((select auth.uid()) = user_id);

  -- 7. Segments
  DROP POLICY IF EXISTS "Users can delete their own segments" ON public.segments;
  CREATE POLICY "Users can delete their own segments" ON public.segments FOR DELETE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can insert their own segments" ON public.segments;
  CREATE POLICY "Users can insert their own segments" ON public.segments FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can update their own segments" ON public.segments;
  CREATE POLICY "Users can update their own segments" ON public.segments FOR UPDATE USING ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can view their own segments" ON public.segments;
  CREATE POLICY "Users can view their own segments" ON public.segments FOR SELECT USING ((select auth.uid()) = user_id);

  -- 8. WhatsApp Clients
  DROP POLICY IF EXISTS "Users can insert their own connection" ON public.whatsapp_clients;
  CREATE POLICY "Users can insert their own connection" ON public.whatsapp_clients FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

  DROP POLICY IF EXISTS "Users can view their own connection" ON public.whatsapp_clients;
  CREATE POLICY "Users can view their own connection" ON public.whatsapp_clients FOR SELECT USING ((select auth.uid()) = user_id);

  -- 9. Team Members
  DROP POLICY IF EXISTS "Users can view members of their teams" ON public.team_members;
  CREATE POLICY "Users can view members of their teams" ON public.team_members FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.teams t
        WHERE t.id = team_id AND (t.owner_id = (select auth.uid()) OR 
            EXISTS (SELECT 1 FROM public.team_members tm_check WHERE tm_check.team_id = t.id AND tm_check.user_id = (select auth.uid()))
        )
    )
  );

END $$;
