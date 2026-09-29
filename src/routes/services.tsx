import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
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
      { title: "Services & Beauty Menu | Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Bridal makeup, HD party makeup, hydra facials, hair styling, threading and certified academy courses in Jajpur Road, Odisha.",
      },
      { property: "og:title", content: "Beauty Services & Packages | Elegance Makeover" },
      {
        property: "og:description",
        content:
          "Explore our full range of bridal makeup, luxury parlour services and academy training.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://elegancemakeover.makeup/services" },
      { property: "og:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Beauty Services & Packages | Elegance Makeover" },
      {
        name: "twitter:description",
        content:
          "Bridal makeup, party makeup, hair styling & beauty academy in Jajpur Road, Odisha.",
      },
      { name: "twitter:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
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

function getServiceDetailSlug(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes("airbrush")) return "hd-airbrush-bridal-makeup";
  if (t.includes("bridal")) return "bridal-makeup";
  if (t.includes("party")) return "party-makeup";
  if (t.includes("engagement")) return "engagement-makeup";
  if (t.includes("facial") || t.includes("hydra")) return "hydra-facial";
  if (t.includes("smoothening") || t.includes("keratin")) return "hair-smoothening";
  if (t.includes("hair")) return "hair-styling";
  if (t.includes("academy") || t.includes("course")) return "makeup-academy-course";
  return null;
}

function ServicesPage() {
  const routerState = useRouterState();
  const { services } = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  useScrollReveal();

  const pathname = routerState.location.pathname.replace(/\/+$/, "");
  if (pathname !== "/services") {
    return <Outlet />;
  }

  const filtered = services.filter((s) => filter === "All" || s.category === filter);
  const faqItems = faqSections.find((section) => section.slug === "services")?.items ?? [];

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
          offers: cleanPrice
            ? {
                "@type": "Offer",
                price: cleanPrice,
                priceCurrency: "INR",
                description: service.price,
              }
            : undefined,
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
        eyebrow="Services & Pricing"
        title={
          <>
            Beauty Services & <span className="gradient-gold-text italic">Bridal Packages</span>
          </>
        }
        subtitle="Meticulously crafted bridal looks, advanced skincare facials, and certified academy training in Jajpur Road."
      />

      {/* QUICK ANSWER / AEO DIRECT ANSWER BLOCK */}
      <section className="bg-background pt-10 pb-4 border-b border-border/40">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-card/90 p-6 md:p-8 shadow-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Quick Answer: Services at Elegance Makeover
            </div>
            <p className="mt-3 text-base md:text-lg leading-relaxed font-sans text-foreground/90">
              Elegance Makeover & Academy provides luxury bridal makeup, HD Airbrush artistry, hydra
              facials, hair styling, smoothening, and certified makeup academy courses in Jajpur
              Road, Odisha. Directed by Master Artist Rasmirekha Swain, every session uses authentic
              luxury international brands (Dior, MAC, Huda Beauty) with transparent pricing starting
              from ₹2,500.
            </p>
          </div>
        </div>
      </section>

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
                        {getServiceDetailSlug(s.title) ? (
                          <Link
                            to="/services/$slug"
                            params={{ slug: getServiceDetailSlug(s.title)! }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] hover:underline"
                          >
                            Explore Service Guide & Inclusions <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : null}
                        <Link
                          to="/booking"
                          search={
                            getServiceQueryParam(s.title)
                              ? { service: getServiceQueryParam(s.title) }
                              : undefined
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

          {/* DEDICATED SPECIALIZED SERVICE GUIDES DIRECTORY */}
          <div className="mt-20 pt-16 border-t border-border/60">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
                Specialized Service Portfolios
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--royal)]">
                In-Depth Service Guides & Inclusions
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Read step-by-step methodologies, pricing breakdowns, pre-appointment prep, and
                client FAQs for each specialized treatment.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Bridal Makeup",
                  slug: "bridal-makeup",
                  tag: "Signature HD",
                  price: "₹8,000+",
                },
                {
                  title: "HD Airbrush Makeup",
                  slug: "hd-airbrush-bridal-makeup",
                  tag: "Waterproof 4K",
                  price: "₹12,000+",
                },
                {
                  title: "Engagement Makeup",
                  slug: "engagement-makeup",
                  tag: "Soft Glam",
                  price: "₹4,500+",
                },
                { title: "Party Makeup", slug: "party-makeup", tag: "Occasion", price: "₹2,500+" },
                {
                  title: "Hair Styling & Cuts",
                  slug: "hair-styling",
                  tag: "Styling & Updos",
                  price: "₹300+",
                },
                {
                  title: "Hydra Facial",
                  slug: "hydra-facial",
                  tag: "Clinical Glow",
                  price: "₹2,499+",
                },
                {
                  title: "Hair Smoothening",
                  slug: "hair-smoothening",
                  tag: "Keratin & L'Oreal",
                  price: "₹3,999+",
                },
                {
                  title: "Academy Course",
                  slug: "makeup-academy-course",
                  tag: "Govt Certified",
                  price: "₹15,000+",
                },
              ].map((item) => (
                <Link
                  key={item.slug}
                  to="/services/$slug"
                  params={{ slug: item.slug }}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-[var(--gold)] transition-colors group flex flex-col justify-between shadow-soft"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--gold)] uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="text-muted-foreground">{item.price}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg text-[var(--royal)] group-hover:text-[var(--gold)] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 text-xs font-medium text-foreground/80 flex items-center justify-between">
                    <span>View Guide & Book</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--gold)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
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
