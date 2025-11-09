import { redirect, type ServerLoad } from '@sveltejs/kit';
import { getBookings } from '$lib/server/db';

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.admin) {
    throw redirect(302, '/admin');
  }
  const bookings = getBookings();
  return { admin: locals.admin, bookings };
};
