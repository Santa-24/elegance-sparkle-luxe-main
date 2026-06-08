import { createFileRoute } from "@tanstack/react-router";
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

function TestimonialsPage() {
  const { testimonials } = Route.useLoaderData();

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

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="relative rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-luxury"
                >
                  <Quote className="absolute right-5 top-5 h-12 w-12 opacity-20 text-[var(--gold)]" />
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  <p className="italic leading-relaxed text-foreground/85">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="gradient-royal flex h-11 w-11 items-center justify-center rounded-full font-display font-bold text-[var(--gold)]">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs font-medium text-[var(--purple-deep)]">
                        {t.service}
                      </div>
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
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=I%27d%20like%20to%20share%20a%20review`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 font-semibold text-[var(--royal-deep)] shadow-gold"
            >
              <Pen className="h-4 w-4" /> Write a Review
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
