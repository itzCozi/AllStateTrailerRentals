import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
  return {
    seo: {
      title: "Reservation Confirmed | All State Trailer Rentals",
      description: "Thanks for booking. Your trailer reservation is confirmed.",
    },
  };
};
