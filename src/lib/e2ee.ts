/**
 * Avelo E2EE Crypto Module — Team Chat
 *
 * Standards implemented (BBMe-equivalent):
 * - AES-256-GCM  : Per-message symmetric encryption (FIPS 197)
 * - ECDH P-256   : On-device key exchange (256-bit equivalent security)
 * - HKDF-SHA256  : Key derivation from shared ECDH secret
 * - HMAC-SHA256  : Message integrity verification
 * - Per-message keys: Each message uses a unique random AES-256 key
 *
 * Keys are generated on-device and private keys NEVER leave the browser.
 * Supabase only stores: ciphertext, IV, HMAC, and per-recipient encrypted keys.
 */

// ─────────────────────────────────────────────
// Buffer ↔ Base64 Utilities
// ─────────────────────────────────────────────

export function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// ─────────────────────────────────────────────
// ECDH P-256 Key Pair — generated on device
// ─────────────────────────────────────────────

export async function generateKeyPair(): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveKey', 'deriveBits']
  );
}

export async function exportPublicKey(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('spki', key);
  return bufferToBase64(exported);
}

export async function importPublicKey(base64: string): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    'spki',
    base64ToBuffer(base64),
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    []
  );
}

export async function exportPrivateKey(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('pkcs8', key);
  return bufferToBase64(exported);
}

export async function importPrivateKey(base64: string): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    'pkcs8',
    base64ToBuffer(base64),
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveKey', 'deriveBits']
  );
}

// ─────────────────────────────────────────────
// Key Fingerprint — like BBM PIN, for verification
// ─────────────────────────────────────────────

export async function getKeyFingerprint(publicKey: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('spki', publicKey);
  const hash = await window.crypto.subtle.digest('SHA-256', exported);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .match(/.{4}/g)!
    .slice(0, 8)
    .join(' '); // e.g. "A3F2 9B1C 4D5E 7F8A 1234 5678 ABCD EF01"
}

// ─────────────────────────────────────────────
// ECDH + HKDF → AES-256 Wrapping Key
// ─────────────────────────────────────────────

async function deriveWrappingKey(
  privateKey: CryptoKey,
  publicKey: CryptoKey
): Promise<CryptoKey> {
  const sharedBits = await window.crypto.subtle.deriveBits(
    { name: 'ECDH', public: publicKey },
    privateKey,
    256
  );

  const hkdfKey = await window.crypto.subtle.importKey(
    'raw',
    sharedBits,
    { name: 'HKDF' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(32),
      info: new TextEncoder().encode('avelo-team-chat-v1'),
    },
    hkdfKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['wrapKey', 'unwrapKey']
  );
}

// ─────────────────────────────────────────────
// Per-Message AES-256-GCM Key
// ─────────────────────────────────────────────

export async function generateMessageKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

// ─────────────────────────────────────────────
// Encrypt message key for a recipient
// ─────────────────────────────────────────────

export async function encryptMessageKey(
  messageKey: CryptoKey,
  recipientPublicKey: CryptoKey,
  senderPrivateKey: CryptoKey
): Promise<string> {
  const wrappingKey = await deriveWrappingKey(senderPrivateKey, recipientPublicKey);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const wrapped = await window.crypto.subtle.wrapKey(
    'raw',
    messageKey,
    wrappingKey,
    { name: 'AES-GCM', iv }
  );

  const combined = new Uint8Array(12 + wrapped.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(wrapped), 12);
  return bufferToBase64(combined.buffer);
}

// ─────────────────────────────────────────────
// Decrypt message key (recipient side)
// ─────────────────────────────────────────────

export async function decryptMessageKey(
  encryptedKey: string,
  senderPublicKey: CryptoKey,
  recipientPrivateKey: CryptoKey
): Promise<CryptoKey> {
  const combined = new Uint8Array(base64ToBuffer(encryptedKey));
  const iv = combined.slice(0, 12);
  const wrapped = combined.slice(12);

  const wrappingKey = await deriveWrappingKey(recipientPrivateKey, senderPublicKey);

  return window.crypto.subtle.unwrapKey(
    'raw',
    wrapped,
    wrappingKey,
    { name: 'AES-GCM', iv },
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

// ─────────────────────────────────────────────
// Encrypt message content
// ─────────────────────────────────────────────

export async function encryptMessage(
  plaintext: string,
  messageKey: CryptoKey
): Promise<{ ciphertext: string; iv: string }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const cipherBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    messageKey,
    encoded
  );

  return {
    ciphertext: bufferToBase64(cipherBuffer),
    iv: bufferToBase64(iv.buffer),
  };
}

// ─────────────────────────────────────────────
// Decrypt message content
// ─────────────────────────────────────────────

export async function decryptMessage(
  ciphertext: string,
  iv: string,
  messageKey: CryptoKey
): Promise<string> {
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBuffer(iv) },
    messageKey,
    base64ToBuffer(ciphertext)
  );
  return new TextDecoder().decode(decrypted);
}

// ─────────────────────────────────────────────
// HMAC-SHA256 — Message Integrity (like BBMe HMAC-SHA2-256)
// ─────────────────────────────────────────────

async function deriveHmacKey(messageKey: CryptoKey): Promise<CryptoKey> {
  const exported = await window.crypto.subtle.exportKey('raw', messageKey);
  const info = new TextEncoder().encode('avelo-hmac-v1');
  const hkdfKey = await window.crypto.subtle.importKey('raw', exported, { name: 'HKDF' }, false, ['deriveKey']);
  return window.crypto.subtle.deriveKey(
    { name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(32), info },
    hkdfKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signMessage(ciphertext: string, messageKey: CryptoKey): Promise<string> {
  const hmacKey = await deriveHmacKey(messageKey);
  const data = new TextEncoder().encode(ciphertext);
  const sig = await window.crypto.subtle.sign('HMAC', hmacKey, data);
  return bufferToBase64(sig);
}

export async function verifyMessageIntegrity(
  ciphertext: string,
  hmac: string,
  messageKey: CryptoKey
): Promise<boolean> {
  try {
    const hmacKey = await deriveHmacKey(messageKey);
    const data = new TextEncoder().encode(ciphertext);
    return window.crypto.subtle.verify('HMAC', hmacKey, base64ToBuffer(hmac), data);
  } catch {
    return false;
  }
}
