
-- Update chat-media bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'chat-media';

-- Ensure it exists if not
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-media', 'chat-media', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Drop existing policies if they conflict (safer to recreate)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;

-- Create minimal public read policy
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'chat-media' );

-- Allow authenticated users to upload
CREATE POLICY "Auth Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'chat-media' );
