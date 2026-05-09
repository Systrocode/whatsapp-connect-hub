import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  generateKeyPair, exportPublicKey, exportPrivateKey,
  importPublicKey, importPrivateKey,
  getKeyFingerprint, generateMessageKey,
  encryptMessage, decryptMessage,
  encryptMessageKey, decryptMessageKey,
  signMessage, verifyMessageIntegrity,
} from '@/lib/e2ee';
import {
  storeKeyPair, getStoredKeyPair, hasKeyPair, StoredKeyPair,
} from '@/lib/keyStorage';

// ─── Types ────────────────────────────────────────────────────

export interface ChatRoom {
  id: string;
  name: string | null;
  room_type: 'direct' | 'group';
  created_by: string;
  created_at: string;
  participants: ChatParticipant[];
  last_message?: DecryptedMessage | null;
  unread_count?: number;
}

export interface ChatParticipant {
  user_id: string;
  role: string;
  profile?: { full_name?: string; email?: string; avatar_url?: string };
}

export interface DecryptedMessage {
  id: string;
  room_id: string;
  sender_id: string;
  plaintext: string;
  message_type: string;
  reply_to: string | null;
  is_edited: boolean;
  is_deleted: boolean;
  deleted_for_all: boolean;
  is_pinned: boolean;
  created_at: string;
  edited_at: string | null;
  integrity_verified: boolean;
  status?: { [userId: string]: 'delivered' | 'read' };
  reactions?: { emoji: string; user_id: string }[];
  sender_profile?: { full_name?: string; email?: string; avatar_url?: string };
  reply_to_message?: DecryptedMessage | null;
}

export interface TypingUser {
  user_id: string;
  name: string;
}

// ─── Main Hook ───────────────────────────────────────────────

