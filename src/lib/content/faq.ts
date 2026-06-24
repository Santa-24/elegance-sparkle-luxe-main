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
    title: "Bridal & Parlour Service FAQs",
    slug: "services",
    description: "Pricing, products, and services offered by Elegance Makeover & Academy in Jajpur Road.",
    items: [
      {
        question: "What is the price of bridal makeup at Elegance Makeover in Jajpur Road?",
        answer: "Our bridal makeup packages range from ₹6000 to ₹12000. We offer premium options including HD bridal makeup, airbrush makeup, and traditional Odia bridal looks, custom-tailored by internationally certified artist Rasmirekha Swain.",
      },
      {
        question: "What makeup brands and products are used at the salon?",
        answer: "We use only professional, high-end international makeup brands such as MAC, Huda Beauty, Charlotte Tilbury, Estée Lauder, NARS, and Fenty Beauty to guarantee a flawless, skin-friendly, and photo-ready finish that lasts all day.",
      },
      {
        question: "What is the price of party makeup and special occasion styling?",
        answer: "Our professional party makeup is priced at ₹2500 per session. It is ideal for wedding guests, reception parties, engagement ceremonies, festivals like Raja, or any special occasion in Jajpur Road.",
      },
      {
        question: "What skin facials do you offer, and what are their prices?",
        answer: "We offer a range of premium facials starting from ₹500 for basic skin prep and hydration up to ₹3000 for advanced luxury glow facials, designed to give you a radiant bridal base.",
      },
      {
        question: "What hair styling and haircut services do you provide?",
        answer: "We offer professional haircuts, styling, blowouts, and advanced hair treatments. Hair styling and cuts range from ₹100 to ₹400, custom-tailored to complement your features.",
      },
    ],
  },
  {
    title: "Booking & Travel FAQs",
    slug: "booking",
    description: "Learn how to book appointments and how we handle on-venue travels.",
    items: [
      {
        question: "What is the booking process for wedding makeup in Odisha?",
        answer: "You can book your slot by filling out our online booking form or contacting us via call or WhatsApp at +91 92652 00523. We recommend booking 2 to 8 weeks in advance for peak wedding dates to secure Rasmirekha Swain's personal availability.",
      },
      {
        question: "Do you offer makeup trials before the wedding date?",
        answer: "Yes, we offer professional bridal makeup trials. Trials are highly recommended as they allow us to align your makeup, hair, and draping with your wedding attire, jewelry, and skin tone in advance.",
      },
      {
        question: "Do you provide on-venue or home services for bridal makeup in Jajpur Road?",
        answer: "Yes! We offer premium on-venue services. Our bridal makeup team can travel to wedding venues and homes across Jajpur Road, Kanheipur, Cuttack, Bhubaneswar, Bhadrak, and nearby districts of Odisha.",
      },
    ],
  },
  {
    title: "Academy & Location FAQs",
    slug: "academy-location",
    description: "Training details and directions to our academy and salon in Jajpur Road.",
    items: [
      {
        question: "What courses are offered at Elegance Makeover Academy, and what are the fees?",
        answer: "We offer professional certified makeup artist training and beauty parlour courses ranging from 1-month intensive modules to 3-month advanced certification programs. Fees are available on request based on the selected course path. Contact us directly for a customized brochure.",
      },
      {
        question: "Where is the academy located, and is it near Jajpur Road railway station?",
        answer: "Elegance Makeover & Academy is located in Jajpur Road (near the Kanheipur and Byasanagar area). Our location is highly accessible and just a short drive from the Jajpur Road railway station, making it convenient for outstation students and clients.",
      },
    ],
  },
];

export const allFaqItems = faqSections.flatMap((section) => section.items);
