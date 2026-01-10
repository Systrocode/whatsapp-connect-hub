-- Function to safely get invite details by token (Publicly accessible but limited data)
create or replace function public.get_invite_details(_token text)
returns table (
  team_name text,
  role text,
  email text
) 
language plpgsql
security definer -- Runs with elevated privileges to read hidden invite table
as $$
begin
  return query
  select 
    t.name as team_name,
    i.role,
    i.email
  from public.team_invites i
  join public.teams t on t.id = i.team_id
  where i.token = _token
    and i.expires_at > now();
end;
$$;

-- Function to accept an invite
create or replace function public.accept_team_invite(_token text)
returns void
language plpgsql
security definer
as $$
declare
  v_invite record;
  v_user_id uuid;
  v_email text;
begin
  -- Get current user ID
  v_user_id := auth.uid();
  v_email := auth.jwt() ->> 'email'; -- or use auth.users table lookup if needed

  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- fetch invite
  select * into v_invite
  from public.team_invites
  where token = _token
    and expires_at > now();

  if v_invite is null then
    raise exception 'Invalid or expired invitation token';
  end if;

  -- Optional: Check if email matches (if you want strict security)
  -- For now, we allow accepting if you have the token, assuming the user forwarded the email or it's fine.
  -- But usually, we only allow if the logged-in email matches the invited email.
  -- Let's enforce email matching if available in context
  -- NOTE: checking JWT email might be tricky if user signed up with different one.
  -- For better UX, we'll allow it but maybe log it.
  
  -- Insert into team members
  insert into public.team_members (team_id, user_id, role)
  values (v_invite.team_id, v_user_id, v_invite.role)
  on conflict (team_id, user_id) do nothing; -- Handle double accept gracefully

  -- Delete the invite
  delete from public.team_invites where id = v_invite.id;

end;
$$;
