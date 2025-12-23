import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Clock, CheckCircle2, AlertCircle, Target, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useConversations, ConversationWithContact } from '@/hooks/useConversations';
import { useCampaignLeads } from '@/hooks/useCampaignLeads';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import CampaignLeadsList from '@/components/dashboard/CampaignLeadsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500', icon: MessageSquare },
  waiting: { label: 'Waiting', color: 'bg-yellow-500', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-blue-500', icon: CheckCircle2 },
};

const Conversations = () => {
  const { conversations, isLoading } = useConversations();
  const { leads } = useCampaignLeads();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showLeads, setShowLeads] = useState(true);

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.contacts?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contacts?.phone_number.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenConversation = (id: string) => {
    navigate(`/dashboard/conversations/${id}`);
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'waiting', 'resolved'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </motion.div>

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
          <div className="space-y-3">
            {filteredConversations.map((conversation, index) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                index={index}
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
  onClick: () => void;
}

const ConversationItem = ({ conversation, index, onClick }: ConversationItemProps) => {
  const status = statusConfig[conversation.status];
  const StatusIcon = status.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="w-full bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-all text-left group"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
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
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate">
              {conversation.contacts?.phone_number}
            </p>
            <div className="flex items-center gap-2">
              {conversation.unread_count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {conversation.unread_count}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  conversation.status === 'active'
                    ? 'bg-green-500/10 text-green-600'
                    : conversation.status === 'waiting'
                    ? 'bg-yellow-500/10 text-yellow-600'
                    : 'bg-blue-500/10 text-blue-600'
                }`}
              >
                <StatusIcon className="w-3 h-3" />
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default Conversations;