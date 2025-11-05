import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";
import { addBooking } from "$lib/server/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  type: z.enum(["dump", "car-hauler", "rv"]),
  date: z.string().min(8),
  time: z.string().min(4),
  notes: z.string().optional().default(""),
});

export const POST: RequestHandler = async ({ request }) => {
  const json = await request.json().catch(() => null);
  if (!json)
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  try {
    const data = schema.parse(json) as {
      name: string;
      email: string;
      phone: string;
      type: "dump" | "car-hauler" | "rv";
      date: string;
      time: string;
      notes: string;
    };
    const id = addBooking(data);
    return new Response(JSON.stringify({ id }), { status: 201 });
  } catch (e: any) {
    if (e?.issues) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: e.issues }),
        { status: 400 },
      );
    }
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to save booking" }), {
      status: 500,
    });
  }
};
