
-- Drop the existing check constraint
ALTER TABLE public.messages DROP CONSTRAINT messages_status_check;

-- Add the new check constraint including 'received'
ALTER TABLE public.messages ADD CONSTRAINT messages_status_check 
  CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed', 'received'));
