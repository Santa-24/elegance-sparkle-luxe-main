import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Sparkles, Mic } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { getLiveFaqSectionsFn } from "@/lib/content/live.functions";
import type { FaqSection } from "@/lib/content/faq";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/faq");

export const Route = createFileRoute("/faq")({
  loader: async () => {
    const faqSections = await getLiveFaqSectionsFn();
    return { faqSections };
  },
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Frequently asked questions about bridal makeup, salon services, academy certification and bookings in Jajpur Road, Odisha.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Elegance Makeover" },
      {
        property: "og:description",
        content:
          "Answers to common questions about bridal packages, academy courses, and bookings.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://elegancemakeover.makeup/faq" },
      { property: "og:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Frequently Asked Questions | Elegance Makeover" },
      {
        name: "twitter:description",
        content: "Answers to common questions about bridal packages & academy courses.",
      },
      { name: "twitter:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
    ],
  }),
  component: FaqPage,
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

function FaqPage() {
  const { faqSections } = Route.useLoaderData() as { faqSections: FaqSection[] };
  const allFaqItems = faqSections.flatMap((section) => section.items);

  useScrollReveal();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <SiteLayout>
      <StructuredData data={faqSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "FAQ", url: "/faq" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}

      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        eyebrow="Help Center"
        title={
          <>
            Frequently Asked <span className="gradient-gold-text italic">Questions</span>
          </>
        }
        subtitle="Clear answers for bookings, services, academy enquiries and local clients in Jajpur Road, Odisha."
      />

      {/* QUICK ANSWER / AEO DIRECT ANSWER BLOCK */}
      <section className="bg-background pt-10 pb-4 border-b border-border/40">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-card/90 p-6 md:p-8 shadow-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Quick Answer: Booking & Service Questions
            </div>
            <p className="mt-3 text-base md:text-lg leading-relaxed font-sans text-foreground/90">
              Elegance Makeover & Academy is located in Jajpur Road, Odisha (PIN 755019). We offer
              in-studio appointments and venue travel across Odisha for bridal makeovers
              (₹8,000–₹16,000), parlour treatments, and professional makeup academy courses
              (₹15,000–₹35,000). Book online or via WhatsApp at +91 92652 00523.
            </p>
          </div>
        </div>
      </section>

      {/* VOICE-SEARCH Q&A (CONVERSATIONAL AEO 25-40 WORDS) */}
      <section className="bg-muted/30 py-16 border-b border-border/50">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              <Mic className="h-3.5 w-3.5" /> Voice & AI Search Fast Answers
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl text-[var(--royal)]">
              Direct Answers to Common Voice Inquiries
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "How much is bridal makeup in Jajpur Road?",
                a: "Bridal makeup at Elegance Makeover in Jajpur Road starts at ₹8,000 for classic HD packages and goes up to ₹16,000 for luxury HD Airbrush, which includes hair styling, draping, and jewellery fitting.",
              },
              {
                q: "Which is the top-rated bridal makeup artist in Jajpur Road?",
                a: "Elegance Makeover & Academy, founded by Master Artist Rasmirekha Swain, is the leading bridal studio in Jajpur Road, with 10+ years of expertise and over 500 happy brides styled across Odisha.",
              },
              {
                q: "Does Elegance Makeover travel to wedding venues in Odisha?",
                a: "Yes, Master Artist Rasmirekha Swain and her bridal team travel to venues in Vyasanagar, Jajpur Town, Kalinganagar, Panikoili, Bhadrak, Cuttack, and Bhubaneswar with complete mobile vanity setups.",
              },
              {
                q: "How can I enroll in the professional makeup course in Jajpur Road?",
                a: "You can enroll directly by calling or messaging +91 92652 00523. Course fees range from ₹15,000 to ₹35,000 with hands-on training on live models and certified diplomas.",
              },
            ].map((voiceFaq, i) => (
              <div
                key={i}
                className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-base font-bold text-[var(--royal)] flex items-start gap-2">
                  <span className="text-[var(--gold)] font-bold">Q:</span> {voiceFaq.q}
                </h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed pl-5">
                  {voiceFaq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-8 md:gap-12">
            {faqSections.map((section) => (
              <article
                key={section.slug}
                id={section.slug}
                className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-8"
              >
                <div className="max-w-2xl">
                  <div className="text-xs uppercase tracking-[0.4em] text-[var(--purple-deep)] font-semibold">
                    {section.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl border border-border bg-background/70 p-5 transition-colors open:border-gold/30"
                    >
                      <summary className="cursor-pointer list-none font-display text-lg text-[var(--royal)]">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-[2rem] gradient-royal px-6 py-8 text-center text-marble md:flex-row md:text-left shadow-luxury">
            <div>
              <h2 className="font-display text-3xl">Still have a question?</h2>
              <p className="mt-2 text-sm text-marble/80">
                Message us directly and we’ll help you choose the right service or booking slot.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] gradient-gold px-6 py-2.5 font-semibold text-[var(--royal-deep)] shadow-gold hover:shadow-luxury transition-all cursor-pointer"
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] border border-gold px-6 py-2.5 font-semibold text-marble hover:bg-gold hover:text-[var(--royal-deep)] transition-all cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
