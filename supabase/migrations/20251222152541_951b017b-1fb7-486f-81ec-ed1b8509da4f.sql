-- Add retention policy for usage_logs table to prevent unbounded growth
-- This function will delete logs older than 90 days
CREATE OR REPLACE FUNCTION public.cleanup_old_usage_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.usage_logs
  WHERE created_at < now() - interval '90 days';
END;
$$;

-- Grant execute to authenticated users (though typically called by cron/admin)
GRANT EXECUTE ON FUNCTION public.cleanup_old_usage_logs() TO authenticated;

-- Create an index on created_at for efficient cleanup queries
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at);

-- Add a comment documenting the retention policy
COMMENT ON FUNCTION public.cleanup_old_usage_logs() IS 'Deletes usage logs older than 90 days. Should be called periodically via cron job or admin action.';