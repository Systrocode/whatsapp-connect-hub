import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  MessagesSquare,
  Shield,
  UserCog,
  FileText,
  Megaphone,
  CreditCard,
  Target,
  Plug,
  Wrench,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessagesSquare, label: 'Conversations', path: '/dashboard/conversations' },
  { icon: Users, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: Megaphone, label: 'Broadcasts', path: '/dashboard/broadcasts' },
  { icon: Target, label: 'Campaigns', path: '/dashboard/campaigns' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Wrench, label: 'Tools', path: '/dashboard/tools' },
  { icon: Plug, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const adminItems = [
  { icon: Shield, label: 'Admin Dashboard', path: '/dashboard/admin' },
  { icon: UserCog, label: 'User Management', path: '/dashboard/admin/users' },
  { icon: FileText, label: 'Templates', path: '/dashboard/admin/templates' },
  { icon: CreditCard, label: 'Subscriptions', path: '/dashboard/admin/subscriptions' },
  { icon: BookOpen, label: 'Blog Manager', path: '/dashboard/admin/blog' },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isAdmin } = useUserRole();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const renderNavItem = (item: typeof navItems[0], isAdminSection = false) => {
    const isActive = location.pathname === item.path ||
      (item.path !== '/dashboard' && item.path !== '/dashboard/admin' && location.pathname.startsWith(item.path));
    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative group",
          isActive
            ? isAdminSection
              ? "bg-red-500/10 text-red-500"
              : "bg-sidebar-accent text-sidebar-primary"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )}
      >
        {isActive && (
          <motion.div
            layoutId={isAdminSection ? "activeAdminNav" : "activeNav"}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full",
              isAdminSection ? "bg-red-500" : "bg-sidebar-primary"
            )}
          />
        )}
        <item.icon className={cn("w-5 h-5", isActive && (isAdminSection ? "text-red-500" : "text-sidebar-primary"))} />
        {item.label}
      </NavLink>
    );
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">WA Business</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => renderNavItem(item))}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <div className="flex items-center gap-2 px-4 text-xs font-semibold text-red-500 uppercase tracking-wider">
                <Shield className="w-3 h-3" />
                Admin
              </div>
            </div>
            {adminItems.map((item) => renderNavItem(item, true))}
          </>
        )}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 w-full">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
