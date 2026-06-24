// ============================================
// SITE CONFIGURATION - Client-side Config
// ============================================

type SiteConfig = {
  siteUrl: string;
  name: string;
  siteName: string;
  adminEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  contactAddress: string;
  contactHours: string;
  instagramUrl: string;
  facebookUrl: string;
  ga4Id: string;
  clarityId: string;
};

export function getSiteConfig(): SiteConfig {
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE ?? "+91 92652 00523";
  return {
    siteUrl: import.meta.env.VITE_SITE_URL ?? "",
    name: import.meta.env.VITE_SITE_NAME ?? "Elegance Makeover & Academy",
    siteName: import.meta.env.VITE_SITE_NAME ?? "Elegance Makeover & Academy",
    adminEmail:
      import.meta.env.VITE_ADMIN_EMAIL ?? import.meta.env.VITE_CONTACT_EMAIL ?? "elegancemakeover.2021@gmail.com",
    contactPhone,
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? contactPhone.replace(/\D/g, ""),
    contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "elegancemakeover.2021@gmail.com",
    contactAddress: import.meta.env.VITE_CONTACT_ADDRESS ?? "Jajpur Road, Odisha, India",
    contactHours: import.meta.env.VITE_CONTACT_HOURS ?? "Mon - Sun | 10:00 AM - 8:00 PM",
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL ?? "https://www.instagram.com/rasmirekha2011",
    facebookUrl: import.meta.env.VITE_FACEBOOK_URL ?? "https://www.facebook.com/share/1FhWXcqbUY/",
    ga4Id: import.meta.env.VITE_GA4_ID ?? "",
    clarityId: import.meta.env.VITE_CLARITY_ID ?? "",
  };
}

export type { SiteConfig };
