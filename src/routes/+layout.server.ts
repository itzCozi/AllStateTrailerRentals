import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
  const origin = url.origin;
  const path = url.pathname + url.search;
  const canonical = origin + url.pathname;

  const defaults = {
    title: "Trailer Rentals in NC & SC | AllState Trailer Rentals",
    description:
      "Dump trailers, car haulers, and RV rentals serving North Carolina and South Carolina. Easy online booking.",
  };

  return {
    siteName: "AllState Trailer Rentals",
    origin,
    path,
    canonical,
    seo: defaults,
  };
};
