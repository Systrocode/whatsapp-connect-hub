import { motion } from 'framer-motion';
import { MessageSquare, Users, Clock, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ConversationsList from '@/components/dashboard/ConversationsList';
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Total Conversations',
    value: '1,284',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: MessageSquare,
  },
  {
    title: 'Active Contacts',
    value: '3,721',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Avg. Response Time',
    value: '2.4m',
    change: '-18.3%',
    changeType: 'positive' as const,
    icon: Clock,
  },
  {
    title: 'Resolution Rate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: CheckCircle2,
  },
];

// Define which features require which plan tier
const quickActions = [
  { 
    label: 'Send broadcast message', 
    description: 'Reach all contacts at once', 
    icon: MessageSquare,
    requiredPlan: 'starter', // Free users can't access
    path: '/dashboard/broadcasts',
  },
  { 
    label: 'Create auto-response', 
    description: 'Set up automated replies', 
    icon: Clock,
    requiredPlan: 'starter',
    path: '/dashboard/settings',
  },
  { 
    label: 'Add new template', 
    description: 'Create message templates', 
    icon: CheckCircle2,
    requiredPlan: null, // Available to all
    path: '/dashboard/settings',
  },
  { 
    label: 'Export conversations', 
    description: 'Download chat history', 
    icon: Users,
    requiredPlan: 'starter',
    path: '/dashboard/conversations',
  },
];

const Dashboard = () => {
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  
  // Check if user has access to a feature based on their plan
  const hasAccess = (requiredPlan: string | null): boolean => {
    if (!requiredPlan) return true; // No plan required
    
    const plan = subscription?.plan?.name?.toLowerCase() || '';
    const planHierarchy = ['free', 'starter', 'professional', 'pro', 'enterprise'];
    
    const userPlanIndex = planHierarchy.findIndex(p => plan.includes(p));
    const requiredIndex = planHierarchy.findIndex(p => p === requiredPlan);
    
    // If user has no subscription or free plan, they're at index 0
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
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
                const Icon = action.icon;
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
                      <Icon className="h-4 w-4" />
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
