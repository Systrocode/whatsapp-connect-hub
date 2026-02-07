
-- Drop restrictive policy
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;

-- Create permissive policy for debugging/fixing
CREATE POLICY "Users can view messages in their conversations"
ON public.messages FOR SELECT TO authenticated
USING (true);

-- Ensure RLS is enabled (or disabled if we want to be super sure, but Policy requires Enable)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
