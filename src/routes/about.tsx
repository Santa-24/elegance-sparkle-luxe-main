import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Award, Sparkles, GraduationCap } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useSiteContent } from "@/lib/content/site-content";
const owner = "/assets/owner.webp";
const salon = "/assets/interior1.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Meet Rasmirekha Swain, founder of Elegance Makeover & Academy. 10+ years of luxury bridal artistry and certified academy in Jajpur Road, Odisha.",
      },
      { property: "og:title", content: "About Elegance Makeover & Academy" },
      {
        property: "og:description",
        content: "Founder story, certified team and academy in Jajpur Road, Odisha.",
      },
    ],
  }),
  component: AboutPage,
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

function AboutPage() {
  const siteContent = useSiteContent();
  const about = siteContent?.about;
  const founderName = about?.founder_name || "Rasmirekha Swain";
  const founderBody =
    about?.body ||
    "With over a decade of experience as a bridal artist, Rasmirekha founded Elegance Makeover & Academy with one mission - to bring international-grade beauty and education to the women of Odisha. Her work blends traditional warmth with modern technique.";
  const founderImage = about?.founder_image_url || owner;
  const galleryImage = about?.gallery_image_url || salon;
  const bulletPoints =
    about?.bullet_points && about.bullet_points.length > 0
      ? about.bullet_points
      : [
          "Internationally certified bridal artist",
          "Premium imported products only",
          "Professional makeup academy with placement support",
        ];

  useScrollReveal();

  return (
    <SiteLayout>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        eyebrow="Our Story"
        title={
          <>
            {about?.headline || (
              <>
                A decade of <span className="gradient-gold-text italic">timeless</span> beauty
              </>
            )}
          </>
        }
        subtitle={
          about?.headline ? about.body : "Crafting confident, radiant women - one bride at a time."
        }
      />

      <section className="marble-bg py-24 md:py-[120px] reveal">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
          <div className="img-zoom overflow-hidden rounded-3xl shadow-luxury">
            <img
              src={founderImage}
              alt={founderName}
              width={800}
              height={1024}
              loading="lazy"
              className="w-full object-cover aspect-[4/5] sm:h-[500px] lg:h-[560px]"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-[var(--purple-deep)]">
              Founder
            </div>
            <h2 className="mt-2 font-display text-4xl text-[var(--royal)] md:text-5xl">
              {founderName}
            </h2>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--purple-deep)] mt-1">
              {about?.founder_title || "Founder"}
            </div>
            <div className="gold-divider !mx-0" />
            <p className="mt-4 leading-relaxed text-muted-foreground">{founderBody}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {bulletPoints.slice(0, 3).map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft"
                >
                  <div className="font-display text-2xl font-bold text-gold-safe">•</div>
                  <div className="mt-1 text-xs text-muted-foreground">{point}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-[var(--purple-deep)]">
              Academy
            </div>
            <h2 className="mt-2 font-display text-4xl text-[var(--royal)] md:text-5xl">
              Learn from the <span className="text-gold-safe italic">best</span>
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3">
            {[
              {
                Icon: GraduationCap,
                t: "Basic Course",
                d: "3 months - Skincare, threading, hair basics, daily makeup",
                p: "Rs 15,000",
              },
              {
                Icon: Award,
                t: "Advanced Course",
                d: "6 months - HD makeup, airbrush, hairstyling, salon management",
                p: "Rs 35,000",
              },
              {
                Icon: Sparkles,
                t: "Pro Bridal Master",
                d: "4 months - Intensive bridal and celebrity-style training",
                p: "Rs 50,000",
              },
            ].map((c) => (
              <div key={c.t} className="tilt-card gold-border p-7 bg-card shadow-soft">
                <c.Icon className="mb-4 h-10 w-10 text-[var(--purple-deep)]" />
                <h3 className="font-display text-2xl text-[var(--royal)]">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <div className="mt-4 font-display text-xl font-bold text-gold-safe">{c.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-[120px] reveal">
        <img
          src={galleryImage}
          alt="Salon interior"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[var(--royal-deep)]/85" />
        <div className="relative mx-auto max-w-5xl px-5 text-marble lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-gold">Our Journey</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              Milestones of <span className="gradient-gold-text italic">excellence</span>
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="relative space-y-10 border-l-2 border-[var(--gold)]/40 pl-8">
            {[
              ["2014", "Started journey as freelance makeup artist"],
              ["2017", "Certified from a leading Mumbai academy"],
              ["2021", "Launched Elegance Makeover & Academy"],
              ["2023", "Crossed 500+ happy brides"],
              ["2025", "Expanded academy with placement support"],
            ].map(([year, text]) => (
              <div key={year} className="relative">
                <div className="absolute -left-[42px] h-5 w-5 rounded-full gradient-gold shadow-gold" />
                <div className="font-display text-2xl text-gold">{year}</div>
                <p className="mt-1 text-marble/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-[var(--purple-deep)]">
              Our Team
            </div>
            <h2 className="mt-2 font-display text-4xl text-[var(--royal)] md:text-5xl">
              Meet the <span className="text-gold-safe italic">artists</span>
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: founderName, role: "Lead Bridal Artist" },
              { name: "Sushree P.", role: "Senior Hair Stylist" },
              { name: "Anita Mohanty", role: "Skincare Therapist" },
              { name: "Anushka Swain", role: "Academy Instructor" },
            ].map((m) => {
              const parts = m.name.split(" ");
              const initials = parts
                .map((p) => p[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <div key={m.name} className="text-center">
                  <div
                    aria-label={`${m.name} - ${m.role}`}
                    className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gold/10 border border-gold/30 shadow-luxury transition-transform hover:scale-105 cursor-default"
                  >
                    <span className="font-display text-4xl font-light text-gold tracking-wide">
                      {initials}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--royal)]">{m.name}</h3>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                    {m.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
