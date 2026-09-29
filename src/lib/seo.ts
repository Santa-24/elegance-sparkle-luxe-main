import type { SiteConfig } from "./config";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Builds a clean canonical URL by stripping query parameters and hash fragments.
 * Normalizes trailing slashes to prevent duplicate indexing penalties.
 */
export function buildCanonicalUrl(siteUrl: string, pathname: string) {
  if (!siteUrl) return "";
  const cleanPath = (pathname || "/").split("?")[0].split("#")[0] || "/";
  try {
    const url = new URL(cleanPath, siteUrl);
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
    return url.toString();
  } catch {
    return siteUrl;
  }
}

export function buildOrganizationSchema(config: SiteConfig, canonicalUrl?: string) {
  const siteUrl = config.siteUrl || "https://elegancemakeover.makeup";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Elegance Makeover & Academy",
    alternateName: "Elegance Bridal Studio & Academy",
    url: siteUrl,
    logo: `${siteUrl}/assets/logo.webp`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: config.contactPhone || "+91 92652 00523",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Odia", "Hindi"],
      },
    ],
  };
}

export function buildFounderPersonSchema(siteUrl = "https://elegancemakeover.makeup") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#founder`,
    name: "Rasmirekha Swain",
    jobTitle: "Founder & Master Bridal Makeup Artist",
    worksFor: {
      "@type": "BeautySalon",
      name: "Elegance Makeover & Academy",
      url: siteUrl,
    },
    image: `${siteUrl}/assets/owner.webp`,
    description:
      "Rasmirekha Swain is a certified master bridal makeup artist with 10+ years of experience in luxury bridal transformations and certified beauty education in Jajpur Road, Odisha.",
    knowsAbout: [
      "Bridal Makeup Artistry",
      "Odia Bridal Styling",
      "HD Airbrush Makeup",
      "Pre-Bridal Skincare",
      "Hairstyling & Saree Draping",
      "Professional Cosmetology Training",
    ],
    sameAs: [
      "https://www.instagram.com/rasmirekha2011",
      "https://www.facebook.com/share/1FhWXcqbUY/",
      // TODO_CLIENT_INPUT: Add personal LinkedIn / professional profile link if available
    ],
  };
}

export function buildLocalBusinessSchema(config: SiteConfig, canonicalUrl?: string) {
  const siteUrl = config.siteUrl || "https://elegancemakeover.makeup";

  // Coordinates near Jajpur Road / Vyasanagar.
  // Note: Coordinates can be fine-tuned via VITE_GEO_LAT and VITE_GEO_LNG.
  // TODO_CLIENT_INPUT: Verify exact Google Business Profile GPS coordinates from GBP map pin.
  const lat = Number(
    (typeof process !== "undefined" ? process.env.VITE_GEO_LAT : undefined) ||
      (typeof import.meta !== "undefined" && import.meta.env
        ? import.meta.env.VITE_GEO_LAT
        : undefined) ||
      20.9507,
  );
  const lng = Number(
    (typeof process !== "undefined" ? process.env.VITE_GEO_LNG : undefined) ||
      (typeof import.meta !== "undefined" && import.meta.env
        ? import.meta.env.VITE_GEO_LNG
        : undefined) ||
      86.1378,
  );

  return {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "LocalBusiness"],
    "@id": `${siteUrl}#localbusiness`,
    name: "Elegance Makeover & Academy",
    alternateName: "Elegance Bridal Studio Jajpur Road",
    url: siteUrl,
    logo: `${siteUrl}/assets/logo.webp`,
    image: [
      `${siteUrl}/assets/hero-bride.webp`,
      `${siteUrl}/assets/interior1.webp`,
      `${siteUrl}/assets/owner.webp`,
    ],
    description:
      "Premium bridal makeup studio, luxury beauty parlour, and certified makeup academy in Jajpur Road, Odisha, founded by master artist Rasmirekha Swain.",
    telephone: config.contactPhone || "+91 92652 00523",
    email: config.contactEmail || "elegancemakeover.2021@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        config.contactAddress || "Near Railway Station, Jajpur Road, Vyasanagar, Odisha 755019",
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      postalCode: "755019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    hasMap: "https://maps.google.com/maps?q=Elegance+Makeover+%26+Academy+Jajpur+Road+Odisha",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Jajpur Road" },
      { "@type": "AdministrativeArea", name: "Vyasanagar" },
      { "@type": "AdministrativeArea", name: "Jajpur Town" },
      { "@type": "AdministrativeArea", name: "Danagadi" },
      { "@type": "AdministrativeArea", name: "Kalinganagar" },
      { "@type": "AdministrativeArea", name: "Panikoili" },
      { "@type": "AdministrativeArea", name: "Kuakhia" },
      { "@type": "AdministrativeArea", name: "Bhadrak" },
      { "@type": "AdministrativeArea", name: "Cuttack" },
      { "@type": "AdministrativeArea", name: "Bhubaneswar" },
    ],
    founder: buildFounderPersonSchema(siteUrl),
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
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    sameAs: [
      "https://www.instagram.com/rasmirekha2011",
      "https://www.facebook.com/share/1FhWXcqbUY/",
      // TODO_CLIENT_INPUT: Add direct Google Business Profile URL (e.g., https://maps.app.goo.gl/...)
      // TODO_CLIENT_INPUT: Add YouTube channel URL if available
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elegance Makeover & Academy Signature Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HD Bridal Makeup",
            description:
              "Complete bridal look with HD camera-ready products, eyelashes, hair design, and saree/lehenga draping.",
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
            name: "HD Airbrush Bridal Makeup",
            description:
              "Silicon-based micro-mist airbrush bridal makeup for 18-hour sweatproof, waterproof bridal glow.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 9000,
            maxPrice: 15000,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Party & Reception Makeup",
            description:
              "Elegant party makeup for sangeet, reception, and festive family celebrations.",
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
            name: "Pre-Bridal Skincare & Hydra Facial",
            description: "Multi-step hydro-dermabrasion facial and pre-wedding glow treatments.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 1500,
            maxPrice: 3500,
            priceCurrency: "INR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Certified Professional Makeup Artist Course",
            description:
              "Intensive professional makeup course with hands-on bridal practice, vanity kit guidance, and placement support.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 15000,
            maxPrice: 45000,
            priceCurrency: "INR",
          },
        },
      ],
    },
  };
}

