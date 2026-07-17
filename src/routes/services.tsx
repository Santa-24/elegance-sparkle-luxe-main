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
    itemListElement: services.map((service, index) => {
      const cleanPrice = service.price.replace(/[^0-9]/g, "");
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: `${service.desc} (Duration: ${service.duration})`,
          serviceType: service.category,
          offers: cleanPrice ? {
            "@type": "Offer",
            price: cleanPrice,
            priceCurrency: "INR",
            description: service.price,
          } : undefined,
          provider: {
            "@type": "BeautySalon",
            name: siteConfig.siteName,
            url: canonicalUrl || siteConfig.siteUrl,
          },
        },
      };
    }),
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <SiteLayout>
      <StructuredData data={serviceSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
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
            Our premium beauty <span className="gradient-gold-text italic">offerings</span>
          </>
        }
        subtitle="Meticulously crafted styles, soothing therapies, and professional training."
      />

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] border transition-all cursor-pointer ${
                  filter === c
                    ? "border-transparent gradient-gold text-[var(--royal-deep)] shadow-gold"
                    : "border-border bg-card text-[var(--purple-deep)] hover:border-[var(--gold)]/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap] || Wand2;
                return (
                  <div
                    key={s.title}
                    className={`tilt-card bg-card rounded-3xl p-7 border border-border flex flex-col justify-between ${s.featured ? "gold-border animate-pulse-gold-border" : ""}`}
                  >
                    <div>
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
                    </div>
                    <div>
                      {s.category === "Academy" ? (
                        <div className="mt-6 pt-5 border-t border-border space-y-3">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                            Pricing & Courses
                          </div>
                          <div className="text-sm font-medium space-y-1.5 text-foreground/90 font-body">
                            <div>
                              Basic Course:{" "}
                              <span className="text-gold-safe font-bold">₹15,000</span> · 3 months
                            </div>
                            <div>
                              Advanced Course:{" "}
                              <span className="text-gold-safe font-bold">₹35,000</span> · 6 months
                            </div>
                            <div>
                              Pro Bridal Master:{" "}
                              <span className="text-gold-safe font-bold">₹50,000</span> · 4 months
                            </div>
                            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-body">
                              📞 Call or WhatsApp for enrollment
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                              Price
                            </div>
                            <div className="font-display text-lg font-bold text-gold-safe">
                              {s.price}
                            </div>
                          </div>
                          <div className="text-xs px-3 py-1 rounded-full bg-muted font-body font-semibold">
                            {s.duration}
                          </div>
                        </div>
                      )}
                      <div className="mt-5 flex flex-col gap-2">
                        <Link
                          to={
                            getServiceQueryParam(s.title)
                              ? `/booking?service=${getServiceQueryParam(s.title)}`
                              : "/booking"
                          }
                          onClick={() =>
                            trackEvent("booking_cta_click", {
                              location: "services_page",
                              service: s.title,
                            })
                          }
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:text-[var(--purple-deep)] animate-hover-arrow"
                        >
                          Book Now <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {s.category === "Academy" && (
                          <a
                            href="https://wa.me/919265200523?text=I'm%20interested%20in%20the%20makeup%20academy%20courses.%20Please%20share%20details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-safe hover:text-gold animate-hover-arrow mt-1"
                          >
                            WhatsApp for Details <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
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
