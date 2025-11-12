import type { Handle } from "@sveltejs/kit";
import { getSession } from "$lib/server/admin";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("admin_session");
  const admin = getSession(token);
  event.locals.admin = admin ? { id: admin.id, email: admin.email } : null;
  return resolve(event);
};
