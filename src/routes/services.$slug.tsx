import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Sparkles,
  Clock,
  IndianRupee,
  CheckCircle2,
  Calendar,
  Phone,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { servicesDetailData, ServiceDetail } from "@/lib/content/services-detail";
import {
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildFaqSchema,
  buildServiceSchema,
  buildCourseSchema,
} from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";
import { trackWhatsAppClick, trackPhoneClick, trackBookingStepComplete } from "@/lib/analytics";

const siteConfig = getSiteConfig();

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = servicesDetailData[params.slug];
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.service) {
      return {
        meta: [{ title: "Service Not Found | Elegance Makeover" }],
      };
    }

    const { service } = loaderData;
    const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/services/${service.slug}`);

    return {
      meta: [
        { title: service.seoTitle },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.seoTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: canonicalUrl || `https://elegancemakeover.makeup/services/${service.slug}`,
        },
        { property: "og:image", content: "https://elegancemakeover.makeup/assets/hero-bride.webp" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: service.seoTitle },
        { name: "twitter:description", content: service.metaDescription },
        {
          name: "twitter:image",
          content: "https://elegancemakeover.makeup/assets/hero-bride.webp",
        },
      ],
      links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
    };
  },
  component: ServiceDetailPage,
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

    return () => observer.disconnect();
  }, []);
}

