import type { Actions } from "@sveltejs/kit";
import { redirect, fail, type ServerLoad } from "@sveltejs/kit";

const COOKIE_NAME = "accepted_terms_v1";

export const actions: Actions = {
  agree: async ({ request, cookies, url }) => {
    const form = await request.formData();
    const accepted = form.get("accepted");
    const redirectTo = (form.get("redirect") as string) || "/booking";
    if (!accepted) {
      return fail(400, { error: "You must accept the terms to continue." });
    }
    cookies.set(COOKIE_NAME, "true", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 180,
      secure: url.protocol === "https:"
    });
    throw redirect(303, redirectTo);
  }
};

export const load: ServerLoad = async ({ cookies }) => {
  const alreadyAccepted = cookies.get(COOKIE_NAME) === "true";
  return { alreadyAccepted };
};
