import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  status: 'active' | 'waiting' | 'resolved';
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    message: 'Hi, I wanted to ask about your product availability...',
    time: '2m ago',
    unread: 3,
    status: 'active',
  },
  {
    id: '2',
    name: 'Mike Chen',
    message: 'Thank you for the quick response!',
    time: '15m ago',
    unread: 0,
    status: 'resolved',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    message: 'Can you help me with my order #12345?',
    time: '1h ago',
    unread: 1,
    status: 'waiting',
  },
  {
    id: '4',
    name: 'David Brown',
    message: 'I need to change my delivery address...',
    time: '2h ago',
    unread: 0,
    status: 'active',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    message: 'What are your business hours?',
    time: '3h ago',
    unread: 2,
    status: 'waiting',
  },
];

const statusColors = {
  active: 'bg-whatsapp',
  waiting: 'bg-amber-500',
  resolved: 'bg-muted-foreground',
};

const ConversationsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Conversations</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="divide-y divide-border">
        {conversations.map((conv, index) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {conv.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                  statusColors[conv.status]
                )} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground truncate">{conv.name}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
              </div>

              {conv.unread > 0 && (
                <Badge className="bg-whatsapp text-primary-foreground hover:bg-whatsapp-dark flex-shrink-0">
                  {conv.unread}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConversationsList;
