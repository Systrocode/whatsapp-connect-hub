import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useE2EEChat, DecryptedMessage, ChatRoom } from '@/hooks/useE2EEChat';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import {
  Shield, Lock, Key, Send, Plus, Users, MessageSquare,
  MoreVertical, Trash2, Pin, Reply, Smile, CheckCheck, Check,
  Search, Phone, Video, Info, AlertTriangle, X, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatDistanceToNow, format } from 'date-fns';

// ─── Helpers ─────────────────────────────────────────────────

function initials(name?: string | null, email?: string | null) {
  if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  if (email) return email.slice(0, 2).toUpperCase();
  return '??';
}

function roomDisplayName(room: ChatRoom, myId: string) {
  if (room.name) return room.name;
  const other = room.participants.find(p => p.user_id !== myId);
  return other?.profile?.full_name ?? other?.profile?.email ?? 'Direct Message';
}

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

// ─── Message Status (BBM-style D/R) ──────────────────────────

function MessageStatus({ senderId, messageId, myId }: { senderId: string; messageId: string; myId: string }) {
  if (senderId !== myId) return null;
  return (
    <span className="text-xs text-blue-400 ml-1">
      <CheckCheck className="w-3 h-3 inline" />
    </span>
  );
}

// ─── Single Message Bubble ────────────────────────────────────

