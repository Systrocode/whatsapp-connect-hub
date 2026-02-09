import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const hasLoggedAttempt = useRef(false);

  const isLoading = authLoading || roleLoading;

  useEffect(() => {
    // Log unauthorized admin access attempts for security monitoring
    const logUnauthorizedAccess = async () => {
      if (!isLoading && user && !isAdmin && !hasLoggedAttempt.current) {
        hasLoggedAttempt.current = true;
        toast.error('Access denied. Admin privileges required.');
        
        // Log the unauthorized access attempt server-side
        try {
          await supabase.from('usage_logs').insert({
            user_id: user.id,
            action_type: 'unauthorized_admin_access',
            metadata: {
              attempted_path: window.location.pathname,
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          // Silently fail - don't expose logging errors to potential attackers
          console.error('Failed to log unauthorized access attempt');
        }
      }
    };

    logUnauthorizedAccess();
  }, [isLoading, user, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
