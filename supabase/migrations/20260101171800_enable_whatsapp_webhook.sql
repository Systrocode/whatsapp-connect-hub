-- Fix messages table to support incoming WhatsApp webhooks

-- 1. Make conversation_id optional (so we can save messages before linking them)
ALTER TABLE public.messages ALTER COLUMN conversation_id DROP NOT NULL;

-- 2. Add sender_phone column to store the sender's number
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS sender_phone TEXT;

-- 3. Update status check to allow 'received' and 'deleted'
-- Safely drop existing check constraints on 'status' column
DO $$ 
DECLARE r record; 
BEGIN 
  FOR r IN (
     SELECT cc.constraint_name 
     FROM information_schema.constraint_column_usage cc
     JOIN information_schema.table_constraints tc ON cc.constraint_name = tc.constraint_name
     WHERE cc.table_schema = 'public' AND cc.table_name = 'messages' AND cc.column_name = 'status' AND tc.constraint_type = 'CHECK'
  ) LOOP 
    EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS ' || quote_ident(r.constraint_name); 
  END LOOP; 
END $$;

-- Add the new constraint with 'received' and 'deleted' status
ALTER TABLE public.messages ADD CONSTRAINT messages_status_check 
  CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed', 'received', 'deleted'));
