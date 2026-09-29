import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Download, Star, Sparkles, ArrowRight } from "lucide-react";

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
      { title: "Bridal Packages & Pricing | Elegance Makeover - Jajpur Road" },
      {
        name: "description",
        content:
          "Transparent bridal makeup packages from ₹6,000 to ₹12,000 in Jajpur Road, Odisha. Compare HD makeup, airbrush, and pre-bridal packages.",
      },
      { property: "og:title", content: "Bridal Packages & Pricing | Elegance Makeover" },
      {
        property: "og:description",
        content: "Premium bridal packages with transparent pricing in Jajpur Road, Odisha.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://elegancemakeover.makeup/pricing" },
      { property: "og:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bridal Packages & Pricing | Elegance Makeover" },
      {
        name: "twitter:description",
        content: "Compare luxury HD bridal makeup rates in Jajpur Road, Odisha.",
      },
      { name: "twitter:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

function getServiceQueryParam(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("bridal")) return "bridal-makeup";
  if (t.includes("party")) return "party-makeup";
  if (t.includes("facial")) return "facial";
  if (t.includes("hair")) return "hair-styling";
  if (t.includes("threading") || t.includes("brow")) return "threading";
  if (t.includes("academy") || t.includes("course") || t.includes("enroll")) return "academy";
  return "";
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
    "@type": "ItemList",
    name: "Pricing Packages",
    itemListElement: pricingPackages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: pkg.name,
        price: pkg.price,
        priceCurrency: "INR",
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
        eyebrow="Pricing & Packages"
        title={
          <>
            Bridal Packages & <span className="gradient-gold-text italic">Transparent Rates</span>
          </>
        }
        subtitle="Experience luxury bridal beauty with clear pricing tailored to every wedding celebration in Jajpur Road."
      />

      {/* QUICK ANSWER / AEO DIRECT ANSWER BLOCK */}
      <section className="bg-background pt-10 pb-4 border-b border-border/40">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-card/90 p-6 md:p-8 shadow-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Quick Answer: How Much Does Bridal Makeup Cost in
              Jajpur Road?
            </div>
            <p className="mt-3 text-base md:text-lg leading-relaxed font-sans text-foreground/90">
              Bridal makeup packages at Elegance Makeover in Jajpur Road range from ₹6,000 for
              Classic Bride HD up to ₹12,000 for Maharani Bride couture looks, with specialized HD
              Airbrush packages available at ₹12,000 to ₹16,000. Every package includes personalized
              foundation matching, luxury eye artistry, saree draping, and hair styling curated by
              Master Artist Rasmirekha Swain.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`tilt-card relative rounded-3xl p-8 border ${
                  pkg.popular
                    ? "gradient-royal text-marble border-transparent shadow-luxury"
                    : "bg-card border-border text-foreground shadow-soft"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--royal-deep)] shadow-gold">
                    Best Value
                  </div>
                )}
                <h3 className="font-display text-2xl tracking-wide">{pkg.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-sm font-semibold">₹</span>
                  <span className="font-display text-4xl font-bold tracking-tight">
                    {pkg.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="gold-divider my-6 opacity-40" />
                <ul
                  className={`space-y-4 font-body ${
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
                  search={
                    getServiceQueryParam(pkg.name)
                      ? { service: getServiceQueryParam(pkg.name) }
                      : undefined
                  }
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

          {/* HD VS AIRBRUSH COMPARISON MATRIX (AEO & SNIPPET RANKING) */}
          <div className="mt-20 pt-16 border-t border-border">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
                Bridal Technical Comparison
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--royal)]">
                HD Makeup vs Airbrush Makeup: Which is Right for You?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Understand the key technical differences in application, camera finish, longevity,
                and humidity resistance for your Odisha wedding.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-sm">
                  <thead className="gradient-royal text-marble">
                    <tr>
                      <th className="p-4 text-left font-display text-base border-b border-white/10">
                        Feature / Criteria
                      </th>
                      <th className="p-4 text-left font-display text-base border-b border-white/10 text-[var(--gold)]">
                        HD Bridal Makeup
                      </th>
                      <th className="p-4 text-left font-display text-base border-b border-white/10 text-[var(--gold)]">
                        HD Airbrush Bridal Makeup
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-muted/10">
                      <td className="p-4 font-semibold text-foreground">Application Method</td>
                      <td className="p-4 text-muted-foreground">
                        Ultra-fine dense brushes & damp micro-sponges
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Compressor-driven airgun dispersing micro-droplets
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Base Formulation</td>
                      <td className="p-4 text-muted-foreground">
                        High-pigment liquid & cream HD formulations
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Ultra-light silicone-based micro-sprayed formula
                      </td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="p-4 font-semibold text-foreground">
                        Longevity on Wedding Day
                      </td>
                      <td className="p-4 text-muted-foreground">
                        12 to 14 hours with flawless hold
                      </td>
                      <td className="p-4 text-muted-foreground">
                        18 to 24 hours (extreme durability)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">
                        Humidity & Sweat Resistance
                      </td>
                      <td className="p-4 text-muted-foreground">
                        High resistance with setting powders
                      </td>
                      <td className="p-4 text-muted-foreground">
                        100% waterproof, sweatproof, and cry-proof
                      </td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="p-4 font-semibold text-foreground">
                        4K Camera & Flash Performance
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Diffuses flash reflections; smooth satin finish
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Invisible on 4K cinematic zoom; second-skin feel
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Price in Jajpur Road</td>
                      <td className="p-4 text-foreground font-bold">₹8,000 – ₹12,000</td>
                      <td className="p-4 text-foreground font-bold">₹12,000 – ₹16,000</td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="p-4 font-semibold text-foreground">Best Recommended For</td>
                      <td className="p-4 text-muted-foreground">
                        Indoor mandaps, cooler winter muhurats, traditional weddings
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Outdoor venues, summer/monsoon weddings, 4K video shoots
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/services/$slug"
                params={{ slug: "bridal-makeup" }}
                className="text-xs uppercase tracking-wider font-semibold text-[var(--royal)] hover:text-[var(--gold)] inline-flex items-center gap-1"
              >
                Learn more about HD Bridal →
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/services/$slug"
                params={{ slug: "hd-airbrush-bridal-makeup" }}
                className="text-xs uppercase tracking-wider font-semibold text-[var(--royal)] hover:text-[var(--gold)] inline-flex items-center gap-1"
              >
                Learn more about Airbrush Makeup →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
