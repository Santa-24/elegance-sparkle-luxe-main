import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Phone,
  Compass,
  CheckCircle2,
  HelpCircle,
  Car,
} from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { locationsData, LocationArea } from "@/lib/content/locations";
import { buildBreadcrumbSchema, buildCanonicalUrl, buildFaqSchema } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

const siteConfig = getSiteConfig();

export const Route = createFileRoute("/service-areas/$area")({
  loader: async ({ params }) => {
    const area = locationsData[params.area];
    if (!area) {
      throw notFound();
    }
    return { area };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.area) {
      return {
        meta: [{ title: "Service Area Not Found | Elegance Makeover" }],
      };
    }

    const { area } = loaderData;
    const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/service-areas/${area.slug}`);

    return {
      meta: [
        { title: area.title },
        { name: "description", content: area.metaDescription },
        { property: "og:title", content: area.title },
        { property: "og:description", content: area.metaDescription },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: canonicalUrl || `https://elegancemakeover.makeup/service-areas/${area.slug}`,
        },
        { property: "og:image", content: "https://elegancemakeover.makeup/assets/hero-bride.webp" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: area.title },
        { name: "twitter:description", content: area.metaDescription },
        {
          name: "twitter:image",
          content: "https://elegancemakeover.makeup/assets/hero-bride.webp",
        },
      ],
      links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
    };
  },
  component: ServiceAreaDetailPage,
});

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function ServiceAreaDetailPage() {
  const { area } = Route.useLoaderData() as { area: LocationArea };
  useScrollReveal();

  const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/service-areas/${area.slug}`);

  // LocalBusiness / Service Schema scoped to this specific areaServed
  const areaServiceSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: `Elegance Makeover & Academy - ${area.name}`,
    description: area.metaDescription,
    url: canonicalUrl,
    telephone: siteConfig.contactPhone,
    priceRange: "₹₹ - ₹₹₹",
    image: "https://elegancemakeover.makeup/assets/hero-bride.webp",
    founder: {
      "@type": "Person",
      name: "Rasmirekha Swain",
      jobTitle: "Founder & Master Bridal Artist",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jajpur Road, Near City Center",
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      postalCode: "755019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.geoCoordinates.latitude,
      longitude: area.geoCoordinates.longitude,
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      addressRegion: "Odisha",
      addressCountry: "IN",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Bridal & Beauty Services for ${area.name}`,
      itemListElement: area.servicesOffered.map((svc, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.name,
          description: svc.description,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: svc.price.replace(/[^\d]/g, "") || "8000",
          priceCurrency: "INR",
        },
        position: index + 1,
      })),
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", url: "/" },
      { name: "Service Areas", url: "/service-areas" },
      { name: area.name, url: `/service-areas/${area.slug}` },
    ],
    canonicalUrl,
  );

  const faqSchema = buildFaqSchema(area.faqs);

  return (
    <SiteLayout>
      <StructuredData data={areaServiceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Service Areas", to: "/service-areas" },
          { label: area.name },
        ]}
        eyebrow={`Luxury Bridal Beauty • ${area.name}`}
        title={
          <>
            Bridal Makeup Artist in <span className="gradient-gold-text italic">{area.name}</span>
          </>
        }
        subtitle={`Premier bridal makeover, luxury HD Airbrush artistry, and certified makeup training for clients in ${area.name}, Odisha.`}
      />

      {/* QUICK ANSWER / AEO DIRECT ANSWER BLOCK */}
      <section className="bg-background pt-12 pb-6 border-b border-border/40">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-card/90 p-6 md:p-8 shadow-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Quick Answer for {area.name} Brides
            </div>
            <p className="mt-3 text-base md:text-lg leading-relaxed font-sans text-foreground/90">
              {area.quickAnswer}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-border/50 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Compass className="h-4 w-4 text-[var(--gold)]" /> Studio Distance:{" "}
                {area.distanceFromStudio}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Clock className="h-4 w-4 text-[var(--gold)]" /> Transit Time: {area.travelTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> Master Artist: Rasmirekha
                Swain
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL & SERVICE LOGISTICS POLICY */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="reveal lg:col-span-2 rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-royal text-[var(--gold)]">
                <Car className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl md:text-3xl text-[var(--royal)]">
                Venue Travel & On-Location Policy for {area.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {area.travelPolicy}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <div className="text-xs uppercase tracking-wider text-[var(--gold)] font-medium">
                    Distance from Base
                  </div>
                  <div className="mt-1 text-xl font-bold font-display text-foreground">
                    {area.distanceFromStudio}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Approx. {area.travelTime} travel time
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <div className="text-xs uppercase tracking-wider text-[var(--gold)] font-medium">
                    Kit Mobility
                  </div>
                  <div className="mt-1 text-xl font-bold font-display text-foreground">
                    Complete Pro Setup
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Airbrush, vanity ring lights & backup tools
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal rounded-[2rem] gradient-luxe p-8 text-marble flex flex-col justify-between shadow-soft">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Direct Booking
                </span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl">
                  Reserve Your {area.name} Wedding Date
                </h3>
                <p className="mt-3 text-sm text-marble/80 leading-relaxed">
                  Auspicious wedding muhurat dates in Odisha fill up months ahead. Connect with
                  Master Artist Rasmirekha Swain today to lock your date.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <Link
                  to="/booking"
                  search={{ service: "bridal-makeup" }}
                  className="btn-luxe flex w-full items-center justify-center gap-2 rounded-full gradient-gold px-6 py-3.5 text-sm font-bold text-[var(--royal-deep)] shadow-gold"
                >
                  <Calendar className="h-4 w-4" /> Check Date Availability
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.contactPhone.replace(/[^\d]/g, "")}?text=Hi%20Elegance%20Makeover,%20I%20am%20looking%20for%20bridal%20makeup%20in%20${encodeURIComponent(area.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick(`location_${area.slug}`)}
                  className="btn-luxe flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3 text-sm font-semibold text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE & REGIONAL CULTURAL WEDDING CONTEXT (AUTHENTIC 600+ WORDS) */}
      <section className="bg-muted/30 py-20 border-y border-border/50">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
              <MapPin className="h-3.5 w-3.5" /> Regional Wedding Insights
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-[var(--royal)]">
              Wedding Traditions & Beauty Styling in {area.name}
            </h2>
            <div className="mt-6 prose prose-neutral max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p className="text-base md:text-lg">{area.editorialContent.overview}</p>
              <p className="text-base">{area.editorialContent.bridalStylingDetails}</p>
              <p className="text-base">{area.venueContext}</p>
              <p className="text-base">{area.editorialContent.bookingAdvice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OFFERED IN THIS LOCATION */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
              Service Menu
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--royal)]">
              Bridal & Beauty Packages Available in {area.name}
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Every package is personally curated and supervised by Master Artist Rasmirekha Swain
              using imported luxury cosmetics (Dior, MAC, Huda Beauty, NARS, Charlotte Tilbury).
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {area.servicesOffered.map((svc, i) => (
              <div
                key={i}
                className="reveal flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-[var(--gold)]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                      {svc.price}
                    </span>
                    <Sparkles className="h-4 w-4 text-[var(--gold)]" />
                  </div>
                  <h3 className="mt-3 font-display text-xl text-[var(--royal)]">{svc.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {svc.description || svc.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <Link
                    to="/booking"
                    search={{ service: "bridal-makeup" }}
                    className="inline-flex items-center text-xs font-semibold text-[var(--royal)] hover:text-[var(--gold)] transition-colors gap-1"
                  >
                    Book for {area.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREA-SPECIFIC FAQS (ACCORDION & SCHEMA BACKED) */}
      <section className="bg-muted/40 py-24 border-t border-border/50">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
              Answers for Brides
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--royal)]">
              Frequently Asked Questions for {area.name}
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Essential answers regarding travel timings, booking lead time, pre-bridal trials, and
              wedding day coordination.
            </p>
          </div>

          <div className="space-y-4">
            {area.faqs.map((faq, i) => (
              <div
                key={i}
                className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-lg text-[var(--royal)] flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY COVERAGE AREAS (CROSS-LINKING INTERLINK ARCHITECTURE) */}
      <section className="bg-background py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 reveal">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">
                Odisha Network
              </span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                Explore Neighboring Service Areas
              </h2>
            </div>
            <Link
              to="/service-areas"
              className="mt-4 md:mt-0 text-sm font-semibold text-[var(--gold)] hover:underline inline-flex items-center gap-1"
            >
              View all 10 serviced cities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {area.nearbyAreas.map((neighbor) => (
              <Link
                key={neighbor.slug}
                to="/service-areas/$area"
                params={{ area: neighbor.slug }}
                className="reveal rounded-xl border border-border bg-card p-4 hover:border-[var(--gold)] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-foreground group-hover:text-[var(--gold)] transition-colors">
                    {neighbor.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--gold)] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Approx. {neighbor.distance} away
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED MAP SECTION */}
      <section className="bg-muted/20 py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft bg-card p-2 md:p-4">
            <div className="mb-3 px-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[var(--gold)]" /> Elegance Makeover Service
                Coverage: {area.name}
              </span>
              <span>
                Coordinates: {area.geoCoordinates.latitude.toFixed(4)}° N,{" "}
                {area.geoCoordinates.longitude.toFixed(4)}° E
              </span>
            </div>
            <div className="aspect-[16/7] w-full rounded-xl overflow-hidden bg-muted">
              <iframe
                title={`Map of bridal makeover service area in ${area.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(area.mapQuery)}&output=embed`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION BANNER */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-[2.5rem] gradient-royal p-8 md:p-14 text-center text-marble shadow-gold/20 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                Excellence in Bridal Artistry
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl text-marble">
                Ready to Be an Elegance Bride in {area.name}?
              </h2>
              <p className="mt-4 text-sm md:text-base text-marble/80 leading-relaxed">
                Connect with Master Artist Rasmirekha Swain today. Experience bespoke bridal
                consultations, custom hair ornamentation, and camera-ready luxury finishes.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/booking"
                  search={{ service: "bridal-makeup" }}
                  className="btn-luxe inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4 font-bold text-[var(--royal-deep)] shadow-gold"
                >
                  <Calendar className="h-4 w-4" /> Book Appointment Now
                </Link>
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, "")}`}
                  onClick={() => trackPhoneClick(`location_${area.slug}`)}
                  className="btn-luxe inline-flex items-center gap-2 rounded-full border-2 border-[var(--gold)] px-8 py-4 font-semibold text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)]"
                >
                  <Phone className="h-4 w-4" /> Call Studio: {siteConfig.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
