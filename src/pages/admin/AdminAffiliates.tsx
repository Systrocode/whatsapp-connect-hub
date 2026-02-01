import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, DollarSign, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface AffiliateUser {
  id: string;
  user_id: string;
  referral_code: string;
  commission_rate: number;
  total_earnings: number;
  status: string;
  created_at: string;
  email: string;
  business_name?: string;
}

const AdminAffiliates = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: affiliates, isLoading, error } = useQuery({
    queryKey: ['adminAffiliates'],
    queryFn: async () => {
      // Use the RPC function to get affiliates with email
      const { data, error } = await supabase
        .rpc('get_admin_affiliates');

      if (error) throw error;

      return data as AffiliateUser[];
    },
  });

  const filteredAffiliates = affiliates?.filter(affiliate =>
    affiliate.referral_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEarnings = affiliates?.reduce((sum, a) => sum + Number(a.total_earnings), 0) || 0;


  if (error) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-500">
          <h2 className="text-xl font-bold">Error loading affiliates</h2>
          <p>{(error as Error).message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Affiliate Management</h1>
              <p className="text-muted-foreground">Track and manage affiliate partners</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliates?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid Out</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate</TableHead>
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead className="text-right">Total Earnings</TableHead>
                    <TableHead className="text-right">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading affiliates...
                      </TableCell>
                    </TableRow>
                  ) : filteredAffiliates?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No affiliates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAffiliates?.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{affiliate.business_name || affiliate.email?.split('@')[0]}</div>
                            <div className="text-xs text-muted-foreground">{affiliate.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-xs">{affiliate.referral_code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={affiliate.status === 'active' ? 'default' : 'secondary'}>
                            {affiliate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{(affiliate.commission_rate * 100).toFixed(0)}%</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          ₹{Number(affiliate.total_earnings).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {new Date(affiliate.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAffiliates;
