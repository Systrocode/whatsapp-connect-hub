import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useConversations } from '@/hooks/useConversations';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const statusColors = {
  active: 'bg-green-500',
  waiting: 'bg-yellow-500',
  resolved: 'bg-blue-500',
};

const ConversationsList = () => {
  const { conversations, isLoading } = useConversations();
  const navigate = useNavigate();

  // Take only top 5 recent conversations
  const recentConversations = conversations.slice(0, 5);

  const handleViewAll = () => {
    navigate('/dashboard/conversations');
  };

  const handleConversationClick = (id: string) => {
    navigate(`/dashboard/conversations/${id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border p-4 space-y-4">
        <Skeleton className="h-6 w-32" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Conversations</h3>
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-border">
        {recentConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No conversations yet
          </div>
        ) : (
          recentConversations.map((conv, index) => {
            const contactName = conv.contacts?.name || 'Unknown Contact';
            const contactPhone = conv.contacts?.phone_number || '';
            const displayName = contactName !== 'Unknown Contact' ? contactName : contactPhone;
            const initials = displayName.slice(0, 2).toUpperCase();

            return (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer group"
                onClick={() => handleConversationClick(conv.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                      statusColors[conv.status] || 'bg-gray-400'
                    )} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground truncate">{displayName}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {conv.last_message_at
                          ? formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })
                          : ''}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {/* We don't have the last message content in the conversation object yet, so we show a placeholder or status */}
                      Click to view message
                    </p>
                  </div>

                  {(conv.unread_count || 0) > 0 && (
                    <Badge className="bg-green-500 text-white hover:bg-green-600 flex-shrink-0">
                      {conv.unread_count}
                    </Badge>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default ConversationsList;