export function buildWebSiteSchema(config: SiteConfig, canonicalUrl: string) {
  const siteUrl = config.siteUrl || "https://elegancemakeover.makeup";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl || siteUrl}#website`,
    name: config.siteName || "Elegance Makeover & Academy",
    url: canonicalUrl || siteUrl,
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], canonicalUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : canonicalUrl
          ? new URL(item.url, canonicalUrl).toString()
          : `https://elegancemakeover.makeup${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  serviceType,
  price,
  minPrice,
  maxPrice,
  providerUrl = "https://elegancemakeover.makeup",
  canonicalUrl,
}: {
  name: string;
  description: string;
  serviceType?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  providerUrl?: string;
  canonicalUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name,
    serviceType: serviceType || name,
    description,
    provider: {
      "@type": "BeautySalon",
      name: "Elegance Makeover & Academy",
      url: providerUrl,
      telephone: "+91 92652 00523",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jajpur Road",
        addressRegion: "Odisha",
        postalCode: "755019",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Odisha",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      ...(price
        ? { price }
        : {
            minPrice: minPrice || 2500,
            maxPrice: maxPrice || 12000,
          }),
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
    },
  };
}

export function buildCourseSchema({
  name,
  description,
  courseCode,
  duration,
  fee,
  canonicalUrl,
  providerUrl = "https://elegancemakeover.makeup",
}: {
  name: string;
  description: string;
  courseCode?: string;
  duration?: string;
  fee?: number;
  canonicalUrl: string;
  providerUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${canonicalUrl}#course`,
    name,
    description,
    courseCode: courseCode || "EM-ACADEMY-01",
    provider: {
      "@type": "Organization",
      name: "Elegance Makeover & Academy",
      url: providerUrl,
      sameAs: "https://elegancemakeover.makeup/about",
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "onsite",
        courseWorkload: duration || "P30D",
        instructor: {
          "@type": "Person",
          name: "Rasmirekha Swain",
          jobTitle: "Founder & Master Trainer",
        },
        offers: {
          "@type": "Offer",
          price: fee || 25000,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  canonicalUrl,
  imageUrl,
  publishDate,
  updatedDate,
  authorName = "Rasmirekha Swain",
  authorUrl = "https://elegancemakeover.makeup/about",
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  publishDate: string;
  updatedDate?: string;
  authorName?: string;
  authorUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    description,
    mainEntityOfPage: canonicalUrl,
    image: imageUrl || "https://elegancemakeover.makeup/assets/hero-bride.webp",
    datePublished: publishDate,
    dateModified: updatedDate || publishDate,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Elegance Makeover & Academy",
      logo: {
        "@type": "ImageObject",
        url: "https://elegancemakeover.makeup/assets/logo.webp",
      },
    },
    inLanguage: "en-IN",
  };
}
