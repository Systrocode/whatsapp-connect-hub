-- Grant admin role to super admin user
insert into public.user_roles (user_id, role)
select id, 'admin'::app_role
from auth.users
where email = 'harsh.tank@systrocode.tech'
on conflict (user_id, role) do nothing;
