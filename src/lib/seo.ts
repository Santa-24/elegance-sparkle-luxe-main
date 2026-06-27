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
    image: `${canonicalUrl || config.siteUrl || ""}/og-image.webp`,
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

export function buildLocalBusinessSchema(config: SiteConfig, canonicalUrl: string) {
  const siteUrl = config.siteUrl || "https://elegance-sparkle-luxe-main.onrender.com";
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}#localbusiness`,
    name: "Elegance Makeover & Academy",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    image: `${siteUrl}/og-image.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jajpur Road, Odisha, India",
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      postalCode: "755019",
      addressCountry: "IN",
    },
    telephone: "+91 92652 00523",
    email: "elegancemakeover.2021@gmail.com",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.9507,
      longitude: 86.1378,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    priceRange: "₹₹",
    sameAs: [
      "https://www.instagram.com/rasmirekha2011",
      "https://www.facebook.com/share/1FhWXcqbUY/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elegance Makeover & Academy Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bridal Makeup",
            description:
              "Premium bridal makeup packages by internationally certified artist using HD products.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 6000,
            maxPrice: 12000,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Party Makeup",
            description: "Professional party makeup for weddings, receptions, and special events.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 2500,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium Facial",
            description:
              "Luxury facials and skin rejuvenation treatments using professional products.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 500,
            maxPrice: 3000,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hair Styling & Cut",
            description: "Modern haircuts, styling, blowouts, and advanced hair treatments.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 100,
            maxPrice: 400,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Threading & Brows",
            description: "Eyebrow shaping, threading, and upper lip hair removal.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 50,
            maxPrice: 200,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Academy Courses",
            description: "Professional makeup artist courses and beauty academy training.",
          },
        },
      ],
    },
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
