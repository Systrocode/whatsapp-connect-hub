-- Add metadata column to messages table
ALTER TABLE public.messages ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