function MessageBubble({
  msg, myId, onReact, onReply, onDelete, onPin,
}: {
  msg: DecryptedMessage;
  myId: string;
  onReact: (id: string, emoji: string) => void;
  onReply: (msg: DecryptedMessage) => void;
  onDelete: (id: string, all: boolean) => void;
  onPin: (id: string, pin: boolean) => void;
}) {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const isMe = msg.sender_id === myId;

  return (
    <div className={`flex gap-2 group ${isMe ? 'flex-row-reverse' : ''} mb-2`}>
      {!isMe && (
        <Avatar className="w-7 h-7 shrink-0 mt-1">
          <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            {initials(msg.sender_profile?.full_name, msg.sender_profile?.email)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[65%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Reply preview */}
        {msg.reply_to_message && (
          <div className={`text-xs px-3 py-1 rounded-t-lg border-l-2 border-primary mb-0.5 bg-muted/60 text-muted-foreground max-w-full truncate ${isMe ? 'self-end' : ''}`}>
            ↩ {msg.reply_to_message.plaintext}
          </div>
        )}

        {/* Pinned badge */}
        {msg.is_pinned && (
          <div className="flex items-center gap-1 text-[10px] text-amber-500 mb-0.5">
            <Pin className="w-2.5 h-2.5" /> Pinned
          </div>
        )}

        <div
          className={`relative px-4 py-2.5 rounded-2xl text-sm shadow-sm cursor-pointer select-none
            ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border border-border rounded-tl-sm'}
            ${!msg.integrity_verified && !msg.deleted_for_all ? 'border border-red-400' : ''}
          `}
          onContextMenu={e => { e.preventDefault(); setShowActions(v => !v); }}
          onClick={() => setShowActions(v => !v)}
        >
          {/* Integrity warning */}
          {!msg.integrity_verified && !msg.deleted_for_all && (
            <div className="flex items-center gap-1 text-red-400 text-[10px] mb-1">
              <AlertTriangle className="w-3 h-3" /> Integrity check failed
            </div>
          )}

          <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.plaintext}</p>

          <div className={`flex items-center gap-1 mt-1 text-[10px] ${isMe ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground'}`}>
            <Lock className="w-2.5 h-2.5" />
            <span>{format(new Date(msg.created_at), 'HH:mm')}</span>
            {msg.is_edited && <span>(edited)</span>}
            <MessageStatus senderId={msg.sender_id} messageId={msg.id} myId={myId} />
          </div>
        </div>

        {/* Context actions */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={`flex gap-1 mt-1 flex-wrap ${isMe ? 'justify-end' : ''}`}
            >
              {/* Reactions */}
              {REACTIONS.map(e => (
                <button key={e} onClick={() => { onReact(msg.id, e); setShowActions(false); }}
                  className="text-base hover:scale-125 transition-transform">{e}</button>
              ))}
              <button onClick={() => { onReply(msg); setShowActions(false); }}
                className="p-1 rounded-md hover:bg-muted"><Reply className="w-3.5 h-3.5" /></button>
              <button onClick={() => { onPin(msg.id, !msg.is_pinned); setShowActions(false); }}
                className="p-1 rounded-md hover:bg-muted"><Pin className="w-3.5 h-3.5" /></button>
              {isMe && (
                <>
                  <button onClick={() => { onDelete(msg.id, false); setShowActions(false); }}
                    className="p-1 rounded-md hover:bg-muted text-muted-foreground"><Trash2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { onDelete(msg.id, true); setShowActions(false); }}
                    className="p-1 rounded-md hover:bg-muted text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function TeamChat() {
  const { user } = useAuth();
  const {
    keyReady, fingerprint, rooms, messages, activeRoom, typingUsers,
    isLoadingRooms, isLoadingMessages,
    loadMessages, sendMessage, sendTyping, startDM, createGroup,
    reactToMessage, deleteMessage, pinMessage,
  } = useE2EEChat();

  const { data: teamMembers } = useTeamMembers();
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState<DecryptedMessage | null>(null);
  const [search, setSearch] = useState('');
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeRoom) return;
    const ok = await sendMessage(activeRoom.id, input.trim(), replyTo?.id);
    if (ok) { setInput(''); setReplyTo(null); }
    else toast.error('Failed to send encrypted message');
  };

  const filteredRooms = rooms.filter(r =>
    roomDisplayName(r, user?.id ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (!keyReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-background flex-col gap-4">
        <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Initializing encryption keys…</p>
        <p className="text-xs text-muted-foreground/60">Your private key is being generated on this device</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <div className="w-80 border-r border-border flex flex-col bg-card shrink-0">

        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Team Chat</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">E2EE</Badge>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowFingerprint(v => !v)}>
                <Key className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowNewGroup(v => !v)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Fingerprint panel */}
          <AnimatePresence>
            {showFingerprint && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="bg-muted/50 rounded-xl p-3 mb-3 text-[10px] font-mono overflow-hidden">
                <div className="text-muted-foreground mb-1">Your key fingerprint</div>
                <div className="text-foreground font-bold tracking-wider break-all">{fingerprint}</div>
                <div className="text-muted-foreground mt-1">Share this with teammates to verify identity</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Group panel */}
          <AnimatePresence>
            {showNewGroup && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="bg-muted/50 rounded-xl p-3 mb-3 space-y-2 overflow-hidden">
                <Input placeholder="Group name" value={groupName} onChange={e => setGroupName(e.target.value)} className="h-8 text-xs" />
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {teamMembers?.filter(m => m.user_id !== user?.id).map(m => (
                    <label key={m.user_id} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input type="checkbox" checked={groupMembers.includes(m.user_id)}
                        onChange={e => setGroupMembers(prev => e.target.checked ? [...prev, m.user_id] : prev.filter(id => id !== m.user_id))} />
                      {m.profiles?.business_name ?? m.user_id.slice(0, 8)}
                    </label>
                  ))}
                </div>
                <Button size="sm" className="w-full h-7 text-xs" onClick={async () => {
                  if (!groupName.trim() || !groupMembers.length) return;
                  await createGroup(groupName, groupMembers);
                  setShowNewGroup(false); setGroupName(''); setGroupMembers([]);
                  toast.success('Encrypted group created');
                }}>Create Group</Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search chats…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-8 text-xs" />
          </div>
        </div>

        {/* Team members for DM */}
        {teamMembers && teamMembers.filter(m => m.user_id !== user?.id).length > 0 && (
          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">Start DM</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {teamMembers.filter(m => m.user_id !== user?.id).map(m => (
                <button key={m.user_id} onClick={async () => {
                  const roomId = await startDM(m.user_id);
                  if (roomId) {
                    const room = rooms.find(r => r.id === roomId);
                    if (room) loadMessages(room);
                  }
                }} className="flex flex-col items-center gap-1 shrink-0">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      {initials(m.profiles?.business_name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[9px] text-muted-foreground truncate w-12 text-center">
                    {m.profiles?.business_name?.split(' ')[0] ?? 'Agent'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rooms list */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingRooms ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map(i => <div key={i} className="h-14 bg-muted/50 rounded-xl animate-pulse" />)}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No chats yet. Start a DM above.
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredRooms.map(room => (
                <button key={room.id} onClick={() => loadMessages(room)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors hover:bg-muted/60
                    ${activeRoom?.id === room.id ? 'bg-primary/10 border border-primary/20' : ''}`}>
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className={`text-sm font-bold text-white ${room.room_type === 'group' ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                      {room.room_type === 'group' ? <Users className="w-4 h-4" /> : initials(roomDisplayName(room, user?.id ?? ''))}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-foreground truncate">{roomDisplayName(room, user?.id ?? '')}</span>
                      <Lock className="w-3 h-3 text-primary/60 shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">End-to-end encrypted</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* E2EE status footer */}
        <div className="p-3 border-t border-border bg-primary/5">
          <div className="flex items-center gap-2 text-[10px] text-primary">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">AES-256-GCM · ECDH P-256 · HMAC-SHA256</span>
          </div>
        </div>
      </div>

      {/* ── Chat Area ──────────────────────────────────────── */}
      {activeRoom ? (
        <div className="flex-1 flex flex-col min-w-0">

          {/* Chat header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card shrink-0">
            <div className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
                  {activeRoom.room_type === 'group' ? <Users className="w-4 h-4" /> : <span className="text-sm">{initials(roomDisplayName(activeRoom, user?.id ?? ''))}</span>}
                </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{roomDisplayName(activeRoom, user?.id ?? '')}</div>
                <div className="flex items-center gap-1 text-[10px] text-primary">
                  <Lock className="w-2.5 h-2.5" />
                  <span>End-to-end encrypted</span>
                  {activeRoom.participants.length > 1 && (
                    <span className="text-muted-foreground">· {activeRoom.participants.length} members</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Info className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2 bg-primary/5 text-[10px] text-primary/80">
            <Shield className="w-3 h-3" />
            Messages are end-to-end encrypted. Only participants can read them.
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {isLoadingMessages ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`flex gap-2 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-muted animate-pulse shrink-0" />
                    <div className="h-10 w-48 bg-muted animate-pulse rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold">No messages yet</p>
                <p className="text-xs text-center max-w-xs">
                  Messages are encrypted end-to-end using AES-256-GCM. Only you and your teammates can read them.
                </p>
              </div>
            ) : (
              messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  myId={user?.id ?? ''}
                  onReact={reactToMessage}
                  onReply={setReplyTo}
                  onDelete={deleteMessage}
                  onPin={pinMessage}
                />
              ))
            )}

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                  ))}
                </div>
                {typingUsers[0].name} is typing…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reply preview */}
          <AnimatePresence>
            {replyTo && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                className="px-4 overflow-hidden">
                <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-2 text-xs border-l-2 border-primary">
                  <Reply className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-muted-foreground truncate flex-1">{replyTo.plaintext}</span>
                  <button onClick={() => setReplyTo(null)}><X className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input bar */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={e => { setInput(e.target.value); sendTyping(activeRoom.id); }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type an encrypted message…"
                  className="pr-10 rounded-xl border-border focus:border-primary"
                />
                <Lock className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-primary/50" />
              </div>
              <Button onClick={handleSend} disabled={!input.trim()} size="icon"
                className="rounded-xl bg-primary hover:bg-primary/90 h-10 w-10 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="font-bold text-foreground text-lg mb-1">Avelo Secure Team Chat</h2>
            <p className="text-sm max-w-sm">Select a conversation or start a new DM. All messages are end-to-end encrypted — not even Avelo can read them.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2 text-xs">
            {[
              { icon: <Lock className="w-4 h-4" />, label: 'AES-256-GCM' },
              { icon: <Key className="w-4 h-4" />, label: 'ECDH P-256' },
              { icon: <Shield className="w-4 h-4" />, label: 'HMAC-SHA256' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-1 bg-muted/40 rounded-xl p-3">
                <span className="text-primary">{item.icon}</span>
                <span className="font-mono font-semibold text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
