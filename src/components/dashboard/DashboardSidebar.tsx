import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

// Icons8 URLs
const icons = {
  dashboard: 'https://img.icons8.com/fluency/48/dashboard.png',
  conversations: 'https://img.icons8.com/fluency/48/chat.png',
  contacts: 'https://img.icons8.com/fluency/48/group.png',
  broadcasts: 'https://img.icons8.com/fluency/48/megaphone.png',
  campaigns: 'https://img.icons8.com/fluency/48/target.png',
  analytics: 'https://img.icons8.com/fluency/48/analytics.png',
  tools: 'https://img.icons8.com/fluency/48/wrench.png',
  integrations: 'https://img.icons8.com/fluency/48/plug.png',
  settings: 'https://img.icons8.com/fluency/48/settings.png',
  admin: 'https://img.icons8.com/fluency/48/shield.png',
  users: 'https://img.icons8.com/fluency/48/conference-call.png',
  templates: 'https://img.icons8.com/fluency/48/template.png',
  subscriptions: 'https://img.icons8.com/fluency/48/credit-card-front.png',
  blog: 'https://img.icons8.com/fluency/48/book.png',
  help: 'https://img.icons8.com/fluency/48/help.png',
  logout: 'https://img.icons8.com/fluency/48/exit.png',
  whatsapp: 'https://img.icons8.com/fluency/48/whatsapp.png',
};

const navItems = [
  { icon: icons.dashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: icons.conversations, label: 'Conversations', path: '/dashboard/conversations' },
  { icon: icons.contacts, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: icons.broadcasts, label: 'Broadcasts', path: '/dashboard/broadcasts' },
  { icon: icons.campaigns, label: 'Campaigns', path: '/dashboard/campaigns' },
  { icon: icons.analytics, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: icons.tools, label: 'Tools', path: '/dashboard/tools' },
  { icon: icons.integrations, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: icons.settings, label: 'Settings', path: '/dashboard/settings' },
];

const adminItems = [
  { icon: icons.admin, label: 'Admin Dashboard', path: '/dashboard/admin' },
  { icon: icons.users, label: 'User Management', path: '/dashboard/admin/users' },
  { icon: icons.templates, label: 'Templates', path: '/dashboard/admin/templates' },
  { icon: icons.subscriptions, label: 'Subscriptions', path: '/dashboard/admin/subscriptions' },
  { icon: icons.blog, label: 'Blog Manager', path: '/dashboard/admin/blog' },
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
        <img src={item.icon} alt={item.label} className="w-5 h-5 object-contain" />
        {item.label}
      </NavLink>
    );
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={icons.whatsapp} alt="Logo" className="w-8 h-8" />
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
                <img src={icons.admin} alt="Admin" className="w-4 h-4" />
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
          <img src={icons.help} alt="Help" className="w-5 h-5 object-contain opacity-70" />
          Help & Support
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 w-full"
        >
          <img src={icons.logout} alt="Logout" className="w-5 h-5 object-contain opacity-70" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
