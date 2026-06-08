// ============================================
// SERVICES DATA - Consolidated & Modular
// ============================================

import type { Service, BridalPackage } from "./types";

// Frontend services display data
export const services: Service[] = [
  {
    title: "Bridal Makeup",
    desc: "Refined bridal artistry with long-wear finish, seamless base work, hair styling and elegant draping for your wedding day.",
    price: "₹6,000 - ₹12,000",
    duration: "3 - 4 hrs",
    icon: "Crown",
    category: "Bridal",
    featured: true,
  },
  {
    title: "Party Makeup",
    desc: "Soft glam and statement looks for engagements, receptions and special events with a clean HD finish.",
    price: "₹2,500",
    duration: "60 min",
    icon: "Sparkles",
    category: "Parlour",
  },
  {
    title: "Premium Facial",
    desc: "Targeted skin treatments and glow-boosting facials designed to prep, refresh and brighten before big occasions.",
    price: "₹500 - ₹3,000",
    duration: "45 - 90 min",
    icon: "Heart",
    category: "Parlour",
  },
  {
    title: "Hair Styling & Cut",
    desc: "Elegant cuts, bridal updos, texture styling and finishing treatments tailored to your look and face shape.",
    price: "₹100 - ₹400",
    duration: "30 - 60 min",
    icon: "Scissors",
    category: "Parlour",
  },
  {
    title: "Threading & Brows",
    desc: "Precise brow shaping, threading and clean-up services for a polished frame and camera-ready finish.",
    price: "₹50 - ₹200",
    duration: "15 min",
    icon: "Wand2",
    category: "Parlour",
  },
  {
    title: "Academy Courses",
    desc: "Hands-on beauty and makeup training with beginner, advanced and bridal-focused modules for aspiring artists.",
    price: "On request",
    duration: "1 - 6 months",
    icon: "GraduationCap",
    category: "Academy",
  },
];

// Bridal packages
export const bridalPackages: BridalPackage[] = [
  {
    name: "Classic Bride",
    price: 6000,
    popular: false,
    features: [
      "Signature bridal makeup",
      "Polished hair styling",
      "3-hour appointment window",
      "Basic touch-up support",
      "One attendant consultation",
    ],
  },
  {
    name: "Royal Bride",
    price: 8000,
    popular: true,
    features: [
      "Premium bridal makeup",
      "Luxury hair design and draping",
      "4-hour appointment window",
      "2 complimentary touch-ups",
      "Bride's mother makeup included",
      "Trial session included",
    ],
  },
  {
    name: "Maharani Bride",
    price: 12000,
    popular: false,
    features: [
      "Haute couture bridal makeup",
      "Editorial hair styling",
      "4+ hour appointment window",
      "Unlimited touch-up support",
      "Family member makeup",
      "Dress consultation",
      "Pre-wedding shoot coordination",
    ],
  },
];

export const getServicesByCategory = (category: string) => {
  return services.filter((svc) => svc.category === category);
};

export const getFeaturedServices = () => {
  return services.filter((svc) => svc.featured);
};
