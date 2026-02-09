-- Fix messages RLS policy to ensure visibility
-- Reverting optimization for this specific table to ensure reliability
-- Using auth.uid() standard function and IN clause for clarity

DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;

CREATE POLICY "Users can view messages in their conversations" ON public.messages
FOR SELECT
USING (
  conversation_id IN (
    SELECT id FROM public.conversations 
    WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert messages in their conversations" ON public.messages;

CREATE POLICY "Users can insert messages in their conversations" ON public.messages
FOR INSERT
WITH CHECK (
  conversation_id IN (
    SELECT id FROM public.conversations 
    WHERE user_id = auth.uid()
  )
);
