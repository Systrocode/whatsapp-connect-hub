-- Create a new storage bucket for chat media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-media', 'chat-media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'chat-media' );

CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK ( bucket_id = 'chat-media' );

CREATE POLICY "Users can update their own media"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'chat-media' AND owner = auth.uid() );

CREATE POLICY "Users can delete their own media"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'chat-media' AND owner = auth.uid() );
