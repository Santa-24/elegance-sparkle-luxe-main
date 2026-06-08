// ============================================
// TYPES - Data Models
// ============================================

export type Service = {
  title: string;
  desc: string;
  price: string;
  duration: string;
  icon: "Crown" | "Sparkles" | "Heart" | "Scissors" | "Wand2" | "GraduationCap";
  category: "Bridal" | "Parlour" | "Academy";
  featured?: boolean;
};

export type BridalPackage = {
  name: string;
  price: number;
  popular: boolean;
  features: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  cat: "Bridal" | "Parlour" | "Before & After" | "Academy";
};

export type Testimonial = {
  name: string;
  rating: number;
  text: string;
  service: string;
};

export type Offer = {
  title: string;
  discount: string;
  desc: string;
  validity: string;
};
