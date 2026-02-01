-- Optimizing RLS policies to use (select auth.uid()) instead of auth.uid()
-- This drastically improves performance by avoiding function re-evaluation for every row

-- 1. Profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- 2. User Roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((select auth.uid()) = user_id);

-- 3. Contacts
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
CREATE POLICY "Users can view their own contacts" ON public.contacts FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own contacts" ON public.contacts;
CREATE POLICY "Users can insert their own contacts" ON public.contacts FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
CREATE POLICY "Users can update their own contacts" ON public.contacts FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;
CREATE POLICY "Users can delete their own contacts" ON public.contacts FOR DELETE USING ((select auth.uid()) = user_id);

-- 4. Conversations
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
CREATE POLICY "Users can view their own conversations" ON public.conversations FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own conversations" ON public.conversations;
CREATE POLICY "Users can insert their own conversations" ON public.conversations FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;
CREATE POLICY "Users can update their own conversations" ON public.conversations FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.conversations;
CREATE POLICY "Users can delete their own conversations" ON public.conversations FOR DELETE USING ((select auth.uid()) = user_id);

-- 5. Message Templates
DROP POLICY IF EXISTS "Users can view their own templates" ON public.message_templates;
CREATE POLICY "Users can view their own templates" ON public.message_templates FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own templates" ON public.message_templates;
CREATE POLICY "Users can insert their own templates" ON public.message_templates FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own templates" ON public.message_templates;
CREATE POLICY "Users can update their own templates" ON public.message_templates FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own templates" ON public.message_templates;
CREATE POLICY "Users can delete their own templates" ON public.message_templates FOR DELETE USING ((select auth.uid()) = user_id);

-- 6. WhatsApp Settings
DROP POLICY IF EXISTS "Users can view their own whatsapp settings" ON public.whatsapp_settings;
CREATE POLICY "Users can view their own whatsapp settings" ON public.whatsapp_settings FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own whatsapp settings" ON public.whatsapp_settings;
CREATE POLICY "Users can insert their own whatsapp settings" ON public.whatsapp_settings FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own whatsapp settings" ON public.whatsapp_settings;
CREATE POLICY "Users can update their own whatsapp settings" ON public.whatsapp_settings FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own whatsapp settings" ON public.whatsapp_settings;
CREATE POLICY "Users can delete their own whatsapp settings" ON public.whatsapp_settings FOR DELETE USING ((select auth.uid()) = user_id);

-- 7. Messages
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversations c 
    WHERE c.id = conversation_id 
    AND c.user_id = (select auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can insert messages in their conversations" ON public.messages;
CREATE POLICY "Users can insert messages in their conversations" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations c 
    WHERE c.id = conversation_id 
    AND c.user_id = (select auth.uid())
  )
);

-- 8. Campaigns
DROP POLICY IF EXISTS "Users can view their own campaigns" ON public.campaigns;
CREATE POLICY "Users can view their own campaigns" ON public.campaigns FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create their own campaigns" ON public.campaigns;
CREATE POLICY "Users can create their own campaigns" ON public.campaigns FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own campaigns" ON public.campaigns;
CREATE POLICY "Users can update their own campaigns" ON public.campaigns FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaigns" ON public.campaigns;
CREATE POLICY "Users can delete their own campaigns" ON public.campaigns FOR DELETE USING ((select auth.uid()) = user_id);

-- 9. User Subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can view their own subscription" ON public.user_subscriptions FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can update their own subscription" ON public.user_subscriptions FOR UPDATE USING ((select auth.uid()) = user_id);

-- 10. Usage Logs
DROP POLICY IF EXISTS "Users can view their own usage" ON public.usage_logs;
CREATE POLICY "Users can view their own usage" ON public.usage_logs FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own usage" ON public.usage_logs;
CREATE POLICY "Users can insert their own usage" ON public.usage_logs FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
