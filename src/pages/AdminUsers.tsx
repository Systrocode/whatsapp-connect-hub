import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Shield, UserCog, User, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatToIST } from '@/lib/utils';

const roleConfig = {
  admin: { label: 'Admin', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  moderator: { label: 'Moderator', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  user: { label: 'User', color: 'bg-muted text-muted-foreground border-border' },
};

const AdminUsers = () => {
  const { users, isLoading, updateRole, isUpdating, deleteUser, isDeleting } = useAdminUsers();
  const { user: currentUser } = useAuth();

  const handleRoleChange = (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    updateRole({ userId, newRole });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage users and their roles</p>
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCog className="w-5 h-5 text-primary" />
                All Users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No users found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
                      const role = roleConfig[user.role] || roleConfig.user;
                      const isCurrentUser = user.id === currentUser?.id;

                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                {user.role === 'admin' ? (
                                  <Shield className="w-4 h-4 text-red-500" />
                                ) : user.role === 'moderator' ? (
                                  <UserCog className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <User className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">
                                  {user.business_name || 'Unnamed User'}
                                  {isCurrentUser && (
                                    <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">{user.id.slice(0, 8)}...</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.phone_number || '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={role.color}>
                              {role.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatToIST(user.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Select
                                value={user.role}
                                onValueChange={(value) => handleRoleChange(user.id, value as 'admin' | 'moderator' | 'user')}
                                disabled={isUpdating || isCurrentUser}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                disabled={isDeleting || isCurrentUser || user.role === 'admin'}
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                                    deleteUser(user.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
