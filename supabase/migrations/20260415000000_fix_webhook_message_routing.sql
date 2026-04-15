-- Fix: Atomic conversation update to prevent race conditions on rapid incoming messages
-- and add diagnostic helpers for webhook message routing issues.

-- 1. Atomic function to increment unread_count and update last_message_at in one query
CREATE OR REPLACE FUNCTION public.increment_unread_and_update_conversation(
  p_conversation_id UUID,
  p_last_message_at TIMESTAMPTZ
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.conversations
  SET
    unread_count    = unread_count + 1,
    last_message_at = p_last_message_at,
    status          = 'active'
  WHERE id = p_conversation_id;
$$;

-- 2. Ensure the messages SELECT policy is correct and RLS is enabled
--    (guards against the debug migration that disabled RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 3. Re-confirm the messages SELECT policy uses EXISTS (more reliable than IN)
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;
CREATE POLICY "Users can view messages in their conversations" ON public.messages
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
      AND c.user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can insert messages in their conversations" ON public.messages;
CREATE POLICY "Users can insert messages in their conversations" ON public.messages
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
      AND c.user_id = (SELECT auth.uid())
  )
);

-- 4. Unique index on whatsapp_message_id to prevent duplicate messages
--    from Meta retrying webhook delivery
CREATE UNIQUE INDEX IF NOT EXISTS messages_whatsapp_message_id_unique
  ON public.messages (whatsapp_message_id)
  WHERE whatsapp_message_id IS NOT NULL;
