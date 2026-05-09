/**
 * IndexedDB Key Storage — Private keys NEVER leave this device
 * Implements on-device key model like BBMe
 */

const DB_NAME = 'avelo-e2ee';
const DB_VERSION = 1;
const STORE = 'keypairs';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export interface StoredKeyPair {
  privateKey: string; // base64 pkcs8
  publicKey: string;  // base64 spki
  fingerprint: string;
  createdAt: string;
}

export async function storeKeyPair(userId: string, pair: StoredKeyPair): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(pair, userId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getStoredKeyPair(userId: string): Promise<StoredKeyPair | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(userId);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function hasKeyPair(userId: string): Promise<boolean> {
  const pair = await getStoredKeyPair(userId);
  return pair !== null;
}

export async function clearKeyPair(userId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(userId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
