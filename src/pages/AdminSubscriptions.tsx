import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminSubscriptions, SubscriptionWithUser } from '@/hooks/useAdminSubscriptions';
import { 
  Users, AlertTriangle, TrendingUp, 
  RefreshCw, Calendar, Ban, Settings,
  ChevronRight, Clock
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import StatCard from '@/components/dashboard/StatCard';

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-500',
  expired: 'bg-destructive/20 text-destructive',
  cancelled: 'bg-muted text-muted-foreground',
  trial: 'bg-blue-500/20 text-blue-500',
};

export default function AdminSubscriptions() {
  const {
    subscriptions,
    plans,
    isLoading,
    getExpiringSubscriptions,
    getExpiredSubscriptions,
    extendSubscription,
    changePlan,
    cancelSubscription,
    resetUsage,
    getStats,
  } = useAdminSubscriptions();

  const [selectedUser, setSelectedUser] = useState<SubscriptionWithUser | null>(null);
  const [extendDays, setExtendDays] = useState('30');
  const [selectedPlan, setSelectedPlan] = useState('');

  const stats = getStats();
  const expiringSoon = getExpiringSubscriptions(7);
  const expired = getExpiredSubscriptions();

  const handleExtend = async () => {
    if (!selectedUser) return;
    await extendSubscription.mutateAsync({ 
      userId: selectedUser.user_id, 
      days: parseInt(extendDays) 
    });
    setSelectedUser(null);
  };

  const handleChangePlan = async () => {
    if (!selectedUser || !selectedPlan) return;
    await changePlan.mutateAsync({ 
      userId: selectedUser.user_id, 
      planId: selectedPlan 
    });
    setSelectedUser(null);
  };

  const SubscriptionRow = ({ sub }: { sub: SubscriptionWithUser }) => {
    const isExpiringSoon = new Date(sub.current_period_end) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const isExpired = new Date(sub.current_period_end) < new Date();
    
    return (
      <TableRow>
        <TableCell>
          <div>
            <p className="font-medium">{sub.profile?.business_name || 'No Business Name'}</p>
            <p className="text-sm text-muted-foreground">{sub.profile?.phone_number}</p>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{sub.plan?.name || 'No Plan'}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={statusColors[sub.status]}>
            {sub.status}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Messages:</span>
              <span className={sub.messages_used >= (sub.plan?.message_limit ?? 0) ? 'text-destructive' : ''}>
                {sub.messages_used} / {sub.plan?.message_limit ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Contacts:</span>
              <span className={sub.contacts_used >= (sub.plan?.contact_limit ?? 0) ? 'text-destructive' : ''}>
                {sub.contacts_used} / {sub.plan?.contact_limit ?? 0}
              </span>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className={isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-500' : ''}>
            <p>{format(new Date(sub.current_period_end), 'PP')}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(sub.current_period_end), { addSuffix: true })}
            </p>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedUser(sub)}
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Subscription</DialogTitle>
                  <DialogDescription>
                    {sub.profile?.business_name || 'User'}'s subscription
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Extend Subscription</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={extendDays}
                        onChange={e => setExtendDays(e.target.value)}
                        className="w-24"
                      />
                      <span className="flex items-center text-sm text-muted-foreground">days</span>
                      <Button onClick={handleExtend} disabled={extendSubscription.isPending}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Extend
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Change Plan</Label>
                    <div className="flex gap-2">
                      <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {plans.map(plan => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.name} - ₹{plan.price_monthly}/mo
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleChangePlan} disabled={!selectedPlan || changePlan.isPending}>
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => resetUsage.mutate(sub.user_id)}
                      disabled={resetUsage.isPending}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Usage
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => cancelSubscription.mutate(sub.user_id)}
                      disabled={cancelSubscription.isPending}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage user subscriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Subscriptions"
            value={stats.active.toString()}
            change={`${stats.active} active`}
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Expiring Soon"
            value={stats.expiring.toString()}
            change={stats.expiring > 0 ? 'Needs attention' : 'All good'}
            changeType={stats.expiring > 0 ? 'negative' : 'positive'}
            icon={Clock}
          />
          <StatCard
            title="Expired"
            value={stats.expired.toString()}
            change={stats.expired > 0 ? `${stats.expired} expired` : 'None'}
            changeType={stats.expired > 0 ? 'negative' : 'neutral'}
            icon={AlertTriangle}
          />
          <StatCard
            title="Monthly Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            change="This month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {expiringSoon.length > 0 && (
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Expiring Soon ({expiringSoon.length})
              </CardTitle>
              <CardDescription>
                These subscriptions will expire within 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringSoon.slice(0, 5).map(sub => (
                  <div key={sub.id} className="flex items-center justify-between p-2 rounded-md bg-background">
                    <div>
                      <p className="font-medium">{sub.profile?.business_name || 'User'}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires {formatDistanceToNow(new Date(sub.current_period_end), { addSuffix: true })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setSelectedUser(sub)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Subscriptions</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="plans">Manage Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading subscriptions...
                      </TableCell>
                    </TableRow>
                  ) : subscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No subscriptions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptions.map(sub => (
                      <SubscriptionRow key={sub.id} sub={sub} />
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.filter(s => s.status === 'active').map(sub => (
                    <SubscriptionRow key={sub.id} sub={sub} />
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="expired" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expired</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expired.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No expired subscriptions
                      </TableCell>
                    </TableRow>
                  ) : (
                    expired.map(sub => (
                      <SubscriptionRow key={sub.id} sub={sub} />
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {plans.map(plan => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.name}
                      {!plan.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-2xl font-bold">
                      ₹{plan.price_monthly}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Messages:</span>
                        <span className="font-medium">{plan.message_limit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contacts:</span>
                        <span className="font-medium">{plan.contact_limit.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      {(plan.features as string[])?.map((feature, i) => (
                        <Badge key={i} variant="outline" className="mr-1 mb-1 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