export function useE2EEChat() {
  const { user } = useAuth();
  const [keyReady, setKeyReady] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<DecryptedMessage[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Step 1: Initialize E2EE keys on first use ──────────────

  const initKeys = useCallback(async () => {
    if (!user) return;

    const stored = await getStoredKeyPair(user.id);
    if (stored) {
      const pub = await importPublicKey(stored.publicKey);
      setFingerprint(await getKeyFingerprint(pub));
      setKeyReady(true);
      return;
    }

    // Generate fresh ECDH P-256 key pair on device
    const pair = await generateKeyPair();
    const pubB64 = await exportPublicKey(pair.publicKey);
    const privB64 = await exportPrivateKey(pair.privateKey);
    const fp = await getKeyFingerprint(pair.publicKey);

    // Store private key in IndexedDB (never leaves device)
    const toStore: StoredKeyPair = {
      privateKey: privB64,
      publicKey: pubB64,
      fingerprint: fp,
      createdAt: new Date().toISOString(),
    };
    await storeKeyPair(user.id, toStore);

    // Register public key in Supabase (safe to store)
    await supabase.from('agent_public_keys').upsert({
      user_id: user.id,
      public_key: pubB64,
      fingerprint: fp,
    });

    setFingerprint(fp);
    setKeyReady(true);
  }, [user]);

  useEffect(() => { initKeys(); }, [initKeys]);

  // ─── Fetch rooms ─────────────────────────────────────────────

  const fetchRooms = useCallback(async () => {
    if (!user) return;
    setIsLoadingRooms(true);

    const { data: participations } = await supabase
      .from('team_chat_participants')
      .select('room_id')
      .eq('user_id', user.id);

    if (!participations?.length) { setIsLoadingRooms(false); return; }

    const roomIds = participations.map(p => p.room_id);

    const { data: roomsData } = await supabase
      .from('team_chat_rooms')
      .select('*')
      .in('id', roomIds)
      .order('updated_at', { ascending: false });

    if (!roomsData) { setIsLoadingRooms(false); return; }

    // Fetch participants for each room
    const { data: allParticipants } = await supabase
      .from('team_chat_participants')
      .select('room_id, user_id, role')
      .in('room_id', roomIds);

    const userIds = [...new Set(allParticipants?.map(p => p.user_id) ?? [])];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, business_name, full_name, email')
      .in('id', userIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]) ?? []);

    const enriched: ChatRoom[] = roomsData.map(room => ({
      ...room,
      room_type: room.room_type as 'direct' | 'group',
      participants: (allParticipants ?? [])
        .filter(p => p.room_id === room.id)
        .map(p => ({
          user_id: p.user_id,
          role: p.role,
          profile: profileMap.get(p.user_id) as ChatParticipant['profile'],
        })),
    }));

    setRooms(enriched);
    setIsLoadingRooms(false);
  }, [user]);

  useEffect(() => { fetchRooms(); }, [fetchRooms]);

  // ─── Decrypt a single raw message ────────────────────────────

  const decryptOne = useCallback(async (raw: any): Promise<DecryptedMessage | null> => {
    if (!user) return null;
    try {
      if (raw.deleted_for_all) {
        return { ...raw, plaintext: '🔒 This message was deleted', integrity_verified: false };
      }

      const stored = await getStoredKeyPair(user.id);
      if (!stored) return null;

      const { data: keyRow } = await supabase
        .from('team_chat_message_keys')
        .select('encrypted_key')
        .eq('message_id', raw.id)
        .eq('recipient_id', user.id)
        .single();

      if (!keyRow) return { ...raw, plaintext: '[Encrypted — key not found]', integrity_verified: false };

      const { data: senderKeyRow } = await supabase
        .from('agent_public_keys')
        .select('public_key')
        .eq('user_id', raw.sender_id)
        .single();

      if (!senderKeyRow) return { ...raw, plaintext: '[Sender key missing]', integrity_verified: false };

      const privKey = await importPrivateKey(stored.privateKey);
      const senderPubKey = await importPublicKey(senderKeyRow.public_key);
      const msgKey = await decryptMessageKey(keyRow.encrypted_key, senderPubKey, privKey);
      const plaintext = await decryptMessage(raw.ciphertext, raw.iv, msgKey);
      const integrity_verified = await verifyMessageIntegrity(raw.ciphertext, raw.hmac, msgKey);

      return { ...raw, plaintext, integrity_verified };
    } catch {
      return { ...raw, plaintext: '[Decryption failed]', integrity_verified: false };
    }
  }, [user]);

  // ─── Load messages for a room ────────────────────────────────

  const loadMessages = useCallback(async (room: ChatRoom) => {
    setActiveRoom(room);
    setIsLoadingMessages(true);

    const { data: raw } = await supabase
      .from('team_chat_messages')
      .select('*')
      .eq('room_id', room.id)
      .eq('deleted_for_all', false)
      .order('created_at', { ascending: true })
      .limit(100);

    if (!raw) { setIsLoadingMessages(false); return; }

    const decrypted = await Promise.all(raw.map(decryptOne));
    setMessages(decrypted.filter(Boolean) as DecryptedMessage[]);

    // Mark all as read
    const unread = raw.filter(m => m.sender_id !== user?.id);
    if (unread.length && user) {
      await supabase.from('team_chat_message_status').upsert(
        unread.map(m => ({ message_id: m.id, user_id: user.id, status: 'read', updated_at: new Date().toISOString() })),
        { onConflict: 'message_id,user_id' }
      );
    }

    setIsLoadingMessages(false);
  }, [decryptOne, user]);

  // ─── Send encrypted message ───────────────────────────────────

  const sendMessage = useCallback(async (
    roomId: string,
    plaintext: string,
    replyToId?: string,
    messageType = 'text'
  ): Promise<boolean> => {
    if (!user || !keyReady) return false;

    const stored = await getStoredKeyPair(user.id);
    if (!stored) return false;

    // Get all participants' public keys
    const { data: participants } = await supabase
      .from('team_chat_participants')
      .select('user_id')
      .eq('room_id', roomId);

    if (!participants?.length) return false;

    const { data: pubKeys } = await supabase
      .from('agent_public_keys')
      .select('user_id, public_key')
      .in('user_id', participants.map(p => p.user_id));

    if (!pubKeys?.length) return false;

    // Generate per-message AES-256-GCM key
    const msgKey = await generateMessageKey();
    const { ciphertext, iv } = await encryptMessage(plaintext, msgKey);
    const hmac = await signMessage(ciphertext, msgKey);

    // Insert message
    const { data: msgRow, error } = await supabase
      .from('team_chat_messages')
      .insert({
        room_id: roomId,
        sender_id: user.id,
        ciphertext,
        iv,
        hmac,
        message_type: messageType,
        reply_to: replyToId ?? null,
      })
      .select()
      .single();

    if (error || !msgRow) return false;

    // Encrypt message key for each participant (including self)
    const senderPrivKey = await importPrivateKey(stored.privateKey);

    const keyInserts = await Promise.all(
      pubKeys.map(async (pk) => {
        const recipientPubKey = await importPublicKey(pk.public_key);
        const encKey = await encryptMessageKey(msgKey, recipientPubKey, senderPrivKey);
        return { message_id: msgRow.id, recipient_id: pk.user_id, encrypted_key: encKey };
      })
    );

    await supabase.from('team_chat_message_keys').insert(keyInserts);

    // Update room's updated_at
    await supabase.from('team_chat_rooms').update({ updated_at: new Date().toISOString() }).eq('id', roomId);

    return true;
  }, [user, keyReady]);

  // ─── Realtime subscription ────────────────────────────────────

  useEffect(() => {
    if (!activeRoom || !user) return;

    const channel = supabase
      .channel(`room:${activeRoom.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'team_chat_messages',
        filter: `room_id=eq.${activeRoom.id}`,
      }, async (payload) => {
        const decrypted = await decryptOne(payload.new);
        if (decrypted) setMessages(prev => [...prev, decrypted]);
        // Mark delivered
        if (payload.new.sender_id !== user.id) {
          await supabase.from('team_chat_message_status').upsert({
            message_id: payload.new.id, user_id: user.id, status: 'delivered', updated_at: new Date().toISOString(),
          }, { onConflict: 'message_id,user_id' });
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'team_chat_messages',
        filter: `room_id=eq.${activeRoom.id}`,
      }, async (payload) => {
        const decrypted = await decryptOne(payload.new);
        if (decrypted) setMessages(prev => prev.map(m => m.id === decrypted.id ? decrypted : m));
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'team_chat_typing',
        filter: `room_id=eq.${activeRoom.id}`,
      }, () => {
        fetchTypingUsers(activeRoom.id);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeRoom, user, decryptOne]);

  // ─── Typing indicator ─────────────────────────────────────────

  const fetchTypingUsers = async (roomId: string) => {
    const since = new Date(Date.now() - 5000).toISOString();
    const { data } = await supabase
      .from('team_chat_typing')
      .select('user_id')
      .eq('room_id', roomId)
      .gt('updated_at', since)
      .neq('user_id', user?.id ?? '');

    setTypingUsers((data ?? []).map(t => ({ user_id: t.user_id, name: 'Agent' })));
  };

  const sendTyping = useCallback(async (roomId: string) => {
    if (!user) return;
    await supabase.rpc('upsert_typing', { p_room_id: roomId, p_user_id: user.id });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      supabase.from('team_chat_typing').delete()
        .eq('room_id', roomId).eq('user_id', user.id);
    }, 5000);
  }, [user]);

  // ─── Start DM ─────────────────────────────────────────────────

  const startDM = useCallback(async (targetUserId: string): Promise<string | null> => {
    if (!user) return null;
    const { data } = await supabase.rpc('find_or_create_dm', {
      p_user_a: user.id,
      p_user_b: targetUserId,
    });
    await fetchRooms();
    return data as string | null;
  }, [user, fetchRooms]);

  // ─── Create group ─────────────────────────────────────────────

  const createGroup = useCallback(async (name: string, memberIds: string[]): Promise<string | null> => {
    if (!user) return null;
    const { data: room } = await supabase
      .from('team_chat_rooms')
      .insert({ name, room_type: 'group', created_by: user.id })
      .select()
      .single();

    if (!room) return null;

    const allMembers = [...new Set([user.id, ...memberIds])];
    await supabase.from('team_chat_participants').insert(
      allMembers.map((uid, i) => ({ room_id: room.id, user_id: uid, role: i === 0 ? 'admin' : 'member' }))
    );

    await fetchRooms();
    return room.id;
  }, [user, fetchRooms]);

  // ─── React to message ─────────────────────────────────────────

  const reactToMessage = useCallback(async (messageId: string, emoji: string) => {
    if (!user) return;
    const { data: existing } = await supabase
      .from('team_chat_reactions')
      .select('id')
      .eq('message_id', messageId)
      .eq('user_id', user.id)
      .eq('emoji', emoji)
      .single();

    if (existing) {
      await supabase.from('team_chat_reactions').delete().eq('id', existing.id);
    } else {
      await supabase.from('team_chat_reactions').insert({ message_id: messageId, user_id: user.id, emoji });
    }
  }, [user]);

  // ─── Delete message ───────────────────────────────────────────

  const deleteMessage = useCallback(async (messageId: string, forEveryone = false) => {
    if (!user) return;
    if (forEveryone) {
      await supabase.from('team_chat_messages').update({ deleted_for_all: true, ciphertext: '', iv: '', hmac: '' }).eq('id', messageId);
    } else {
      await supabase.from('team_chat_messages').update({ is_deleted: true }).eq('id', messageId).eq('sender_id', user.id);
    }
    setMessages(prev => prev.filter(m => m.id !== messageId));
  }, [user]);

  // ─── Pin message ──────────────────────────────────────────────

  const pinMessage = useCallback(async (messageId: string, pin: boolean) => {
    await supabase.from('team_chat_messages').update({ is_pinned: pin }).eq('id', messageId);
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, is_pinned: pin } : m));
  }, []);

  return {
    keyReady,
    fingerprint,
    rooms,
    messages,
    activeRoom,
    typingUsers,
    isLoadingRooms,
    isLoadingMessages,
    setActiveRoom,
    loadMessages,
    sendMessage,
    sendTyping,
    startDM,
    createGroup,
    reactToMessage,
    deleteMessage,
    pinMessage,
    refreshRooms: fetchRooms,
  };
}
