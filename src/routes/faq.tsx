import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

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
      { title: "FAQ - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Frequently asked questions about bridal makeup, salon services, academy courses and bookings in Jajpur Road, Odisha.",
      },
      { property: "og:title", content: "FAQ - Elegance Makeover & Academy" },
      {
        property: "og:description",
        content: "Answers to the most common booking, service and local questions.",
      },
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
            Frequently asked <span className="gradient-gold-text italic">questions</span>
          </>
        }
        subtitle="Clear answers for bookings, services, academy enquiries and local clients."
      />

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
