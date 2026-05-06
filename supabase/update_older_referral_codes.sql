-- This script updates all existing affiliate referral codes to use 
-- the user's business name (or email prefix) instead of "harsh.tank".

UPDATE public.affiliates a
SET referral_code = 
  LOWER(
    COALESCE(
      NULLIF(REGEXP_REPLACE(p.business_name, '[^a-zA-Z0-9]', '', 'g'), ''),
      NULLIF(REGEXP_REPLACE(SPLIT_PART(u.email, '@', 1), '[^a-zA-Z0-9]', '', 'g'), ''),
      'user'
    )
  ) || '-' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 4)
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE a.user_id = p.id;
