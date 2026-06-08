export type ServiceArea = {
  name: string;
  summary: string;
  searchIntent: string;
  highlights: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    name: "Jajpur Road",
    summary:
      "Primary local service area and the fastest option for appointments, consultations and academy visits.",
    searchIntent: "Local bridal makeup, salon and academy support in Jajpur Road.",
    highlights: ["Quick booking support", "Walk-in friendly", "Local location familiarity"],
  },
  {
    name: "Jajpur",
    summary: "Nearby district clients often book bridal and pre-bridal services well in advance.",
    searchIntent: "Bridal makeup and beauty services for Jajpur clients.",
    highlights: ["Wedding-focused slots", "Advance consultations", "Travel-aware scheduling"],
  },
  {
    name: "Cuttack",
    summary: "Popular for brides and students traveling for premium makeup and academy training.",
    searchIntent: "Bridal makeup artist and academy options for Cuttack visitors.",
    highlights: ["Bridal trials", "Course enquiries", "Weekend planning"],
  },
  {
    name: "Bhubaneswar",
    summary: "Clients from the capital often book for weddings, receptions and academy classes.",
    searchIntent: "Luxury bridal makeup and beauty academy from Bhubaneswar.",
    highlights: ["Higher-end bridal looks", "Photography-ready finishes", "Student admissions"],
  },
  {
    name: "Bhadrak",
    summary:
      "A practical destination for brides and families looking for premium artistry in Odisha.",
    searchIntent: "Bridal makeup and parlour services for Bhadrak clients.",
    highlights: ["Family booking support", "Event-based planning", "Simple WhatsApp coordination"],
  },
  {
    name: "Nearby Odisha Regions",
    summary:
      "We also serve surrounding Odisha locations depending on timing, availability and booking size.",
    searchIntent: "Nearby bridal makeup and beauty services in Odisha.",
    highlights: ["Custom travel support", "Flexible booking windows", "Multi-service appointments"],
  },
];
