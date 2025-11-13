import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";
import { addBooking } from "$lib/server/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  type: z.enum(["dump", "car-hauler", "rv"]),
  variant: z.string().optional(),
  date: z.string().min(8),
  time: z.string().min(4),
  notes: z.string().optional().default(""),
});

const COOKIE_NAME = "accepted_terms_v1";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const accepted = cookies.get(COOKIE_NAME) === "true";
  if (!accepted) {
    return new Response(
      JSON.stringify({ error: "You must accept the terms before reserving." }),
      {
        status: 403,
      },
    );
  }
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
      variant?: string;
    };
    const [y, m, d] = data.date.split("-").map((s) => parseInt(s, 10));
    const [hh, mm] = data.time.split(":").map((s) => parseInt(s, 10));
    if (
      !Number.isFinite(y) ||
      !Number.isFinite(m) ||
      !Number.isFinite(d) ||
      !Number.isFinite(hh) ||
      !Number.isFinite(mm)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid date or time format." }),
        { status: 400 },
      );
    }
    const selectedDate = new Date(y, m - 1, d);
    const now = new Date();
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    if (!(selectedDate.getTime() > todayMidnight.getTime())) {
      return new Response(
        JSON.stringify({
          error: "Please choose a pickup date that is after today.",
        }),
        { status: 400 },
      );
    }
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
