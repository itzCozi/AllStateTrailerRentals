import { redirect, type ServerLoad } from "@sveltejs/kit";

const COOKIE_NAME = "accepted_terms_v1";

export const load: ServerLoad = async ({ cookies, url }) => {
  const accepted = cookies.get(COOKIE_NAME) === "true";
  if (!accepted) {
    // redirect user to accept terms, preserve intent
    const to = "/terms?redirect=" + encodeURIComponent(url.pathname + url.search);
    throw redirect(303, to);
  }
  return {};
};
