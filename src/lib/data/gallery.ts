// ============================================
// GALLERY DATA - Consolidated & Modular
// ============================================

import bridal1 from "../../assets/bridal-1.webp";
import bridal2 from "../../assets/bridal-2.webp";
import bridal3 from "../../assets/bridal-3.webp";
import bridal4 from "../../assets/bridal-4.webp";
import bridal5 from "../../assets/bridal-5.webp";
import bridal6 from "../../assets/bridal-6.webp";
import bridal7 from "../../assets/bridal-7.webp";
import bridal8 from "../../assets/bridal-8.webp";
import bridal9 from "../../assets/bridal-9.webp";
import bridal10 from "../../assets/bridal-10.webp";
import bridal11 from "../../assets/bridal-11.webp";
import interior1 from "../../assets/interior1.webp";
import interior2 from "../../assets/interior2.webp";
import interior3 from "../../assets/interior3.webp";
import interior4 from "../../assets/interior4.webp";

import type { GalleryImage } from "./types";

function getFileName(value: string) {
  return value.split("?")[0].split("#")[0].split("/").pop() ?? value;
}

// Frontend gallery display data
export const galleryImages: GalleryImage[] = [
  { src: bridal1, alt: "Editorial bridal look with traditional Odia styling", cat: "Bridal" },
  { src: bridal2, alt: "Soft bridal portrait with elegant maang tikka finish", cat: "Bridal" },
  { src: bridal5, alt: "Classic bridal moment in rich red veil and luminous skin", cat: "Bridal" },
  { src: bridal3, alt: "Fresh pink bridal look with delicate detailing", cat: "Bridal" },
  { src: bridal6, alt: "Side profile bridal makeup with polished contour and glow", cat: "Bridal" },
  { src: bridal7, alt: "Traditional bridal styling with statement jewelry", cat: "Bridal" },
  { src: bridal8, alt: "Soft glam bridal portrait with balanced tones", cat: "Bridal" },
  { src: bridal9, alt: "Warm-toned bridal look with refined finish", cat: "Bridal" },
  { src: bridal10, alt: "Premium bridal makeup with polished camera-ready finish", cat: "Bridal" },
  { src: bridal11, alt: "Close-up bridal portrait with luxury detailing", cat: "Bridal" },
  {
    src: bridal4,
    alt: "Bridal eye makeup with defined before-and-after contrast",
    cat: "Before & After",
  },
  { src: interior1, alt: "Luxury parlour interior with elegant styling details", cat: "Parlour" },
  { src: interior2, alt: "Elegant salon lounge seating and client welcome area", cat: "Parlour" },
  { src: interior3, alt: "Premium salon mirror setup with modern lighting", cat: "Parlour" },
  {
    src: interior4,
    alt: "Academy workspace prepared for beauty training sessions",
    cat: "Academy",
  },
];

const galleryAssetMap = new Map(galleryImages.map((image) => [getFileName(image.src), image.src]));

export function resolveGalleryImageSrc(value: string) {
  const normalized = value.trim();
  if (!normalized) return "";
  if (/^(https?:|data:|blob:)/i.test(normalized)) return normalized;

  const fileName = getFileName(normalized);
  return galleryAssetMap.get(fileName) ?? normalized;
}

export const getGalleryByCategory = (category: string) => {
  return galleryImages.filter((img) => img.cat === category);
};
