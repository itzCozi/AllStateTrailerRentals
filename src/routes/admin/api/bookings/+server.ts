import { json, error } from "@sveltejs/kit";
import { deleteBookings } from "$lib/server/db";

export const DELETE = async ({ request, locals }) => {
  if (!locals.admin) throw error(401, "Unauthorized");
  let body: any;
  try {
    body = await request.json();
  } catch {
    throw error(400, "Invalid JSON body");
  }

  const idsInput = body?.ids ?? body?.id;
  let ids: number[] = [];
  if (Array.isArray(idsInput)) ids = idsInput.map((n: any) => Number(n));
  else if (idsInput != null) ids = [Number(idsInput)];

  ids = ids.filter((n) => Number.isFinite(n));
  if (ids.length === 0) throw error(400, "No valid ids provided");

  const deleted = deleteBookings(ids);
  return json({ success: true, deleted });
};
