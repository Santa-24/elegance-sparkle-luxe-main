import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Star, Quote, Pen } from "lucide-react";

import { getLiveTestimonialsFn } from "@/lib/content/live.functions";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();

export const Route = createFileRoute("/testimonials")({
  loader: async () => {
    const testimonials = await getLiveTestimonialsFn();
    return { testimonials };
  },
  head: () => ({
    meta: [
      { title: "Reviews - Elegance Makeover" },
      {
        name: "description",
        content:
          "Read what our brides and clients say about Elegance Makeover & Academy. Real reviews from real women.",
      },
      { property: "og:title", content: "Client Reviews - Elegance Makeover" },
      { property: "og:description", content: "500+ happy brides share their experience." },
    ],
  }),
  component: TestimonialsPage,
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

const seedTestimonials: Testimonial[] = [
  {
    name: "Priyanka Mohanty",
    service: "Bridal Makeup",
    rating: 5,
    text: "Rasmirekha di made me look like a royal bride on my wedding day! The makeup was flawless, sat beautifully all night, and looked amazing in photos. Everyone praised the elegant styling. Highly recommend Elegance Makeover!",
    date: "December 2025",
  },
  {
    name: "Sunita Sahoo",
    service: "Academy Enrollment",
    rating: 5,
    text: "Enrolling in the basic beauty course at Elegance Academy was the best decision. The hands-on training on real models gave me so much confidence. Rasmirekha di and Anushka di are excellent mentors!",
    date: "January 2026",
  },
  {
    name: "Arpita Das",
    service: "Premium Facial",
    rating: 5,
    text: "Had a premium facial done for my engagement function. The glow was absolutely stunning and lasted for days. Very professional service and a neat, luxurious salon environment.",
    date: "November 2025",
  },
  {
    name: "Mamata Panda",
    service: "Party Makeup",
    rating: 5,
    text: "Got my party makeup done for a cousin's reception. Rasmirekha di kept it minimal and elegant, exactly how I wanted. It felt so light and stayed fresh throughout the night without getting cakey.",
    date: "February 2026",
  },
  {
    name: "Reena Biswal",
    service: "Academy Enrollment",
    rating: 5,
    text: "Completed my advanced bridal masterclass here. The training was so detailed, covering advanced base techniques, draping, and eye makeup. I'm now taking independent bridal bookings in Jajpur!",
    date: "March 2026",
  },
  {
    name: "Kavya Nayak",
    service: "Threading & Brows",
    rating: 5,
    text: "The staff is so professional and gentle. They did my eyebrows with absolute precision and almost zero pain. Easily the best beauty parlour on Jajpur Road for regular grooming.",
    date: "October 2025",
  },
  {
    name: "Smriti Rath",
    service: "Hair Styling & Cut",
    rating: 5,
    text: "Superb experience! I was nervous about getting a short haircut, but the stylist suggested a look that completely suits my face shape. The final hair styling was absolutely gorgeously done.",
    date: "September 2025",
  },
  {
    name: "Deepika Mishra",
    service: "Bridal Makeup",
    rating: 5,
    text: "Excellent service! Rasmirekha di and her team are extremely professional, punctual, and use top-quality international brands. They made my wedding day preparation completely stress-free.",
    date: "May 2026",
  },
];

function TestimonialsPage() {
  const { testimonials } = Route.useLoaderData();

  useScrollReveal();

  const dbNames = new Set(testimonials.map((t) => t.name));
  const uniqueSeed = seedTestimonials.filter((s) => !dbNames.has(s.name));
  const allTestimonials = [...testimonials, ...uniqueSeed];

  return (
    <SiteLayout>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
        eyebrow="Reviews"
        title={
          <>
            Loved by <span className="gradient-gold-text italic">500+</span> brides
          </>
        }
        subtitle="Real stories from real women whose special days we got to be a part of."
      />

      <section className="bg-background py-12 border-b border-border reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-gold/10 border border-gold/30 px-6 py-2">
            <span className="text-lg font-bold text-gold">4.9 ★</span>
            <span className="text-sm font-semibold text-foreground/80">Average Rating</span>
            <span className="h-1.5 w-1.5 rounded-full bg-border"></span>
            <span className="text-sm font-bold text-gold uppercase tracking-wider">
              500+ Happy Brides
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-[120px] reveal">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          {allTestimonials.length > 0 ? (
            <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
              {allTestimonials.map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="relative rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-luxury shadow-soft"
                >
                  <Quote className="absolute right-5 top-5 h-12 w-12 opacity-20 text-gold" />
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="italic leading-relaxed text-foreground/85">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="gradient-royal flex h-11 w-11 items-center justify-center rounded-full font-display font-bold text-gold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--purple-deep)] mt-1">
                        {t.service}
                      </div>
                      {t.date && (
                        <div className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                          {t.date}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
              Client reviews will appear here once testimonials are published.
            </div>
          )}

          <div className="mt-14 text-center">
            <a
              href="https://wa.me/919265200523?text=I'd%20like%20to%20share%20my%20review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 px-7 py-2.5 rounded-[var(--radius-sm)] gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold hover:shadow-luxury transition-all cursor-pointer"
            >
              <Pen className="h-4 w-4" /> Write a Review
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
