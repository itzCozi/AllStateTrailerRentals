import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    seo: {
      title: "Reservation Confirmed | AllState Trailer Rentals",
      description: "Thanks for booking. Your trailer reservation is confirmed.",
    },
  };
};
