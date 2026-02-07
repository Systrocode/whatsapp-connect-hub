import { motion } from 'framer-motion';
import { BarChart3, MessageSquare, Users, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStats } from '@/hooks/useStats';
import { useConversations } from '@/hooks/useConversations';
import { useContacts } from '@/hooks/useContacts';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts - in production, this would come from the database
const messageData = [
  { name: 'Mon', inbound: 24, outbound: 32 },
  { name: 'Tue', inbound: 18, outbound: 28 },
  { name: 'Wed', inbound: 42, outbound: 45 },
  { name: 'Thu', inbound: 35, outbound: 38 },
  { name: 'Fri', inbound: 28, outbound: 30 },
  { name: 'Sat', inbound: 15, outbound: 18 },
  { name: 'Sun', inbound: 12, outbound: 14 },
];

const responseTimeData = [
  { name: '00:00', time: 2.5 },
  { name: '04:00', time: 3.2 },
  { name: '08:00', time: 1.8 },
  { name: '12:00', time: 2.1 },
  { name: '16:00', time: 1.5 },
  { name: '20:00', time: 2.8 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))', 'hsl(var(--accent))'];

const Analytics = () => {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { conversations } = useConversations();
  const { contacts } = useContacts();

  // Calculate status distribution
  const statusDistribution = [
    { name: 'Active', value: conversations.filter((c) => c.status === 'active').length },
    { name: 'Waiting', value: conversations.filter((c) => c.status === 'waiting').length },
    { name: 'Resolved', value: conversations.filter((c) => c.status === 'resolved').length },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Analytics</h1>
          <p className="text-muted-foreground">Track your WhatsApp Business performance</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Total Conversations',
              value: stats?.totalConversations || 0,
              change: stats?.conversationChange || 0,
              icon: MessageSquare,
            },
            {
              title: 'Active Contacts',
              value: stats?.activeContacts || contacts.length,
              change: stats?.contactChange || 0,
              icon: Users,
            },
            {
              title: 'Avg. Response Time',
              value: stats?.avgResponseTime || '0m',
              change: -18.3,
              icon: Clock,
            },
            {
              title: 'Resolution Rate',
              value: `${stats?.resolutionRate || 0}%`,
              change: 2.1,
              icon: TrendingUp,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  {statsLoading ? (
                    <Skeleton className="h-16 w-full" />
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm ${
                              stat.change > 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {stat.change > 0 ? '+' : ''}
                            {stat.change}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Volume Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Message Volume</CardTitle>
                <CardDescription>Inbound vs outbound messages this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={messageData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
                      <YAxis className="text-muted-foreground" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="inbound" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="outbound" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Time Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trend</CardTitle>
                <CardDescription>Average response time throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
                      <YAxis className="text-muted-foreground" fontSize={12} unit="m" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => [`${value} min`, 'Response Time']}
                      />
                      <Line
                        type="monotone"
                        dataKey="time"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Conversation Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Conversation Status</CardTitle>
                <CardDescription>Distribution of conversation statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {statusDistribution.every((d) => d.value === 0) ? (
                    <p className="text-muted-foreground">No conversations yet</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Total Contacts</span>
                  <span className="font-semibold text-foreground">{contacts.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Active Conversations</span>
                  <span className="font-semibold text-foreground">
                    {conversations.filter((c) => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Waiting for Response</span>
                  <span className="font-semibold text-foreground">
                    {conversations.filter((c) => c.status === 'waiting').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Resolved Today</span>
                  <span className="font-semibold text-foreground">
                    {conversations.filter((c) => c.status === 'resolved').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;