export type TrailerVariant = {
  label: string;
  name: string;
  images: string[];
  specs: Record<string, string | number>;
  notes?: string[];
};

export const vehicleImages: Record<string, string[]> = {
  dump: ["/DUMP1.jpg", "/DUMP2.jpg"],
  carHauler: ["/CAR1.jpg", "/CAR2.jpg"],
  rv: [
    "/RV1.jpg",
    "/RV2.jpg",
    "/RV3.jpg",
    "/RV4.jpg",
    "/RV5.jpg",
    "/RV6.jpg",
    "/RV7.jpg",
    "/RV8.jpg",
    "/RV9.jpg",
    "/RV10.jpg",
    "/RV11.jpg",
    "/RV12.jpg",
    "/RV13.jpg",
    "/RV14.jpg",
    "/RV15.jpg",
    "/RV16.jpg",
    "/RV17.jpg",
    "/RV18.jpg",
    "/RV19.jpg",
  ],
};

export const rvVariants: TrailerVariant[] = [
  {
    label: "RV 1",
    name: "Surveyor Sport Eco-Lite",
    images: vehicleImages.rv,
    specs: {
      "Make/Model": "Surveyor Sport Eco-Lite",
      Sleeps: "Up to 4-6",
      "Dry Weight": "4,000–4,500 lbs (approx)",
      "Hitch Weight": "450–600 lbs",
      Length: "20–24 ft",
      Power: "30A shore power, battery",
    },
    notes: [
      "Includes basic kitchen, A/C, and heat.",
      "Great for state parks and weekend trips.",
    ],
  },
  {
    label: "RV 2",
    name: "Jayco Jay Flight (Example)",
    images: ["/RV2-1.jpg", "/RV2-2.jpg", "/RV2-3.jpg", "/RV2-4.jpg"],
    specs: {
      "Make/Model": "Jayco Jay Flight (Example)",
      Sleeps: "Up to 6-8",
      "Dry Weight": "4,800–5,500 lbs (approx)",
      "Hitch Weight": "550–750 lbs",
      Length: "22–27 ft",
      Power: "30A shore power, battery, solar prep",
    },
    notes: [
      "Upgraded interior with larger dinette and bunks.",
      "Outdoor shower and power awning.",
    ],
  },
];
