import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import FeatureCard from '@/components/dashboard/FeatureCard';
import ConversationsList from '@/components/dashboard/ConversationsList';
import { useSubscription } from '@/hooks/useSubscription';
import { useUserRole } from '@/hooks/useUserRole';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { StatusWidget } from '@/components/dashboard/StatusWidget';

const icons = {
  chat: 'https://img.icons8.com/fluency/48/chat.png',
  group: 'https://img.icons8.com/fluency/48/group.png',
  bell: 'https://img.icons8.com/fluency/48/appointment-reminders.png', // bell is often named appointment-reminders or bell
  comments: 'https://img.icons8.com/fluency/48/comments.png',
  megaphone: 'https://img.icons8.com/fluency/48/megaphone.png',
  clock: 'https://img.icons8.com/fluency/48/clock.png',
  template: 'https://img.icons8.com/fluency/48/template.png',
  export: 'https://img.icons8.com/fluency/48/export.png',
  link: 'https://img.icons8.com/fluency/48/link.png',
  whatsapp: 'https://img.icons8.com/fluency/48/whatsapp.png',
};

const quickActions = [
  {
    label: 'Send broadcast message',
    description: 'Reach all contacts at once',
    icon: icons.megaphone,
    requiredPlan: 'starter',
    path: '/dashboard/broadcasts',
  },
  {
    label: 'Create auto-response',
    description: 'Set up automated replies',
    icon: icons.clock,
    requiredPlan: 'starter',
    path: '/dashboard/settings',
  },
  {
    label: 'Add new template',
    description: 'Create message templates',
    icon: icons.template,
    requiredPlan: null,
    path: '/dashboard/settings',
  },
  {
    label: 'Export conversations',
    description: 'Download chat history',
    icon: icons.export,
    requiredPlan: 'starter',
    path: '/dashboard/conversations',
  },
];

const Dashboard = () => {
  const { subscription } = useSubscription();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();

  const stats = [
    {
      title: 'Total Conversations',
      value: statsLoading ? '...' : statsData?.totalConversations.toLocaleString() || '0',
      change: 'Active',
      changeType: 'neutral' as const,
      icon: icons.chat,
    },
    {
      title: 'Active Contacts',
      value: statsLoading ? '...' : statsData?.totalContacts.toLocaleString() || '0',
      change: 'Saved',
      changeType: 'neutral' as const,
      icon: icons.group,
    },
    {
      title: 'Unread Messages',
      value: statsLoading ? '...' : statsData?.unreadMessages.toLocaleString() || '0',
      change: 'Needs attention',
      changeType: 'negative' as const,
      icon: icons.bell,
    },
    {
      title: 'Total Messages',
      value: statsLoading ? '...' : statsData?.totalMessages.toLocaleString() || '0',
      change: 'Lifetime',
      changeType: 'neutral' as const,
      icon: icons.comments,
    },
  ];

  const hasAccess = (requiredPlan: string | null): boolean => {
    if (isAdmin) return true;
    if (!requiredPlan) return true;

    const plan = subscription?.plan?.name?.toLowerCase() || '';
    const planHierarchy = ['free', 'starter', 'professional', 'pro', 'enterprise'];

    const userPlanIndex = planHierarchy.findIndex(p => plan.includes(p));
    const requiredIndex = planHierarchy.findIndex(p => p === requiredPlan);

    if (userPlanIndex === -1) return requiredIndex === -1 || requiredPlan === null;

    return userPlanIndex >= requiredIndex;
  };

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (hasAccess(action.requiredPlan)) {
      navigate(action.path);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </motion.div>

        <StatusWidget />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Growth Tools */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Growth Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard
              title="Customize WhatsApp Link"
              description="Create shareable links & QR for your WA business number"
              icon={icons.link}
              path="/dashboard/tools"
              delay={0.2}
            />
            <FeatureCard
              title="WhatsApp Website Button"
              description="Drive WhatsApp sales with personalised CTAs"
              icon={icons.whatsapp}
              path="/dashboard/website-widget"
              delay={0.3}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ConversationsList />
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const isLocked = !hasAccess(action.requiredPlan);

                return (
                  <button
                    key={action.label}
                    onClick={() => handleActionClick(action)}
                    className={`
                      w-full p-4 rounded-lg border transition-all text-left group flex items-start gap-3 relative
                      ${isLocked
                        ? 'bg-muted/50 border-border cursor-not-allowed opacity-75'
                        : 'bg-background hover:bg-primary/10 border-border hover:border-primary/30'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg transition-all
                      ${isLocked
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                      }
                    `}>
                      <img src={action.icon} alt={action.label} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium transition-colors ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {action.label}
                        </p>
                        {isLocked && (
                          <Badge variant="secondary" className="text-xs py-0 px-1.5 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Pro
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/80 rounded-lg">
                        <span className="text-sm font-medium text-primary flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Upgrade to unlock
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
