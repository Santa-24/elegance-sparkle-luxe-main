import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { getLiveServiceAreasFn } from "@/lib/content/live.functions";
import type { ServiceArea } from "@/lib/content/service-areas";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/service-areas");

export const Route = createFileRoute("/service-areas")({
  loader: async () => {
    const serviceAreas = await getLiveServiceAreasFn();
    return { serviceAreas };
  },
  head: () => ({
    meta: [
      { title: "Service Areas - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Bridal makeup, beauty parlour and academy service areas in Jajpur Road, Jajpur, Cuttack, Bhubaneswar, Bhadrak and nearby Odisha regions.",
      },
      { property: "og:title", content: "Service Areas - Elegance Makeover & Academy" },
      {
        property: "og:description",
        content: "Nearby local service coverage for brides, clients and academy students.",
      },
    ],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  const { serviceAreas } = Route.useLoaderData() as { serviceAreas: ServiceArea[] };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautySalon", "Service"],
    name: "Elegance Makeover & Academy Local Coverage",
    provider: {
      "@type": "BeautySalon",
      name: siteConfig.siteName,
      telephone: siteConfig.contactPhone,
      areaServed: serviceAreas.map((area) => area.name),
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "Place",
      name: area.name,
    })),
  };

  return (
    <SiteLayout>
      <StructuredData data={localBusinessSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Service Areas", url: "/service-areas" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}

      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        eyebrow="Local SEO"
        title={
          <>
            Serving brides across <span className="gradient-gold-text italic">Odisha</span>
          </>
        }
        subtitle="We regularly work with clients from Jajpur Road, Jajpur, Cuttack, Bhubaneswar, Bhadrak and nearby service regions."
      />

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceAreas.map((area) => (
              <article
                key={area.name}
                className="rounded-[2rem] border border-border bg-card p-6 shadow-soft"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-royal">
                  <MapPin className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h2 className="mt-4 font-display text-2xl text-[var(--royal)]">{area.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                <div className="mt-4 rounded-2xl bg-muted p-4">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                    Search intent
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{area.searchIntent}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {area.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] gradient-luxe p-8 text-marble md:p-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl">
                Planning a wedding or academy visit from another city?
              </h2>
              <p className="mt-3 text-sm md:text-base text-marble/80">
                Contact us early and we'll help align your appointment timing, service selection and
                travel plan.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="btn-luxe inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 font-semibold text-[var(--royal-deep)] shadow-gold"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-luxe inline-flex items-center gap-2 rounded-full border-2 border-[var(--gold)] px-6 py-3 font-semibold text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)]"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
