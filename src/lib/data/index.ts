// ============================================
// DATA BARREL EXPORT - Modular & Scalable
// ============================================

// Types
export type { Service, BridalPackage, GalleryImage, Testimonial, Offer } from "./types";

// Gallery Data
export { galleryImages, getGalleryByCategory } from "./gallery";
export { testimonials } from "./testimonials";
export { offers } from "./offers";

// Services Data
export { services, bridalPackages, getServicesByCategory, getFeaturedServices } from "./services";
