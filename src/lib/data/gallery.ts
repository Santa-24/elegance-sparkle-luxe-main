// ============================================
// GALLERY DATA - Consolidated & Modular
// ============================================

// Frontend gallery display data
export const galleryImages: GalleryImage[] = [
  { src: "/assets/bridal-1.webp", alt: "Editorial bridal look with traditional Odia styling", cat: "Bridal" },
  { src: "/assets/bridal-2.webp", alt: "Soft bridal portrait with elegant maang tikka finish", cat: "Bridal" },
  { src: "/assets/bridal-5.webp", alt: "Classic bridal moment in rich red veil and luminous skin", cat: "Bridal" },
  { src: "/assets/bridal-3.webp", alt: "Fresh pink bridal look with delicate detailing", cat: "Bridal" },
  { src: "/assets/bridal-6.webp", alt: "Side profile bridal makeup with polished contour and glow", cat: "Bridal" },
  { src: "/assets/bridal-7.webp", alt: "Traditional bridal styling with statement jewelry", cat: "Bridal" },
  { src: "/assets/bridal-8.webp", alt: "Soft glam bridal portrait with balanced tones", cat: "Bridal" },
  { src: "/assets/bridal-9.webp", alt: "Warm-toned bridal look with refined finish", cat: "Bridal" },
  { src: "/assets/bridal-10.webp", alt: "Premium bridal makeup with polished camera-ready finish", cat: "Bridal" },
  { src: "/assets/bridal-11.webp", alt: "Close-up bridal portrait with luxury detailing", cat: "Bridal" },
  {
    src: "/assets/bridal-4.webp",
    alt: "Bridal eye makeup with defined before-and-after contrast",
    cat: "Before & After",
  },
  { src: "/assets/interior1.webp", alt: "Luxury parlour interior with elegant styling details", cat: "Parlour" },
  { src: "/assets/interior2.webp", alt: "Elegant salon lounge seating and client welcome area", cat: "Parlour" },
  { src: "/assets/interior3.webp", alt: "Premium salon mirror setup with modern lighting", cat: "Parlour" },
  {
    src: "/assets/interior4.webp",
    alt: "Academy workspace prepared for beauty training sessions",
    cat: "Academy",
  },
];

export const getGalleryByCategory = (category: string) => {
  return galleryImages.filter((img) => img.cat === category);
};
