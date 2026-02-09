-- Add meta_id and status columns to message_templates
ALTER TABLE public.message_templates 
ADD COLUMN IF NOT EXISTS meta_id TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'PENDING';
