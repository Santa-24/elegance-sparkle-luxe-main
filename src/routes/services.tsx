import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { faqSections } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { Crown, Sparkles, Heart, Scissors, Wand2, GraduationCap, ArrowRight } from "lucide-react";
import { getLiveServicesFn } from "@/lib/content/live.functions";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/services");

export const Route = createFileRoute("/services")({
  loader: async () => {
    const services = await getLiveServicesFn();
    return { services };
  },
  head: () => ({
    meta: [
      { title: "Services & Pricing - Elegance Makeover" },
      {
        name: "description",
        content:
          "Bridal makeup, party makeup, facials, hair styling, threading and certified academy courses. Premium beauty services in Jajpur Road, Odisha.",
      },
      { property: "og:title", content: "Beauty Services - Elegance Makeover" },
      {
        property: "og:description",
        content: "Explore our full range of bridal & parlour services.",
      },
    ],
  }),
  component: ServicesPage,
});

const iconMap = { Crown, Sparkles, Heart, Scissors, Wand2, GraduationCap };
const categories = ["All", "Bridal", "Parlour", "Academy"] as const;

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

function ServicesPage() {
  const { services } = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered = services.filter((s) => filter === "All" || s.category === filter);
  const faqItems = faqSections.find((section) => section.slug === "services")?.items ?? [];

  useScrollReveal();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beauty Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.desc,
        serviceType: service.category,
        provider: {
          "@type": "BeautySalon",
          name: siteConfig.siteName,
          url: canonicalUrl || siteConfig.siteUrl,
        },
      },
    })),
  };

  return (
    <SiteLayout>
      <StructuredData data={serviceSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Premium <span className="gradient-gold-text italic">beauty</span> services
          </>
        }
        subtitle="From everyday glamour to once-in-a-lifetime bridal looks - every service crafted to perfection."
      />

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === c
                    ? "gradient-gold text-[var(--royal-deep)] shadow-gold"
                    : "bg-card border border-border text-foreground/70 hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filtered.length > 0 ? (
              filtered.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
                return (
                  <div
                    key={s.title}
                    className={`tilt-card bg-card rounded-3xl p-7 border border-border ${s.featured ? "gold-border animate-pulse-gold-border" : ""}`}
                  >
                    {s.featured && (
                      <div className="inline-block text-xs tracking-widest uppercase gradient-gold text-[var(--royal-deep)] px-3 py-1 rounded-full font-semibold mb-4">
                        Bridal Special
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl gradient-royal flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-[var(--purple-deep)] mb-1">
                      {s.category}
                    </div>
                    <h3 className="font-display text-2xl text-[var(--royal)]">{s.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.desc}</p>
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">
                          Price
                        </div>
                        <div className="font-display text-lg font-bold text-gold-safe">
                          {s.price}
                        </div>
                      </div>
                      <div className="text-xs px-3 py-1 rounded-full bg-muted">{s.duration}</div>
                    </div>
                    <Link
                      to="/booking"
                      onClick={() =>
                        trackEvent("booking_cta_click", {
                          location: "services_page",
                          service: s.title,
                        })
                      }
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:text-[var(--purple-deep)] animate-hover-arrow"
                    >
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
                No services are published yet. Add or activate services in the admin panel to show
                them here.
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-5 z-40 hidden md:block">
        <Link
          to="/booking"
          onClick={() => trackEvent("booking_cta_click", { location: "services_page_floating" })}
          className="inline-flex h-11 items-center justify-center gap-2 px-7 py-2.5 rounded-[var(--radius-sm)] gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold hover:shadow-luxury transition-all cursor-pointer"
        >
          Book Appointment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section className="marble-bg py-24 md:py-[120px] reveal">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)] font-semibold">
              Service FAQs
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
              Questions about <span className="text-gold-safe italic">our services</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqItems.length > 0 ? (
              faqItems.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <summary className="cursor-pointer list-none font-display text-lg text-[var(--royal)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                Service FAQs are not available yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
