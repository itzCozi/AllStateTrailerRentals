import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Simple file-based admin storage similar to bookings
const dir = path.resolve('database');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const adminFile = path.join(dir, 'admin.json');
if (!fs.existsSync(adminFile)) fs.writeFileSync(adminFile, '[]', 'utf-8');

export type AdminUser = {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
  // key used for registration is not stored after validation
};

function readAdmins(): AdminUser[] {
  try {
    return JSON.parse(fs.readFileSync(adminFile, 'utf-8')) as AdminUser[];
  } catch {
    return [];
  }
}

function writeAdmins(list: AdminUser[]) {
  fs.writeFileSync(adminFile, JSON.stringify(list, null, 2), 'utf-8');
}

// In-memory session store: { token -> adminId }
const sessions = new Map<string, number>();

export function hashPassword(pw: string): string {
  // Use PBKDF2 for a bit more security without external deps
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pw, salt, 100_000, 32, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const check = crypto.pbkdf2Sync(pw, salt, 100_000, 32, 'sha256').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

export function registerAdmin(email: string, password: string, registrationKey: string, validKey: string) {
  if (registrationKey !== validKey) throw new Error('Invalid registration key');
  const admins = readAdmins();
  if (admins.some(a => a.email.toLowerCase() === email.toLowerCase())) throw new Error('Email already registered');
  const id = admins.length ? admins[admins.length - 1].id + 1 : 1;
  const password_hash = hashPassword(password);
  const admin: AdminUser = { id, email, password_hash, created_at: new Date().toISOString() };
  admins.push(admin);
  writeAdmins(admins);
  return id;
}

export function loginAdmin(email: string, password: string): string | null {
  const admins = readAdmins();
  const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) return null;
  if (!verifyPassword(password, admin.password_hash)) return null;
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, admin.id);
  return token;
}

export function getSession(token: string | undefined): AdminUser | null {
  if (!token) return null;
  const adminId = sessions.get(token);
  if (!adminId) return null;
  const admins = readAdmins();
  return admins.find(a => a.id === adminId) || null;
}

export function logoutSession(token: string) {
  sessions.delete(token);
}

// Utility for tests/debug
export function listAdmins(): AdminUser[] { return readAdmins(); }

export function resetAdminPassword(email: string, newPassword: string, providedKey: string, validKey: string) {
  if (providedKey !== validKey) throw new Error('Invalid key');
  const admins = readAdmins();
  const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) throw new Error('Account not found');
  admin.password_hash = hashPassword(newPassword);
  writeAdmins(admins);
  return true;
}