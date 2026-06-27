import { StructuredData } from "./seo/StructuredData";

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Elegance Makeover & Academy",
    description:
      "Premium bridal makeup salon, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha.",
    url: "https://elegance-sparkle-luxe-main.onrender.com",
    telephone: "+919265200523",
    email: "elegancemakeover.2021@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jajpur Road",
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      postalCode: "755019",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 10:00-20:00",
    priceRange: "₹₹",
    image: "https://elegance-sparkle-luxe-main.onrender.com/assets/bridal-1.webp",
    founder: {
      "@type": "Person",
      name: "Rasmirekha Swain",
    },
    sameAs: [
      "https://www.instagram.com/rasmirekha2011",
      "https://www.facebook.com/share/1FhWXcqbUY/",
    ],
  };

  return <StructuredData data={schema} />;
}
