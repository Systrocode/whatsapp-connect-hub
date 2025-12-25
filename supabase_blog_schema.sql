-- Create the posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text,
  excerpt text,
  image_url text,
  published boolean default false,
  author_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table posts enable row level security;

-- Create Policies
-- Public read access for published posts
create policy "Public posts are viewable by everyone"
  on posts for select
  using ( published = true );

-- Admin read access for all posts
create policy "Admins can view all posts"
  on posts for select
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

-- Admin insert access
create policy "Admins can insert posts"
  on posts for insert
  with check ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

-- Admin update access
create policy "Admins can update posts"
  on posts for update
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

-- Admin delete access
create policy "Admins can delete posts"
  on posts for delete
  using ( auth.uid() in (
    select user_id from user_roles where role = 'admin'
  ));

-- Create function to update updated_at timestamp
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
  before update on posts
  for each row
  execute procedure public.handle_updated_at();

-- IMPORTANT: Run this SQL in your Supabase SQL Editor to enable the blog features.
