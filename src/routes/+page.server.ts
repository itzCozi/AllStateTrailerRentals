import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
  return {
    seo: {
      title:
        "Trailer Rentals in North & SC | All State Trailer Rentals",
      description:
        "Rent dump trailers, car haulers, and RVs across NC & SC. Fast online booking and friendly local service.",
    },
  };
};
