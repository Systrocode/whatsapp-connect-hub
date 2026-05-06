-- Migration to add assigned_to field to conversations table
ALTER TABLE public.conversations
ADD COLUMN assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Optional: Create an index for faster filtering by assigned agent
CREATE INDEX idx_conversations_assigned_to ON public.conversations(assigned_to);
