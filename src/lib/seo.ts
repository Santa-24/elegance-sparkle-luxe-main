import type { SiteConfig } from "./config";

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildCanonicalUrl(siteUrl: string, pathname: string) {
  if (!siteUrl) return "";
  return new URL(pathname, siteUrl).toString();
}

export function buildOrganizationSchema(config: SiteConfig, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "LocalBusiness", "Organization"],
    "@id": `${canonicalUrl || config.siteUrl || ""}#organization`,
    name: config.siteName,
    url: canonicalUrl || config.siteUrl || undefined,
    telephone: config.contactPhone,
    email: config.contactEmail,
    image: `${canonicalUrl || config.siteUrl || ""}/og-image.svg`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      addressCountry: "IN",
      streetAddress: config.contactAddress,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Jajpur Road, Odisha",
    },
    openingHours: [config.contactHours],
    sameAs: [config.instagramUrl, config.facebookUrl].filter((value) => value && value !== "#"),
  };
}

export function buildWebSiteSchema(config: SiteConfig, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl || config.siteUrl || ""}#website`,
    name: config.siteName,
    url: canonicalUrl || config.siteUrl || undefined,
    publisher: {
      "@id": `${canonicalUrl || config.siteUrl || ""}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.url, canonicalUrl).toString(),
    })),
  };
}