function ServiceDetailPage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  useScrollReveal();

  const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/services/${service.slug}`);

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ],
    canonicalUrl,
  );

  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.metaDescription,
    canonicalUrl,
    price: service.rawPrice,
  });

  const faqSchema = buildFaqSchema(service.faqs);

  const courseSchema = service.courseDetails
    ? buildCourseSchema({
        name: service.title,
        description: service.metaDescription,
        canonicalUrl,
        duration: service.courseDetails.duration,
        fee: service.rawPrice,
      })
    : null;

  return (
    <SiteLayout>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />
      {courseSchema ? <StructuredData data={courseSchema} /> : null}

      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
        eyebrow={`Maison de Beauté • ${service.category}`}
        title={<>{service.title}</>}
        subtitle={`Artisanal beauty excellence in Jajpur Road, Odisha. Curated by Master Artist Rasmirekha Swain.`}
      />

      {/* QUICK ANSWER / AEO DIRECT SNIPPET BOX */}
      <section className="bg-background pt-12 pb-6 border-b border-border/40">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-card/90 p-6 md:p-8 shadow-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Quick Overview: {service.title}
            </div>
            <p className="mt-3 text-base md:text-lg leading-relaxed font-sans text-foreground/90">
              {service.quickAnswer}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-6 pt-4 border-t border-border/50 text-sm">
              <span className="flex items-center gap-1.5 font-bold text-[var(--royal)]">
                <IndianRupee className="h-4 w-4 text-[var(--gold)]" /> Investment: {service.price}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4 text-[var(--gold)]" /> Duration: {service.duration}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> 100% Genuine Luxury Brands
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SPECIFICATIONS & INCLUSIONS */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="reveal lg:col-span-2 space-y-10">
              {/* WHO IT'S FOR */}
              <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <UserCheck className="h-4 w-4" /> Ideal Candidate
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                  Who is this service designed for?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {service.whoItsFor}
                </p>
              </div>

              {/* WHAT'S INCLUDED */}
              <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Sparkles className="h-4 w-4" /> Package Inclusions
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                  What is included in this experience?
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.whatsIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACADEMY SYLLABUS (IF COURSE) */}
              {service.courseDetails ? (
                <div className="rounded-[2rem] border-2 border-[var(--gold)]/30 bg-muted/30 p-8 md:p-10 shadow-soft">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    <GraduationCap className="h-4 w-4" /> Academy Syllabus & Curriculum
                  </div>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                    Course Modules & Certification
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Awarded:{" "}
                    <strong className="text-foreground">
                      {service.courseDetails.certification}
                    </strong>{" "}
                    • Training Mode:{" "}
                    <strong className="text-foreground">{service.courseDetails.mode}</strong>
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.courseDetails.syllabus.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-card p-3 text-sm font-medium"
                      >
                        <BookOpen className="h-4 w-4 text-[var(--gold)] shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* STEP BY STEP PROCESS (HOWTO) */}
              <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Clock className="h-4 w-4" /> Step-by-Step Methodology
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                  Our Service Process
                </h2>
                <div className="mt-8 space-y-6">
                  {service.processSteps.map((step) => (
                    <div key={step.stepNumber} className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-royal text-sm font-bold text-[var(--gold)] shadow-soft">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-[var(--royal)]">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PREPARATION & AFTERCARE */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-xl text-[var(--royal)] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[var(--gold)]" /> Pre-Service Preparation
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs md:text-sm text-muted-foreground">
                    {service.prepTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--gold)] font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-xl text-[var(--royal)] flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[var(--gold)]" /> Post-Care & Maintenance
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs md:text-sm text-muted-foreground">
                    {service.aftercareTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--gold)] font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* STICKY SIDEBAR BOOKING CARD */}
            <div className="space-y-6">
              <div className="reveal sticky top-28 rounded-[2rem] gradient-luxe p-8 text-marble shadow-soft">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Direct Reservation
                </span>
                <h3 className="mt-2 font-display text-3xl">{service.title}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-marble">
                    {service.price}
                  </span>
                  <span className="text-xs text-marble/70">/ appointment</span>
                </div>
                <p className="mt-2 text-xs text-marble/80">Typical session: {service.duration}</p>

                <div className="mt-8 space-y-3">
                  <Link
                    to="/booking"
                    search={{ service: service.slug }}
                    onClick={() => trackBookingStepComplete(1, service.slug)}
                    className="btn-luxe flex w-full items-center justify-center gap-2 rounded-full gradient-gold px-6 py-4 text-sm font-bold text-[var(--royal-deep)] shadow-gold"
                  >
                    <Calendar className="h-4 w-4" /> Book Appointment
                  </Link>
                  <a
                    href={`https://wa.me/${siteConfig.contactPhone.replace(/[^\d]/g, "")}?text=Hi%20Elegance%20Makeover,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsAppClick(`service_${service.slug}`)}
                    className="btn-luxe flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)]"
                  >
                    Inquire via WhatsApp
                  </a>
                  <a
                    href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, "")}`}
                    onClick={() => trackPhoneClick(`service_${service.slug}`)}
                    className="flex w-full items-center justify-center gap-2 pt-2 text-xs text-marble/80 hover:text-marble transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-[var(--gold)]" /> Call Studio:{" "}
                    {siteConfig.contactPhone}
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-marble/20 text-xs text-marble/75 space-y-2">
                  <div>✓ Advance slot reservation required</div>
                  <div>✓ Clean & sanitized tools used for every client</div>
                  <div>✓ Location: Jajpur Road, Odisha</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SPECIFIC FAQS */}
      <section className="bg-muted/40 py-24 border-t border-border/50">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
              Client Queries
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[var(--royal)]">
              Frequently Asked Questions: {service.title}
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Everything you need to know about pricing, duration, products, and scheduling.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-lg text-[var(--royal)] flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES CROSS-LINKING */}
      <section className="bg-background py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 reveal">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">
                Complementary Care
              </span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--royal)]">
                Related Services You May Like
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 text-sm font-semibold text-[var(--gold)] hover:underline inline-flex items-center gap-1"
            >
              Explore all beauty services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to="/services/$slug"
                params={{ slug: rel.slug }}
                className="reveal rounded-2xl border border-border bg-card p-6 hover:border-[var(--gold)] transition-colors group shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--gold)]">{rel.price}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--gold)] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-3 font-display text-xl text-[var(--royal)] group-hover:text-[var(--gold)] transition-colors">
                  {rel.name}
                </h3>
                <div className="mt-2 text-xs text-muted-foreground">View details & booking →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL BOOKING CALLOUT */}
      <section className="bg-muted/30 py-20 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 text-center reveal">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--royal)]">
            Experience Bespoke Beauty in Jajpur Road
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Book your session for {service.title} today and let our master artists bring out your
            radiant elegance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              search={{ service: service.slug }}
              className="btn-luxe inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4 font-bold text-[var(--royal-deep)] shadow-gold"
            >
              <Calendar className="h-4 w-4" /> Book Appointment Now
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
