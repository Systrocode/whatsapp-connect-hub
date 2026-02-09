import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Clock, CheckCircle2, AlertCircle, Target, ChevronDown, ChevronUp, Trash2, CheckSquare } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConversations, ConversationWithContact } from '@/hooks/useConversations';
import { useCampaignLeads } from '@/hooks/useCampaignLeads';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import CampaignLeadsList from '@/components/dashboard/CampaignLeadsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500', icon: MessageSquare },
  waiting: { label: 'Waiting', color: 'bg-yellow-500', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-blue-500', icon: CheckCircle2 },
};

const Conversations = () => {
  const { conversations, isLoading } = useConversations();
  const { leads } = useCampaignLeads();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showLeads, setShowLeads] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);

  // Debug log to check incoming data
  console.log('Conversations:', conversations);

  const filteredConversations = conversations.filter((conv) => {
    const contactName = conv.contacts?.name?.toLowerCase() || '';
    const contactPhone = conv.contacts?.phone_number || '';

    const matchesSearch =
      contactName.includes(searchQuery.toLowerCase()) ||
      contactPhone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenConversation = (id: string) => {
    navigate(`/dashboard/conversations/${id}`);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredConversations.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkAction = async (action: 'delete' | 'mark_active' | 'mark_resolved') => {
    if (selectedIds.length === 0) return;
    setIsBulkActionLoading(true);

    try {
      if (action === 'delete') {
        const { error } = await supabase
          .from('conversations')
          .delete()
          .in('id', selectedIds);

        if (error) throw error;
        toast.success(`Deleted ${selectedIds.length} conversations`);
      } else if (action === 'mark_active') {
        const { error } = await supabase
          .from('conversations')
          .update({ status: 'active' })
          .in('id', selectedIds);

        if (error) throw error;
        toast.success(`Marked ${selectedIds.length} as Active`);
      } else if (action === 'mark_resolved') {
        const { error } = await supabase
          .from('conversations')
          .update({ status: 'resolved' })
          .in('id', selectedIds);

        if (error) throw error;
        toast.success(`Marked ${selectedIds.length} as Resolved`);
      }

      setSelectedIds([]);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsBulkActionLoading(false);
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
          <h1 className="text-2xl font-bold text-foreground mb-1">Conversations</h1>
          <p className="text-muted-foreground">Manage all your WhatsApp conversations</p>
        </motion.div>

        {/* Campaign Leads Section */}
        {leads.length > 0 && (
          <Collapsible open={showLeads} onOpenChange={setShowLeads}>
            <Card className="border-primary/20 bg-primary/5">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-primary/10 transition-colors rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-primary" />
                      New Campaign Leads
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        {leads.length}
                      </span>
                    </CardTitle>
                    {showLeads ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <CampaignLeadsList limit={5} />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Filters & Bulk Actions */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-4 pt-2 border-b border-border/40">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              {/* Select All Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={filteredConversations.length > 0 && selectedIds.length === filteredConversations.length}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  All
                </label>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <AnimatePresence mode="wait">
                {selectedIds.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-2 items-center"
                  >
                    <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline-block">
                      {selectedIds.length} selected
                    </span>
                    <Button
                      variant="outline" size="sm"
                      className="border-green-500/50 hover:bg-green-500/10 text-green-600"
                      onClick={() => handleBulkAction('mark_active')}
                      disabled={isBulkActionLoading}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" /> Active
                    </Button>
                    <Button
                      variant="outline" size="sm"
                      className="border-blue-500/50 hover:bg-blue-500/10 text-blue-600"
                      onClick={() => handleBulkAction('mark_resolved')}
                      disabled={isBulkActionLoading}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Resolve
                    </Button>
                    <Button
                      variant="destructive" size="sm"
                      onClick={() => handleBulkAction('delete')}
                      disabled={isBulkActionLoading}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </motion.div>
                ) : (
                  <div className="flex gap-1">
                    {['all', 'active', 'waiting', 'resolved'].map((status) => (
                      <Button
                        key={status}
                        variant={statusFilter === status ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setStatusFilter(status)}
                        className="capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start a conversation from the Contacts page'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation, index) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                index={index}
                isSelected={selectedIds.includes(conversation.id)}
                onSelect={(checked) => handleSelectOne(conversation.id, checked)}
                onClick={() => handleOpenConversation(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

interface ConversationItemProps {
  conversation: ConversationWithContact;
  index: number;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onClick: () => void;
}

const ConversationItem = ({ conversation, index, isSelected, onSelect, onClick }: ConversationItemProps) => {
  const status = statusConfig[conversation.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`w-full bg-card rounded-xl border p-4 transition-all group flex items-center gap-4 ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
    >
      {/* Checkbox */}
      <div className="flex items-center h-full">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Clickable Area */}
      <div
        className="flex-1 flex items-center gap-4 cursor-pointer min-w-0"
        onClick={onClick}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {conversation.contacts?.name?.[0]?.toUpperCase() ||
                conversation.contacts?.phone_number[0] ||
                '?'}
            </span>
          </div>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${status.color}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {conversation.contacts?.name || conversation.contacts?.phone_number || 'Unknown'}
            </h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground truncate">
              {conversation.contacts?.phone_number}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {conversation.unread_count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {conversation.unread_count}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${conversation.status === 'active'
                  ? 'bg-green-500/10 text-green-600'
                  : conversation.status === 'waiting'
                    ? 'bg-yellow-500/10 text-yellow-600'
                    : 'bg-blue-500/10 text-blue-600'
                  }`}
              >
                <StatusIcon className="w-3 h-3" />
                <span className="hidden sm:inline">{status.label}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Conversations;