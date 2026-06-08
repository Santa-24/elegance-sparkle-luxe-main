export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  slug: string;
  description: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    title: "Booking FAQs",
    slug: "booking",
    description: "Everything you need to know before confirming a bridal or salon appointment.",
    items: [
      {
        question: "How far in advance should I book bridal makeup?",
        answer:
          "For peak wedding dates, we recommend booking 2 to 8 weeks in advance. If your event is sooner, send a WhatsApp message and we’ll confirm the earliest available slot.",
      },
      {
        question: "Do you offer consultation before the final booking?",
        answer:
          "Yes. We can guide you on look selection, timing and service combinations before you pay or commit to the final appointment.",
      },
      {
        question: "Can I book multiple services together?",
        answer:
          "Absolutely. Bridal makeup, hair styling, draping, facial and prep services can be combined into one booking so the appointment stays organized.",
      },
      {
        question: "What should I bring to my booking?",
        answer:
          "Bring your outfit references, jewelry inspiration, and any skin or allergy notes. That helps us tailor the look and products to you.",
      },
    ],
  },
  {
    title: "Service FAQs",
    slug: "services",
    description: "Helpful answers about bridal, parlour and academy offerings.",
    items: [
      {
        question: "What services are most popular for brides?",
        answer:
          "The most requested bridal combinations are makeup, hair styling, draping and light touch-up support. We also handle engagement and reception looks.",
      },
      {
        question: "Are premium products used for all services?",
        answer:
          "Yes. We focus on premium, skin-friendly products and technique-first application to keep the finish refined, durable and photo-ready.",
      },
      {
        question: "Do you offer academy classes for beginners?",
        answer:
          "Yes. We offer beginner-friendly and advanced training paths with practical classroom work, demonstrations and portfolio guidance.",
      },
      {
        question: "Can I get help choosing the right service?",
        answer:
          "Of course. Share your event type, budget and timing, and we’ll suggest the most suitable service combination for your needs.",
      },
    ],
  },
  {
    title: "Local FAQs",
    slug: "local",
    description: "Location and travel questions for clients visiting from nearby towns.",
    items: [
      {
        question: "Do you serve clients from Cuttack and Bhubaneswar?",
        answer:
          "Yes. We regularly work with clients from Cuttack, Bhubaneswar, Bhadrak, Jajpur and nearby Odisha regions, especially for weddings and academy enquiries.",
      },
      {
        question: "Is the salon easy to reach from Jajpur Road?",
        answer:
          "Yes. We’re based in Jajpur Road and serve local walk-ins as well as advance bookings from surrounding areas.",
      },
      {
        question: "Do you share location details before the appointment?",
        answer:
          "Yes. Once your booking is confirmed, we can share the location and any arrival guidance by call or WhatsApp.",
      },
      {
        question: "Can outstation clients contact you online first?",
        answer:
          "Definitely. Most outstation clients start on WhatsApp or phone, then confirm the service once timing and travel needs are clear.",
      },
    ],
  },
];

export const allFaqItems = faqSections.flatMap((section) => section.items);
