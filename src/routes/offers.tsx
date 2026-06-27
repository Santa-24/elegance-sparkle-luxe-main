import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { Tag, Gift, ArrowRight } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getSiteConfig } from "@/lib/site-config";
import { getLiveOffersFn } from "@/lib/content/live.functions";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getCountdownDays } from "@/lib/utils/formatting";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/offers");

export const Route = createFileRoute("/offers")({
  loader: async () => {
    const offers = await getLiveOffersFn();
    return { offers };
  },
  head: () => ({
    meta: [
      { title: "Current Offers - Elegance Makeover" },
      {
        name: "description",
        content:
          "Festive 20% OFF on all services, Rs 500 off above Rs 2,000, bridal bonanza & academy scholarship. Limited time offers.",
      },
      { property: "og:title", content: "Special Offers - Elegance Makeover" },
      { property: "og:description", content: "Limited-time luxury beauty offers." },
    ],
  }),
  component: OffersPage,
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

function formatHeadline(discount: string, title: string) {
  let cleanDiscount = discount.trim();
  let cleanTitle = title.trim();
  
  if (cleanTitle.toLowerCase().includes("raja festival beauty package")) {
    cleanTitle = "Raja Festival Beauty Package";
  }
  
  let formattedDiscount = cleanDiscount;
  if (!formattedDiscount.toLowerCase().startsWith("flat")) {
    formattedDiscount = `Flat ${formattedDiscount}`;
  }
  if (!formattedDiscount.toLowerCase().endsWith("off")) {
    formattedDiscount = `${formattedDiscount} Off`;
  }
  
  return `${formattedDiscount} — ${cleanTitle}`;
}

function OffersPage() {
  const { offers } = Route.useLoaderData();
  const primaryOffer =
    offers.find((offer) => offer.discount || offer.title || offer.desc) ?? offers[0];
  const countdownDays = getCountdownDays(primaryOffer?.validity);

  useScrollReveal();

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Current Offers",
    itemListElement: offers.map((offer, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: offer.title,
      description: offer.desc,
      validFrom: offer.validity?.split(" to ")?.[0],
      validThrough: offer.validity?.split(" to ")?.[1],
      url: canonicalUrl || siteConfig.siteUrl,
    })),
  };
  return (
    <SiteLayout>
      <StructuredData data={offerSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Offers", url: "/offers" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Offers" }]}
        eyebrow="Special Offers"
        title={
          <>
            Limited-time <span className="gradient-gold-text italic">luxury</span> deals
          </>
        }
        subtitle="Pamper yourself with our exclusive festive offers. Limited slots only."
      />

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] gradient-luxe p-8 md:p-14 text-marble mb-12 shadow-luxury">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 blur-3xl gradient-gold" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center z-10">
              <div>
                <div className="inline-block text-xs tracking-[0.4em] uppercase text-gold mb-3">
                  Headline Offer
                </div>
                <h2 className="font-display text-3xl md:text-5xl leading-tight">
                  {primaryOffer ? (
                    <>
                      {formatHeadline(primaryOffer.discount, primaryOffer.title)}
                    </>
                  ) : (
                    <>
                      <span className="gradient-gold-text">No active offers</span> right now
                    </>
                  )}
                </h2>
                <p className="mt-4 text-marble/80 font-light leading-relaxed">
                  {primaryOffer
                    ? primaryOffer.desc
                    : "Publish an active offer in the admin panel to feature it here."}
                </p>
                {primaryOffer ? (
                  <>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full gradient-gold w-3/4 animate-shimmer" />
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=I'd%20like%20to%20claim%20${encodeURIComponent(primaryOffer.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 px-7 py-2.5 rounded-[var(--radius-sm)] gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold hover:shadow-luxury transition-all cursor-pointer mt-6"
                    >
                      Claim Offer on WhatsApp <ArrowRight className="w-4 h-4" />
                    </a>
                  </>
                ) : null}
              </div>
              <div>
                {primaryOffer ? (
                  <>
                    <div className="text-center text-xs uppercase tracking-widest text-marble/70 mb-4">
                      Hurry, ends in
                    </div>
                    <CountdownTimer validity={primaryOffer?.validity} days={countdownDays} />
                  </>
                ) : (
                  <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-8 text-center text-marble/80">
                    Offer timers will appear once an active offer is published in admin.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {offers.length > 0 ? (
              offers.map((o, i) => (
                <div key={i} className="gold-border p-7 tilt-card bg-card shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl gradient-royal flex items-center justify-center">
                      <Tag className="w-5 h-5 text-gold" />
                    </div>
                    <div className="font-display text-2xl font-bold text-gold-safe">
                      {o.discount}
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-[var(--royal)]">{o.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{o.desc}</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-[var(--purple-deep)] font-medium">
                      {o.validity}
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=I'd%20like%20to%20claim%20${encodeURIComponent(o.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[var(--royal)] hover:text-[var(--purple-deep)] flex items-center gap-1 cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5" /> Claim
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 rounded-[1.75rem] border border-border bg-card p-10 text-center text-muted-foreground">
                No offers are published yet. Add an offer in the admin panel to display it here.
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
