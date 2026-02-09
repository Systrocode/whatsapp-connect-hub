-- Enable moddatetime extension
create extension if not exists moddatetime schema extensions;

-- Create flows table for storing chatbot logic
create table public.flows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  description text,
  data jsonb default '{}'::jsonb, -- Stores the ReactFlow nodes/edges
  is_active boolean default false,
  trigger_keywords text[] default null, -- Array of keywords that trigger this flow
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.flows enable row level security;

create policy "Users can view their own flows"
  on public.flows for select
  using (auth.uid() = user_id);

create policy "Users can insert their own flows"
  on public.flows for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flows"
  on public.flows for update
  using (auth.uid() = user_id);

create policy "Users can delete their own flows"
  on public.flows for delete
  using (auth.uid() = user_id);

-- Trigger to update updated_at
create trigger handle_updated_at before update on public.flows
  for each row execute procedure extensions.moddatetime (updated_at);
