import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    seo: {
      title: "Trailer Rentals in North & SC | AllState Trailer Rentals",
      description:
        "Rent dump trailers, car haulers, and RVs across NC & SC. Fast online booking and friendly local service.",
    },
  };
};
