import type { LayoutServerLoad } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ url }) => {
  const origin = url.origin;
  const path = url.pathname + url.search;
  const canonical = origin + url.pathname;

  const defaults = {
    title: "Trailer Rentals in NC & SC | All State Trailer Rentals",
    description:
      "Dump trailers, car haulers, and RV rentals serving NC and SC. Easy online booking.",
  };

  return {
    siteName: "All State Trailer Rentals",
    origin,
    path,
    canonical,
    seo: defaults,
  };
};
