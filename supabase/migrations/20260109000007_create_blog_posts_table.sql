-- Create posts table if it doesn't exist
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  excerpt text,
  image_url text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.posts enable row level security;

-- Drop existing policies to avoid conflicts during re-runs
drop policy if exists "Public can view published posts" on public.posts;
drop policy if exists "Admins can view all posts" on public.posts;
drop policy if exists "Admins can insert posts" on public.posts;
drop policy if exists "Admins can update posts" on public.posts;
drop policy if exists "Admins can delete posts" on public.posts;

-- Policy 1: Public can view published posts
create policy "Public can view published posts"
  on public.posts for select
  using (published = true);

-- Policy 2: Admins can view all posts
create policy "Admins can view all posts"
  on public.posts for select
  using (public.has_role(auth.uid(), 'admin'));

-- Policy 3: Admins can insert posts
create policy "Admins can insert posts"
  on public.posts for insert
  with check (public.has_role(auth.uid(), 'admin'));

-- Policy 4: Admins can update posts
create policy "Admins can update posts"
  on public.posts for update
  using (public.has_role(auth.uid(), 'admin'));

-- Policy 5: Admins can delete posts
create policy "Admins can delete posts"
  on public.posts for delete
  using (public.has_role(auth.uid(), 'admin'));
