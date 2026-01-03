import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, MoreVertical, CheckCircle2, Clock, User, Paperclip, Loader2, Image as ImageIcon, FileText, Music, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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

import { WhatsAppMedia } from '@/components/dashboard/WhatsAppMedia';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, isLoading: messagesLoading, error, sendMessage } = useMessages(id);
  const { conversations, updateConversation, markAsRead } = useConversations();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    let isValid = true;
    let type: 'image' | 'audio' | 'video' | 'document' = 'document';

    if (file.type.startsWith('image/')) {
      type = 'image';
      if (file.size > 5 * 1024 * 1024) { toast.error('Image max size is 5MB'); isValid = false; }
      else if (!['image/jpeg', 'image/png'].includes(file.type)) { toast.error('Only JPEG and PNG images supported'); isValid = false; }
    } else if (file.type.startsWith('audio/')) {
      type = 'audio';
      if (file.size > 16 * 1024 * 1024) { toast.error('Audio max size is 16MB'); isValid = false; }
      // WhatsApp supports specific audio types, allowing common ones
    } else if (file.type.startsWith('video/')) {
      type = 'video';
      if (file.size > 16 * 1024 * 1024) { toast.error('Video max size is 16MB'); isValid = false; }
      else if (!['video/mp4', 'video/3gpp'].includes(file.type)) { toast.error('Only MP4 and 3GPP videos supported'); isValid = false; }
    } else {
      type = 'document';
      if (file.size > 100 * 1024 * 1024) { toast.error('Document max size is 100MB'); isValid = false; }
    }

    if (!isValid) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-media')
        .getPublicUrl(filePath);

      await sendMessage.mutateAsync({
        content: newMessage || file.name, // Use message input as caption/content or filename
        messageType: type,
        mediaUrl: publicUrl,
        filename: file.name
      });

      setNewMessage('');
      toast.success('Media sent successfully');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Failed to upload media: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = (acceptType: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
  };

  const conversation = conversations.find((c) => c.id === id);
  const contact = conversation?.contacts;

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (id && conversation?.unread_count && conversation.unread_count > 0) {
      markAsRead.mutate(id);
    }
  }, [id, conversation?.unread_count, markAsRead]);

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
                className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.direction === 'outbound'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                >
                  {['image', 'video', 'audio', 'document'].includes(message.message_type || '') ? (() => {
                    try {
                      const parsed = JSON.parse(message.content);

                      // Handle Image
                      if (parsed.image) {
                        const mediaId = parsed.image.id;
                        const mediaUrl = parsed.image.link;
                        const caption = parsed.caption;
                        if (mediaId || mediaUrl) {
                          return <WhatsAppMedia mediaId={mediaId} mediaUrl={mediaUrl} caption={caption} />;
                        }
                      }

                      // Handle other media types gracefully
                      if (parsed.video) return <div className="flex items-center gap-2 p-2 bg-background/20 rounded">🎥 Video</div>;
                      if (parsed.audio) return <div className="flex items-center gap-2 p-2 bg-background/20 rounded">🎵 Audio</div>;
                      if (parsed.document) return <div className="flex items-center gap-2 p-2 bg-background/20 rounded">📄 Document: {parsed.filename || 'File'}</div>;

                    } catch (e) {
                      // Legacy message or text
                    }

                    // Fallback
                    return (
                      <div className="flex items-center gap-2 text-sm italic text-muted-foreground/80">
                        <span>📷</span>
                        <span>{message.content}</span>
                      </div>
                    );
                  })() : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-1 ${message.direction === 'outbound'
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
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          // accept is set dynamically
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isUploading || sendMessage.isPending}
                className="text-muted-foreground hover:text-foreground"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mb-2">
              <DropdownMenuItem onClick={() => triggerFileInput('image/jpeg,image/png,video/mp4,video/3gpp')} className="cursor-pointer gap-2 py-3">
                <ImageIcon className="w-5 h-5 text-purple-500" />
                <span className="text-base">Photos & Videos</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => triggerFileInput('application/*,text/*')} className="cursor-pointer gap-2 py-3">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span className="text-base">Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => triggerFileInput('audio/*')} className="cursor-pointer gap-2 py-3">
                <Music className="w-5 h-5 text-orange-500" />
                <span className="text-base">Audio</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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