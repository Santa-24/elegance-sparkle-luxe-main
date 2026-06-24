import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Download, Star } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";
import { getLivePricingPackagesFn } from "@/lib/content/live.functions";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/pricing");

export const Route = createFileRoute("/pricing")({
  loader: async () => {
    const pricingPackages = await getLivePricingPackagesFn();
    return { pricingPackages };
  },
  head: () => ({
    meta: [
      { title: "Bridal Packages & Pricing - Elegance Makeover" },
      {
        name: "description",
        content:
          "Transparent bridal makeup packages from Rs 6,000 to Rs 12,000. Compare and pick the perfect look for your wedding day.",
      },
      { property: "og:title", content: "Bridal Pricing - Elegance Makeover" },
      { property: "og:description", content: "Premium bridal packages with transparent pricing." },
    ],
  }),
  component: PricingPage,
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

function PricingPage() {
  const { pricingPackages: allPricingPackages } = Route.useLoaderData() as {
    pricingPackages: Array<{
      name: string;
      price: number;
      popular: boolean;
      features: string[];
    }>;
  };

  // Deduplicate pricing packages by name to prevent duplicate cards
  const pricingPackages: typeof allPricingPackages = [];
  const seenNames = new Set<string>();
  for (const pkg of allPricingPackages) {
    if (!seenNames.has(pkg.name)) {
      seenNames.add(pkg.name);
      pricingPackages.push(pkg);
    }
  }

  const featureRows = Array.from(new Set(pricingPackages.flatMap((pkg) => pkg.features)));

  useScrollReveal();

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bridal Packages & Pricing",
    mainEntity: pricingPackages.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.features.join(", "),
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: p.price,
        availability: "https://schema.org/InStock",
        url: canonicalUrl || siteConfig.siteUrl,
      },
    })),
  };

  return (
    <SiteLayout>
      <StructuredData data={pricingSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Pricing", url: "/pricing" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}

      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
        eyebrow="Pricing"
        title={
          <>
            Bridal packages <span className="gradient-gold-text italic">curated</span> for you
          </>
        }
        subtitle="Every package includes premium products, expert artistry and a stress-free experience."
      />

      <section className="relative overflow-hidden bg-background py-24 md:py-[120px] reveal">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold-soft/10 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-stretch gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex h-full flex-col overflow-visible rounded-[2rem] p-7 transition-all duration-300 ${
                  pkg.popular
                    ? "gradient-royal pt-9 text-marble shadow-luxury ring-1 ring-[var(--gold)]/35 scale-[1.03]"
                    : "border border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-luxury"
                }`}
              >
                {pkg.popular ? (
                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--royal-deep)] shadow-gold">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                ) : null}

                <h3
                  className={`font-display text-2xl leading-tight ${
                    pkg.popular ? "text-[var(--gold)]" : "text-[var(--royal)]"
                  }`}
                >
                  {pkg.name}
                </h3>

                <div className="mt-5">
                  <div
                    className={`text-xs line-through ${
                      pkg.popular ? "text-marble/50" : "text-muted-foreground"
                    }`}
                  >
                    Rs {(pkg.price + 1500).toLocaleString("en-IN")}
                  </div>
                  <div
                    className={`font-display text-4xl font-bold ${
                      pkg.popular ? "text-[var(--gold)]" : "text-gold-safe"
                    }`}
                  >
                    Rs {pkg.price.toLocaleString("en-IN")}
                  </div>
                </div>

                <ul
                  className={`mt-6 flex-1 space-y-2.5 ${
                    pkg.popular ? "text-marble/85" : "text-foreground/80"
                  }`}
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          pkg.popular ? "text-[var(--gold)]" : "text-[var(--purple-deep)]"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`mt-6 block rounded-[var(--radius-sm)] px-5 py-3 text-center font-semibold transition-all cursor-pointer ${
                    pkg.popular
                      ? "gradient-gold text-[var(--royal-deep)] shadow-gold hover:shadow-luxury"
                      : "border border-gold text-gold-safe hover:gradient-gold hover:text-[var(--royal-deep)] hover:border-transparent"
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            {/* TODO: Add a real brochure PDF in public/ and replace this disabled CTA with that file path. */}
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-dashed border-gold bg-card px-6 py-3 font-semibold text-gold-safe opacity-60 shadow-soft cursor-not-allowed"
            >
              <Download className="h-4 w-4" /> Brochure coming soon
            </button>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="gradient-royal text-marble">
                  <tr>
                    <th className="border-b border-white/10 p-4 text-left font-display text-base">
                      Inclusions
                    </th>
                    {pricingPackages.map((pkg) => (
                      <th
                        key={pkg.name}
                        className="border-b border-white/10 p-4 font-display text-base text-[var(--gold)]"
                      >
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {featureRows.map((feature, index) => (
                    <tr
                      key={feature}
                      className={`border-t border-border ${index % 2 === 0 ? "bg-muted/20" : ""}`}
                    >
                      <td className="p-4 align-middle font-medium text-foreground">{feature}</td>
                      {pricingPackages.map((pkg) => (
                        <td key={`${pkg.name}-${feature}`} className="p-4 align-middle text-center">
                          {pkg.features.some(
                            (item) => item.toLowerCase() === feature.toLowerCase(),
                          ) ? (
                            <Check className="mx-auto h-4 w-4 text-[var(--gold)]" />
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-5 md:hidden">
              {pricingPackages.map((pkg, index) => (
                <article
                  key={pkg.name}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[var(--purple-deep)]">
                        Package {index + 1}
                      </div>
                      <h3 className="mt-1 font-display text-2xl text-[var(--royal)]">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground line-through">
                        Rs {(pkg.price + 1500).toLocaleString("en-IN")}
                      </div>
                      <div className="font-display text-2xl font-bold text-gold-safe">
                        Rs {pkg.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-gold" />
                        <span className="font-medium text-foreground/85">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
