-- Create invoices table
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  invoice_number text unique,
  amount numeric not null,
  currency text default 'USD',
  status text default 'paid' check (status in ('paid', 'pending', 'void', 'draft')),
  invoice_date timestamp with time zone default timezone('utc'::text, now()) not null,
  period_start timestamp with time zone,
  period_end timestamp with time zone,
  pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.invoices enable row level security;

-- Policies for invoices
create policy "Users can view their own invoices"
  on public.invoices for select
  using (auth.uid() = user_id);

-- Check for existing function before creating
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_proc 
        WHERE proname = 'generate_invoice_number'
    ) THEN
        CREATE FUNCTION public.generate_invoice_number()
        RETURNS TRIGGER AS $func$
        BEGIN
          NEW.invoice_number := 'INV-' || to_char(now(), 'YYYYMMDD') || '-' || substring(md5(random()::text) from 1 for 6);
          RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql;
    END IF;
END $$;

-- Check for existing trigger before creating
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'set_invoice_number'
    ) THEN
        CREATE TRIGGER set_invoice_number
        BEFORE INSERT ON public.invoices
        FOR EACH ROW
        EXECUTE FUNCTION public.generate_invoice_number();
    END IF;
END $$;
