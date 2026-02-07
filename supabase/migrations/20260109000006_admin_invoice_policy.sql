-- Allow admins to view all invoices
create policy "Admins can view all invoices"
  on public.invoices for select
  using (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );