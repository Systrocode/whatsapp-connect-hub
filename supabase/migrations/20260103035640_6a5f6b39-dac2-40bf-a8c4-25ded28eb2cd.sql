-- Create posts table for blog functionality
CREATE TABLE public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Published posts are viewable by everyone" 
ON public.posts 
FOR SELECT 
USING (published = true);

-- Admin full access (users with admin role)
CREATE POLICY "Admins can manage all posts" 
ON public.posts 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_roles.user_id = auth.uid() 
        AND user_roles.role = 'admin'
    )
);

-- Create trigger for updated_at
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();