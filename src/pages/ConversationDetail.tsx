import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, MoreVertical, CheckCircle2, Clock, User, Paperclip, Loader2, Image as ImageIcon, FileText, Music, LayoutTemplate, Info, Check, CheckCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessages } from '@/hooks/useMessages';
import { useConversations } from '@/hooks/useConversations';
import { useTemplates, MessageTemplate } from '@/hooks/useTemplates';
import { Skeleton } from '@/components/ui/skeleton';
import { format, isToday, isYesterday } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { WhatsAppMedia } from '@/components/dashboard/WhatsAppMedia';
import { ContactInfoSidebar } from '@/components/dashboard/ContactInfoSidebar';

import { useCannedResponses } from '@/hooks/useCannedResponses';
import { QuickReplyManager } from '@/components/dashboard/QuickReplyManager';
import { useContacts } from '@/hooks/useContacts';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, isLoading: messagesLoading, error, sendMessage } = useMessages(id);
  const { conversations, updateConversation, markAsRead } = useConversations();
  const { updateContact } = useContacts();

  const { templates } = useTemplates();
  const { responses: cannedResponses } = useCannedResponses();

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendTemplate = async (template: MessageTemplate) => {
    try {
      // Basic sending without parameters for now
      // If template requires parameters, this might fail or send placeholders.
      // For MVP, we assume user selects templates that are ready to send or handles errors.

      const content = `Template: ${template.name}`;

      await sendMessage.mutateAsync({
        content: content,
        messageType: 'template',
        templateName: template.name,
        // templateParams: [] // Pass variables if we build a form for them
      });
      toast.success('Template sent');
    } catch (e: any) {
      // Error handled in hook
    }
  };

  // ... (keep handling functions same until return)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (keep existing implementation)
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

      const { data, error: signedUrlError } = await supabase.storage
        .from('chat-media')
        .createSignedUrl(filePath, 315576000); // 10 years expiry to keep chat history accessible

      if (signedUrlError) throw signedUrlError;

      const publicUrl = data.signedUrl;

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
  // Ensure we have a valid contact object (handling potential array or null)
  const contact = conversation?.contacts ? (Array.isArray(conversation.contacts) ? conversation.contacts[0] : conversation.contacts) : null;

  const handleUpdateContact = (updates: any) => {
    if (contact?.id) {
      updateContact.mutate({ id: contact.id, ...updates });
    }
  };

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

    sendMessage.mutate({ content: newMessage.trim() });
    setNewMessage('');
  };

  const handleStatusChange = async (status: 'active' | 'waiting' | 'resolved') => {
    if (id) {
      await updateConversation.mutateAsync({ id, status });
    }
  };

  const groupedMessages = messages.reduce((groups: { date: string; messages: typeof messages }[], message) => {
    const date = new Date(message.created_at);
    let dateLabel = format(date, 'MMMM d, yyyy');
    if (isToday(date)) dateLabel = 'Today';
    else if (isYesterday(date)) dateLabel = 'Yesterday';

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === dateLabel) {
      lastGroup.messages.push(message);
    } else {
      groups.push({ date: dateLabel, messages: [message] });
    }
    return groups;
  }, []);

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
    <DashboardLayout shouldScroll={false} noPadding={true}>
      <div className="flex flex-col h-full lg:p-4">
        <div className="flex-1 flex overflow-hidden bg-background lg:rounded-lg lg:border border-border lg:shadow-sm">

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border-b border-border bg-background z-10"
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
              <div className="flex items-center gap-1">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground">
                      <Info className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 border-l border-border w-80 sm:w-96">
                    <ContactInfoSidebar contact={contact as any} onUpdate={handleUpdateContact} />
                  </SheetContent>
                </Sheet>

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
                <QuickReplyManager />
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-transparent">
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
                groupedMessages.map((group) => (
                  <div key={group.date} className="relative">
                    <div className="flex justify-center my-6 sticky top-2 z-10 pointer-events-none">
                      <span className="bg-secondary/80 backdrop-blur-sm text-[10px] font-medium px-3 py-1 rounded-full text-secondary-foreground shadow-sm border border-border/50 select-none">
                        {group.date}
                      </span>
                    </div>
                    {group.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex mb-2 ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${message.direction === 'outbound'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-white dark:bg-muted text-foreground rounded-bl-none border border-border/50'
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
                              if (parsed.video) return <div className="flex items-center gap-2 p-2 bg-black/10 rounded">🎥 Video</div>;
                              if (parsed.audio) return <div className="flex items-center gap-2 p-2 bg-black/10 rounded">🎵 Audio</div>;
                              if (parsed.document) return <div className="flex items-center gap-2 p-2 bg-black/10 rounded">📄 Document: {parsed.filename || 'File'}</div>;

                            } catch (e) {
                              // Legacy message or text
                            }

                            // Fallback
                            return (
                              <div className="flex items-center gap-2 text-sm italic opacity-80">
                                <span>📷</span>
                                <span>{message.content}</span>
                              </div>
                            );
                          })() : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          )}
                          <div className={`flex items-center justify-end gap-1 mt-1 ${message.direction === 'outbound' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            <p className="text-[10px]">
                              {format(new Date(message.created_at), 'HH:mm')}
                            </p>
                            {message.direction === 'outbound' && (
                              <span className="text-[10px]">
                                {message.status === 'read' ? (
                                  <CheckCheck className="w-3 h-3 text-blue-500" />
                                ) : message.status === 'delivered' ? (
                                  <CheckCheck className="w-3 h-3 text-muted-foreground" />
                                ) : (
                                  <Check className="w-3 h-3 text-muted-foreground" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-background">
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSendMessage}
                className="flex gap-2 items-end"
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
                      className="text-muted-foreground hover:text-foreground shrink-0 mb-1"
                      title="Send Template (Required for new chats)"
                    >
                      <LayoutTemplate className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 max-h-[300px] overflow-y-auto mb-2">
                    <div className="p-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                      Select Template
                    </div>
                    {templates?.length > 0 ? (
                      templates.map((t) => (
                        <DropdownMenuItem
                          key={t.id}
                          onClick={() => handleSendTemplate(t)}
                          className="cursor-pointer flex flex-col items-start gap-1 py-2"
                        >
                          <span className="font-medium text-sm">{t.name}</span>
                          <span className="text-[10px] text-muted-foreground truncate w-full">{t.content.substring(0, 50)}...</span>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs text-center text-muted-foreground">
                        No templates found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isUploading || sendMessage.isPending}
                      className="text-muted-foreground hover:text-foreground shrink-0 mb-1"
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
                <div className="flex-1 relative bg-muted/30 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-background transition-all">
                  {/* Quick Reply Popover */}
                  {newMessage.startsWith('/') && (
                    <div className="absolute bottom-full mb-2 left-0 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-border overflow-hidden z-20 animate-in slide-in-from-bottom-2 fade-in duration-200">
                      <div className="p-2 text-xs font-semibold bg-muted/50 border-b text-muted-foreground flex justify-between items-center">
                        <span>Quick Replies</span>
                        <span className="font-mono bg-background px-1 rounded border">TAB to select</span>
                      </div>
                      <div className="max-h-[200px] overflow-y-auto p-1">
                        {(cannedResponses || [])
                          .filter(r => r.shortcut.toLowerCase().includes(newMessage.slice(1).toLowerCase()))
                          .map((r) => (
                            <div
                              key={r.id}
                              className="px-3 py-2 hover:bg-muted rounded-md cursor-pointer flex justify-between items-center group"
                              onClick={() => setNewMessage(r.content)}
                            >
                              <div className="flex flex-col overflow-hidden">
                                <span className="font-bold text-sm text-foreground">/{r.shortcut}</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">{r.content}</span>
                              </div>
                              <div className="text-[10px] bg-slate-100 text-slate-500 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Enter
                              </div>
                            </div>
                          ))}
                        {(cannedResponses || []).filter(r => r.shortcut.toLowerCase().includes(newMessage.slice(1).toLowerCase())).length === 0 && (
                          <div className="p-3 text-center text-xs text-muted-foreground">
                            No matching quick replies found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Textarea
                    placeholder="Type a message... (Type '/' for quick replies)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[44px] max-h-32 border-0 bg-transparent focus-visible:ring-0 resize-none py-3"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                      // Handle Tab to select first match
                      if (e.key === 'Tab' && newMessage.startsWith('/')) {
                        e.preventDefault();
                        const matches = (cannedResponses || []).filter(r => r.shortcut.toLowerCase().includes(newMessage.slice(1).toLowerCase()));
                        if (matches.length > 0) {
                          setNewMessage(matches[0].content);
                        }
                      }
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="icon"
                  className="h-11 w-11 rounded-full shrink-0 shadow-md"
                  disabled={!newMessage.trim() || sendMessage.isPending}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </motion.form>
            </div>
          </div>

          {/* Right Info Sidebar */}
          <div className="hidden xl:block h-full border-l border-border">
            <ContactInfoSidebar contact={contact as any} onUpdate={handleUpdateContact} />
          </div>

        </div>
      </div >
    </DashboardLayout >
  );
};

export default ConversationDetail;