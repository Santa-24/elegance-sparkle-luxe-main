import { createFileRoute, Link } from "@tanstack/react-router";
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

function PricingPage() {
  const { pricingPackages } = Route.useLoaderData() as {
    pricingPackages: Array<{
      name: string;
      price: number;
      popular: boolean;
      features: string[];
    }>;
  };

  const featureRows = Array.from(new Set(pricingPackages.flatMap((pkg) => pkg.features)));

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

      <section className="relative overflow-hidden bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(238,222,188,0.2),transparent)]" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--royal-deep)] shadow-gold">
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
                      pkg.popular ? "text-[var(--gold)]" : "gradient-gold-text"
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
                  className={`mt-6 block rounded-full px-5 py-3 text-center font-semibold btn-luxe ${
                    pkg.popular
                      ? "gradient-gold text-[var(--royal-deep)] shadow-gold"
                      : "border-2 border-[var(--royal)] text-[var(--royal)] hover:border-transparent hover:text-[var(--royal-deep)] hover:gradient-gold"
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
              className="btn-luxe inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[var(--gold)] bg-card px-6 py-3 font-semibold text-[var(--royal)] opacity-60 shadow-soft"
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
                      <div className="text-[10px] uppercase tracking-widest text-[var(--purple-deep)]">
                        Package {index + 1}
                      </div>
                      <h3 className="mt-1 font-display text-2xl text-[var(--royal)]">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground line-through">
                        Rs {(pkg.price + 1500).toLocaleString("en-IN")}
                      </div>
                      <div className="font-display text-2xl font-bold gradient-gold-text">
                        Rs {pkg.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
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
