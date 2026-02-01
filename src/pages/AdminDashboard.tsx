import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStats } from '@/hooks/useAdminStats';
import { 
  Users, 
  MessageSquare, 
  MessagesSquare, 
  Contact2, 
  UserCheck, 
  FileText,
  TrendingUp,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminStats();

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats?.totalUsers || 0, 
      icon: Users, 
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      label: 'Total Conversations', 
      value: stats?.totalConversations || 0, 
      icon: MessagesSquare, 
      color: 'text-whatsapp',
      bgColor: 'bg-whatsapp/10'
    },
    { 
      label: 'Total Messages', 
      value: stats?.totalMessages || 0, 
      icon: MessageSquare, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    { 
      label: 'Total Contacts', 
      value: stats?.totalContacts || 0, 
      icon: Contact2, 
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    { 
      label: 'Active Today', 
      value: stats?.activeUsersToday || 0, 
      icon: UserCheck, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    { 
      label: 'Pending Templates', 
      value: stats?.pendingTemplates || 0, 
      icon: FileText, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
  ];

  const quickActions = [
    { label: 'Manage Users', path: '/dashboard/admin/users', icon: Users },
    { label: 'Review Templates', path: '/dashboard/admin/templates', icon: FileText },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 hover:border-border transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-1">
                          {isLoading ? '...' : stat.value.toLocaleString()}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.path}
                    to={action.path}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
