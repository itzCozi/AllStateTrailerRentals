import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete('admin_session', { path: '/' });
  return new Response(null, { status: 303, headers: { Location: '/admin' } });
};
