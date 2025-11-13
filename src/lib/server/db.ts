import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("database");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const file = path.join(dir, "bookings.json");
if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf-8");

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  variant?: string;
  date: string;
  time: string;
  notes?: string;
  created_at: string;
};

function readAll(): Booking[] {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data) as Booking[];
  } catch {
    return [];
  }
}

function writeAll(list: Booking[]) {
  fs.writeFileSync(file, JSON.stringify(list, null, 2), "utf-8");
}

export function addBooking(b: {
  name: string;
  email: string;
  phone: string;
  type: "dump" | "car-hauler" | "rv";
  date: string;
  time: string;
  notes?: string;
  variant?: string;
}) {
  const list = readAll();
  const id = list.length ? list[list.length - 1].id + 1 : 1;
  const booking: Booking = { id, ...b, created_at: new Date().toISOString() };
  list.push(booking);
  writeAll(list);
  return id;
}

export function getBookings(): Booking[] {
  return readAll();
}

export type { Booking };

export function deleteBooking(id: number): number {
  return deleteBookings([id]);
}

export function deleteBookings(ids: number[]): number {
  const set = new Set(ids.map((n) => Number(n)).filter((n) => Number.isFinite(n)));
  if (set.size === 0) return 0;
  const list = readAll();
  const filtered = list.filter((b) => !set.has(b.id));
  writeAll(filtered);
  return list.length - filtered.length;
}
