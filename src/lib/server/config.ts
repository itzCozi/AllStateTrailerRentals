import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('database');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const keyFile = path.join(dir, 'admin_key.json');
if (!fs.existsSync(keyFile)) {
  fs.writeFileSync(keyFile, JSON.stringify({ key: '' }, null, 2), 'utf-8');
}

export function readAdminKey(): string {
  try {
    const raw = fs.readFileSync(keyFile, 'utf-8');
    const data = JSON.parse(raw);
    return typeof data?.key === 'string' ? data.key : '';
  } catch {
    return '';
  }
}
