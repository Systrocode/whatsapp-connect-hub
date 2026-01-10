-- Create teams system for multi-user access
-- 1. Create a function to auto-create a team for every new user (everyone gets their own personal team initially)

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create team_members table to link users to teams
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('owner', 'admin', 'member')) default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(team_id, user_id)
);

-- 3. Create invites table for adding new members
create table if not exists public.team_invites (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  email text not null,
  role text check (role in ('admin', 'member')) default 'member',
  token text unique not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id)
);

-- 4. Enable RLS
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.team_invites enable row level security;

-- 5. Policies for Teams
-- Users can view teams they are a member of
create policy "Users can view their teams"
  on public.teams for select
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = teams.id
      and team_members.user_id = auth.uid()
    )
  );

-- Only owners can update team details
create policy "Owners can update their teams"
  on public.teams for update
  using (owner_id = auth.uid());

-- 6. Policies for Team Members
-- Users can view members of their teams
create policy "Users can view members of their teams"
  on public.team_members for select
  using (
    exists (
      select 1 from public.team_members as tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
    )
  );

-- 7. Policies for Invites
-- Only admins/owners can view/create invites
create policy "Admins can manage invites"
  on public.team_invites for all
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = team_invites.team_id
      and team_members.user_id = auth.uid()
      and team_members.role in ('owner', 'admin')
    )
  );
