-- ============================================================
-- Avelo Team Chat — E2EE Schema
-- BBMe-equivalent encryption: AES-256-GCM + ECDH P-256 + HMAC-SHA256
-- ============================================================

-- 1. Agent E2EE public keys (private keys never stored here)
CREATE TABLE IF NOT EXISTS public.agent_public_keys (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  public_key    TEXT NOT NULL,       -- base64 SPKI ECDH P-256 public key
  fingerprint   TEXT NOT NULL,       -- SHA-256 fingerprint for verification
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Chat rooms (DMs and group chats)
CREATE TABLE IF NOT EXISTS public.team_chat_rooms (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT,                  -- NULL for DMs, set for group chats
  room_type   TEXT CHECK (room_type IN ('direct', 'group')) DEFAULT 'direct',
  avatar_url  TEXT,
  created_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Room participants
CREATE TABLE IF NOT EXISTS public.team_chat_participants (
  room_id   UUID REFERENCES public.team_chat_rooms(id) ON DELETE CASCADE,
  user_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role      TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);

-- 4. Encrypted messages
CREATE TABLE IF NOT EXISTS public.team_chat_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id         UUID REFERENCES public.team_chat_rooms(id) ON DELETE CASCADE NOT NULL,
  sender_id       UUID REFERENCES auth.users(id) NOT NULL,
  ciphertext      TEXT NOT NULL,         -- AES-256-GCM encrypted content
  iv              TEXT NOT NULL,         -- GCM initialization vector (base64)
  hmac            TEXT NOT NULL,         -- HMAC-SHA256 integrity tag (base64)
  message_type    TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'reaction', 'system')),
  reply_to        UUID REFERENCES public.team_chat_messages(id),
  is_edited       BOOLEAN DEFAULT FALSE,
  is_deleted      BOOLEAN DEFAULT FALSE,     -- soft delete for sender
  deleted_for_all BOOLEAN DEFAULT FALSE,     -- delete for everyone
  is_pinned       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  edited_at       TIMESTAMPTZ
);

-- 5. Per-recipient encrypted message keys
--    Each message key is encrypted with ECDH-derived secret for each participant
CREATE TABLE IF NOT EXISTS public.team_chat_message_keys (
  message_id    UUID REFERENCES public.team_chat_messages(id) ON DELETE CASCADE,
  recipient_id  UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_key TEXT NOT NULL,   -- AES key wrapped with ECDH shared secret
  PRIMARY KEY (message_id, recipient_id)
);

-- 6. Message delivery/read receipts (BBM D/R status)
CREATE TABLE IF NOT EXISTS public.team_chat_message_status (
  message_id  UUID REFERENCES public.team_chat_messages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status      TEXT CHECK (status IN ('delivered', 'read')) NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (message_id, user_id)
);

-- 7. Message reactions (emoji, like BBM)
CREATE TABLE IF NOT EXISTS public.team_chat_reactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id  UUID REFERENCES public.team_chat_messages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (message_id, user_id, emoji)
);

-- 8. Typing indicators (ephemeral)
CREATE TABLE IF NOT EXISTS public.team_chat_typing (
  room_id     UUID REFERENCES public.team_chat_rooms(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);

-- ─── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_team_chat_messages_room ON public.team_chat_messages(room_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_chat_msg_keys_recipient ON public.team_chat_message_keys(recipient_id);
CREATE INDEX IF NOT EXISTS idx_team_chat_participants_user ON public.team_chat_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_team_chat_status_user ON public.team_chat_message_status(user_id);

-- ─── RLS ────────────────────────────────────────────────────
ALTER TABLE public.agent_public_keys     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_rooms       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_messages    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_message_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_message_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_reactions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_chat_typing      ENABLE ROW LEVEL SECURITY;

-- Public keys: any authenticated user can read (needed for encryption), only owner can write
CREATE POLICY "Anyone can read public keys" ON public.agent_public_keys FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own public key" ON public.agent_public_keys FOR ALL USING (auth.uid() = user_id);

-- Rooms: participants can see their rooms
CREATE POLICY "Participants view rooms" ON public.team_chat_rooms FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_chat_participants WHERE room_id = id AND user_id = auth.uid()));
CREATE POLICY "Authenticated create rooms" ON public.team_chat_rooms FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Participants: visible to room members
CREATE POLICY "Room members see participants" ON public.team_chat_participants FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_chat_participants p2 WHERE p2.room_id = room_id AND p2.user_id = auth.uid()));
CREATE POLICY "Participants can join rooms" ON public.team_chat_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages: only room participants
CREATE POLICY "Participants read messages" ON public.team_chat_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_chat_participants WHERE room_id = team_chat_messages.room_id AND user_id = auth.uid()));
CREATE POLICY "Participants send messages" ON public.team_chat_messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id AND EXISTS (SELECT 1 FROM public.team_chat_participants WHERE room_id = team_chat_messages.room_id AND user_id = auth.uid()));
CREATE POLICY "Sender edits own messages" ON public.team_chat_messages FOR UPDATE USING (auth.uid() = sender_id);

-- Message keys: only the intended recipient
CREATE POLICY "Recipients access own keys" ON public.team_chat_message_keys FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Senders insert message keys" ON public.team_chat_message_keys FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.team_chat_messages m JOIN public.team_chat_participants p ON p.room_id = m.room_id
          WHERE m.id = message_id AND p.user_id = auth.uid()));

-- Status: participants manage receipts
CREATE POLICY "Users manage own status" ON public.team_chat_message_status FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Senders read message status" ON public.team_chat_message_status FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_chat_messages m WHERE m.id = message_id AND m.sender_id = auth.uid()));

-- Reactions: room participants
CREATE POLICY "Participants react" ON public.team_chat_reactions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.team_chat_messages m JOIN public.team_chat_participants p ON p.room_id = m.room_id
                 WHERE m.id = message_id AND p.user_id = auth.uid()));

-- Typing: room participants
CREATE POLICY "Participants see typing" ON public.team_chat_typing FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_chat_participants WHERE room_id = team_chat_typing.room_id AND user_id = auth.uid()));
CREATE POLICY "Participants set typing" ON public.team_chat_typing FOR ALL USING (auth.uid() = user_id);

-- ─── Helper: upsert typing indicator ────────────────────────
CREATE OR REPLACE FUNCTION public.upsert_typing(p_room_id UUID, p_user_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  INSERT INTO public.team_chat_typing (room_id, user_id, updated_at)
  VALUES (p_room_id, p_user_id, NOW())
  ON CONFLICT (room_id, user_id) DO UPDATE SET updated_at = NOW();
$$;

-- ─── Helper: find or create DM room ─────────────────────────
CREATE OR REPLACE FUNCTION public.find_or_create_dm(p_user_a UUID, p_user_b UUID)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_room_id UUID;
BEGIN
  -- Find existing DM between the two users
  SELECT r.id INTO v_room_id
  FROM public.team_chat_rooms r
  JOIN public.team_chat_participants pa ON pa.room_id = r.id AND pa.user_id = p_user_a
  JOIN public.team_chat_participants pb ON pb.room_id = r.id AND pb.user_id = p_user_b
  WHERE r.room_type = 'direct'
  LIMIT 1;

  IF v_room_id IS NULL THEN
    INSERT INTO public.team_chat_rooms (room_type, created_by)
    VALUES ('direct', p_user_a)
    RETURNING id INTO v_room_id;

    INSERT INTO public.team_chat_participants (room_id, user_id, role)
    VALUES (v_room_id, p_user_a, 'admin'), (v_room_id, p_user_b, 'member');
  END IF;

  RETURN v_room_id;
END;
$$;
