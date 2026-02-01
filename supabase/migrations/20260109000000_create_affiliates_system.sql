-- Create affiliates table
create table public.affiliates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  referral_code text unique not null,
  commission_rate numeric default 0.20,
  total_earnings numeric default 0.00,
  status text default 'active' check (status in ('active', 'inactive', 'suspended')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.affiliates enable row level security;

-- Policies for affiliates
create policy "Users can view their own affiliate profile"
  on public.affiliates for select
  using (auth.uid() = user_id);

create policy "Users can create their own affiliate profile"
  on public.affiliates for insert
  with check (auth.uid() = user_id);

-- Create referrals table
create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete cascade not null,
  referred_user_id uuid references auth.users(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'converted', 'paid', 'cancelled')),
  commission_amount numeric default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.referrals enable row level security;

-- Policies for referrals
create policy "Affiliates can view their own referrals"
  on public.referrals for select
  using (
    exists (
      select 1 from public.affiliates
      where id = referrals.affiliate_id
      and user_id = auth.uid()
    )
  );

-- Create payouts table
create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete cascade not null,
  amount numeric not null,
  status text default 'pending' check (status in ('pending', 'processing', 'paid', 'failed')),
  payout_method text,
  transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.payouts enable row level security;

-- Policies for payouts
create policy "Affiliates can view their own payouts"
  on public.payouts for select
  using (
    exists (
      select 1 from public.affiliates
      where id = payouts.affiliate_id
      and user_id = auth.uid()
    )
  );

create policy "Affiliates can request payouts"
  on public.payouts for insert
  with check (
    exists (
      select 1 from public.affiliates
      where id = payouts.affiliate_id
      and user_id = auth.uid()
    )
  );
