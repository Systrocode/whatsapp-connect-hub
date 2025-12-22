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
import { useAdminTemplates } from '@/hooks/useAdminTemplates';
import { FileText, Check, X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AdminTemplates = () => {
  const { templates, isLoading, approveTemplate, deleteTemplate, isUpdating } = useAdminTemplates();

  const pendingTemplates = templates.filter(t => !t.is_approved);
  const approvedTemplates = templates.filter(t => t.is_approved);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Template Management</h1>
            <p className="text-muted-foreground">Review and approve message templates</p>
          </div>
        </div>

        {/* Pending Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                  {pendingTemplates.length}
                </Badge>
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : pendingTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No pending templates
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium text-foreground">
                          {template.name}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-muted-foreground">
                          {template.content}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.category || 'General'}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(template.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-emerald-500 hover:bg-emerald-500/10"
                              onClick={() => approveTemplate({ templateId: template.id, approve: true })}
                              disabled={isUpdating}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => approveTemplate({ templateId: template.id, approve: false })}
                              disabled={isUpdating}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Approved Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  {approvedTemplates.length}
                </Badge>
                Approved Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {approvedTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No approved templates yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium text-foreground">
                          {template.name}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-muted-foreground">
                          {template.content}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.category || 'General'}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(template.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-orange-500 hover:bg-orange-500/10"
                              onClick={() => approveTemplate({ templateId: template.id, approve: false })}
                              disabled={isUpdating}
                            >
                              Revoke
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-destructive hover:bg-destructive/10"
                                  disabled={isUpdating}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{template.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteTemplate(template.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default AdminTemplates;
