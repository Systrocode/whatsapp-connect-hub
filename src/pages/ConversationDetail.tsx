import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, MoreVertical, CheckCircle2, Clock, User } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessages } from '@/hooks/useMessages';
import { useConversations } from '@/hooks/useConversations';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, isLoading: messagesLoading, sendMessage } = useMessages(id);
  const { conversations, updateConversation } = useConversations();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === id);
  const contact = conversation?.contacts;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage.mutateAsync({ content: newMessage.trim() });
    setNewMessage('');
  };

  const handleStatusChange = async (status: 'active' | 'waiting' | 'resolved') => {
    if (id) {
      await updateConversation.mutateAsync({ id, status });
    }
  };

  if (!id) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No conversation selected</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-7rem)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between pb-4 border-b border-border"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard/conversations')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            {contact ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {contact.name?.[0]?.toUpperCase() || contact.phone_number[0]}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {contact.name || 'Unknown'}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {contact.phone_number}
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-10 w-40" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('active')}>
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                Mark as Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('waiting')}>
                <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                Mark as Waiting
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('resolved')}>
                <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
                Mark as Resolved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messagesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Skeleton className="h-12 w-64 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">No messages yet</h3>
              <p className="text-sm text-muted-foreground">
                Send a message to start the conversation
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex ${
                  message.direction === 'outbound' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.direction === 'outbound'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.direction === 'outbound'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {format(new Date(message.created_at), 'HH:mm')}
                  </p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSendMessage}
          className="flex gap-2 pt-4 border-t border-border"
        >
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            variant="whatsapp"
            size="icon"
            disabled={!newMessage.trim() || sendMessage.isPending}
          >
            <Send className="w-5 h-5" />
          </Button>
        </motion.form>
      </div>
    </DashboardLayout>
  );
};

export default ConversationDetail;