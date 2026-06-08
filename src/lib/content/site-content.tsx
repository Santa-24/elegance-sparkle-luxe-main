import { createContext, useContext, type ReactNode } from "react";

import type { SiteConfig } from "@/lib/site-config";

export type SiteContent = {
  hero: {
    heading: string;
    subtitle: string;
    primary_cta_label: string;
    primary_cta_url: string;
    secondary_cta_label: string;
    secondary_cta_url: string;
    hero_image_url: string | null;
    hero_image_alt: string | null;
    is_active: boolean;
  } | null;
  about: {
    headline: string;
    body: string;
    bullet_points: string[] | null;
    founder_name: string;
    founder_title: string;
    founder_image_url: string | null;
    gallery_image_url: string | null;
    is_active: boolean;
  } | null;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    map_url: string;
    working_hours: string;
    is_active: boolean;
  } | null;
  social: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
    whatsapp: string | null;
    is_active: boolean;
  } | null;
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string;
    canonical_url: string;
    og_image_url: string | null;
    is_active: boolean;
  } | null;
};

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function buildFallbackSiteContent(siteConfig: SiteConfig): SiteContent {
  return {
    hero: null,
    about: null,
    contact: {
      phone: siteConfig.contactPhone,
      whatsapp: siteConfig.whatsappNumber,
      email: siteConfig.contactEmail,
      address: siteConfig.contactAddress,
      map_url: "",
      working_hours: siteConfig.contactHours,
      is_active: true,
    },
    social: {
      instagram: siteConfig.instagramUrl,
      facebook: siteConfig.facebookUrl,
      youtube: null,
      whatsapp: siteConfig.whatsappNumber,
      is_active: true,
    },
    seo: null,
  };
}
