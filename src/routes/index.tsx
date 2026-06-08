import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import {
  Crown,
  Sparkles,
  Heart,
  Scissors,
  Wand2,
  GraduationCap,
  Star,
  Award,
  ShieldCheck,
  IndianRupee,
  ArrowRight,
  Quote,
  Instagram,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { GalleryImage, Offer, Service, Testimonial } from "@/lib/data";
import {
  getLiveBlogPostsFn,
  getLiveAdvertisementsFn,
  getLiveGalleryFn,
  getLiveOffersFn,
  getLiveServicesFn,
  getLiveTestimonialsFn,
  getLiveServiceAreasFn,
} from "@/lib/content/live.functions";
import { getSiteConfig } from "@/lib/site-config";
import heroBride from "../assets/hero-bride.webp";
import owner from "../assets/owner.webp";

const siteConfig = getSiteConfig();
type LiveAdvertisement = {
  id: number;
  title: string;
  asset_url: string;
  asset_type: "poster" | "banner" | "carousel" | "story";
  platform: "website" | "instagram" | "facebook" | "whatsapp";
  start_date: string;
  end_date: string;
  status: "active" | "paused" | "archived" | "scheduled";
} | null;

export const Route = createFileRoute("/")({
  loader: async () => {
    const [services, gallery, testimonials, offers, advertisements, serviceAreas, blogPosts] =
      await Promise.all([
        getLiveServicesFn(),
        getLiveGalleryFn(),
        getLiveTestimonialsFn(),
        getLiveOffersFn(),
        getLiveAdvertisementsFn(),
        getLiveServiceAreasFn(),
        getLiveBlogPostsFn(),
      ]);

    return { services, gallery, testimonials, offers, advertisements, serviceAreas, blogPosts };
  },
  head: () => ({
    meta: [
      {
        title: "Elegance Makeover & Academy | Bridal Makeup Salon in Jajpur Road",
      },
      {
        name: "description",
        content:
          "Elegance Makeover & Academy is a premium bridal makeup salon, beauty parlour and academy in Jajpur Road, Odisha, by Rasmirekha Swain. Book luxury beauty services today.",
      },
      {
        property: "og:title",
        content: "Elegance Makeover & Academy | Bridal Makeup Salon in Jajpur Road",
      },
      {
        property: "og:description",
        content:
          "Elegance Makeover & Academy offers premium bridal makeup, parlour services and academy training in Jajpur Road, Odisha.",
      },
    ],
  }),
  component: HomePage,
});

const iconMap = { Crown, Sparkles, Heart, Scissors, Wand2, GraduationCap };

function HomePage() {
  const { services, gallery, testimonials, offers, advertisements, serviceAreas, blogPosts } =
    Route.useLoaderData() as {
      services: Service[];
      gallery: GalleryImage[];
      testimonials: Testimonial[];
      offers: Offer[];
      advertisements: LiveAdvertisement[];
      serviceAreas: Array<{ name: string; summary: string }>;
      blogPosts: Array<{ slug: string; title: string; excerpt: string; category: string }>;
    };
  const [openAdIndex, setOpenAdIndex] = useState<number | null>(null);
  const featuredAdvertisement = advertisements[0] ?? null;
  const activeAdvertisement =
    openAdIndex === null ? null : (advertisements[openAdIndex] ?? featuredAdvertisement);

  useEffect(() => {
    if (openAdIndex === null || advertisements.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAdIndex(null);
      }
      if (advertisements.length > 1 && event.key === "ArrowLeft") {
        setOpenAdIndex((current) =>
          current === null ? 0 : (current - 1 + advertisements.length) % advertisements.length,
        );
      }
      if (advertisements.length > 1 && event.key === "ArrowRight") {
        setOpenAdIndex((current) => (current === null ? 0 : (current + 1) % advertisements.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [advertisements.length, openAdIndex]);

  return (
    <SiteLayout>
      <Hero advertisement={featuredAdvertisement} />
      <AdvertisementShowcase
        advertisement={featuredAdvertisement}
        onOpen={() => setOpenAdIndex(0)}
      />
      <AboutPreview />
      <Services services={services} />
      <BridalShowcase gallery={gallery} />
      <WhyChoose />
      <OfferBanner offers={offers} advertisement={featuredAdvertisement} />
      <Testimonials testimonials={testimonials} />
      <InstaFeed gallery={gallery} />
      <KnowledgeHub posts={blogPosts} />
      <LocalCoverage serviceAreas={serviceAreas} />
      <ContactCTA />
      {activeAdvertisement?.asset_url ? (
        <AdLightbox
          advertisement={activeAdvertisement}
          advertisements={advertisements}
          currentIndex={openAdIndex ?? 0}
          onClose={() => setOpenAdIndex(null)}
          onPrevious={() =>
            setOpenAdIndex((current) =>
              current === null ? 0 : (current - 1 + advertisements.length) % advertisements.length,
            )
          }
          onNext={() =>
            setOpenAdIndex((current) =>
              current === null ? 0 : (current + 1) % advertisements.length,
            )
          }
        />
      ) : null}
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ advertisement }: { advertisement: LiveAdvertisement }) {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden">
      <img
        src={heroBride}
        alt="Luxury bridal makeup by Elegance Makeover"
        width={1672}
        height={941}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, var(--gold) 0, transparent 40%)",
        }}
      />

      {/* floating chip top */}
      <div className="absolute top-20 sm:top-24 md:top-32 left-1/2 -translate-x-1/2 z-10 px-4 w-full flex justify-center">
        <div className="glass rounded-full px-4 sm:px-5 py-2 text-marble text-[10px] sm:text-xs md:text-sm flex items-center gap-2 animate-fade-up max-w-[92vw]">
          <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
          {advertisement
            ? `${advertisement.asset_type === "poster" ? "Poster" : "Promotion"} live now`
            : "Now booking 2026 wedding season"}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5 lg:px-10 text-center text-marble">
        <div className="text-[11px] md:text-xs tracking-[0.5em] uppercase text-[var(--gold)] mb-5 animate-fade-up">
          Bridal · Beauty · Academy
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] animate-fade-up delay-100">
          Transform Your Beauty <br />
          <span className="gradient-gold-text italic">with Elegance</span>
        </h1>
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-xl text-marble/85 max-w-2xl mx-auto animate-fade-up delay-200">
          Expert bridal makeup, premium parlour services and certified academy courses by Rasmirekha
          Swain - in the heart of Jajpur Road, Odisha.
        </p>
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-300">
          <Link
            to="/booking"
            onClick={() => trackEvent("booking_cta_click", { location: "home_hero" })}
            className="btn-luxe inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold"
          >
            Book Appointment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services"
            onClick={() => trackEvent("service_cta_click", { location: "home_hero" })}
            className="btn-luxe inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[var(--gold)] text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)] transition-colors"
          >
            View Services
          </Link>
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-3 sm:gap-4 md:gap-6 animate-fade-up delay-500">
          {[
            ["10+", "Years Experience"],
            ["500+", "Happy Brides"],
            ["50+", "Certified Students"],
          ].map(([n, l]) => (
            <div key={l} className="glass rounded-2xl px-3 py-4 text-center">
              <div className="font-display text-2xl md:text-3xl text-[var(--gold)] font-bold">
                {n}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-marble/70 mt-1">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-marble/70 text-[10px] uppercase tracking-widest">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ---------------- ADVERTISEMENT ---------------- */
function AdvertisementShowcase({
  advertisement,
  onOpen,
}: {
  advertisement: LiveAdvertisement;
  onOpen: () => void;
}) {
  if (!advertisement?.asset_url) {
    return null;
  }

  return (
    <section className="px-5 py-8 sm:py-10 lg:px-10">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View full ad: ${advertisement.title}`}
        className="group mx-auto block w-full max-w-7xl overflow-hidden rounded-[2.25rem] border border-border text-left shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="relative isolate min-h-[420px] overflow-hidden sm:min-h-[520px] lg:min-h-[640px]">
          <img
            src={advertisement.asset_url}
            alt={advertisement.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,22,52,0.82)_0%,rgba(15,22,52,0.42)_48%,rgba(15,22,52,0.74)_100%)]" />
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(circle at 78% 22%, var(--gold) 0, transparent 34%)",
            }}
          />

          <div className="relative z-10 flex min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] items-end">
            <div className="max-w-3xl px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14 text-marble">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                Live Advertisement
              </div>

              <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
                {advertisement.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-marble/85">
                {advertisement.asset_type === "poster"
                  ? "Poster campaign currently published from admin."
                  : advertisement.asset_type === "banner"
                    ? "Banner creative published for the website."
                    : "Campaign creative published from the admin panel."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-marble/80">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md">
                  {advertisement.asset_type}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md">
                  {advertisement.platform}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md">
                  Click to view full ad
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </section>
  );
}

function AdLightbox({
  advertisement,
  advertisements,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  advertisement: NonNullable<LiveAdvertisement>;
  advertisements: LiveAdvertisement[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const showNavigation = advertisements.length > 1;
  return (
    <div className="fixed inset-0 z-[70] bg-[var(--royal-deep)]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 w-12 h-12 rounded-full glass text-marble flex items-center justify-center"
        aria-label="Close ad preview"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative max-h-[90vh] max-w-[96vw] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-luxury">
        {showNavigation ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-4">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="View previous ad"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-marble backdrop-blur-md transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="View next ad"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-marble backdrop-blur-md transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
        <img
          src={advertisement.asset_url}
          alt={advertisement.title}
          className="max-h-[90vh] max-w-[96vw] object-contain"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-marble">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
              Ad Preview
            </div>
            <div className="mt-1 font-display text-xl">{advertisement.title}</div>
            {showNavigation ? (
              <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-marble/60">
                {currentIndex + 1} of {advertisements.length}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-marble/80 backdrop-blur-md">
            <Eye className="h-3.5 w-3.5 text-[var(--gold)]" />
            Full size
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ABOUT PREVIEW ---------------- */
function AboutPreview() {
  return (
    <section className="marble-bg py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="absolute -inset-4 gradient-gold rounded-3xl opacity-40 blur-2xl" />
          <div className="relative img-zoom rounded-3xl overflow-hidden shadow-luxury">
            <img
              src={owner}
              alt="Rasmirekha Swain - Founder of Elegance Makeover"
              width={800}
              height={1024}
              loading="lazy"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 glass-light rounded-2xl p-4">
              <div className="font-display text-lg font-bold text-[var(--royal-deep)]">
                Rasmirekha Swain
              </div>
              <div className="text-xs text-muted-foreground">Founder · Lead Makeup Artist</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)] mb-3">
            About Us
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] leading-tight">
            A decade of crafting <span className="gradient-gold-text italic">timeless brides</span>.
          </h2>
          <div className="gold-divider !mx-0" />
          <p className="text-muted-foreground mt-5 text-base md:text-lg leading-relaxed">
            Elegance Makeover & Academy was founded by Rasmirekha Swain with a simple promise -
            every woman deserves to feel like royalty. With 10+ years of expertise and an
            internationally certified team, we blend traditional Odia elegance with modern HD
            glamour.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Internationally certified bridal artist",
              "Premium imported products only",
              "Professional makeup academy with placement support",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-[var(--royal-deep)]" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            onClick={() =>
              trackEvent("internal_link_click", {
                location: "home_about_preview",
                target: "/about",
              })
            }
            className="mt-8 inline-flex items-center gap-2 text-[var(--royal)] font-semibold hover:gap-3 transition-all"
          >
            Learn more about us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services({ services }: { services: Service[] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
            Our Services
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
            Curated <span className="gradient-gold-text italic">luxury</span> experiences
          </h2>
          <div className="gold-divider" />
          <p className="text-muted-foreground mt-2">
            Every service is crafted with premium products, expert hands and an unmatched eye for
            detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((s, i) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <div
                  key={s.title}
                  className={`tilt-card group bg-card rounded-3xl p-7 border border-border ${s.featured ? "gold-border" : ""}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {s.featured && (
                    <div className="inline-block text-[10px] tracking-widest uppercase gradient-gold text-[var(--royal-deep)] px-3 py-1 rounded-full font-semibold mb-4">
                      Most Popular
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-2xl gradient-royal flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--royal)]">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Starting
                      </div>
                      <div className="font-display text-lg font-bold gradient-gold-text">
                        {s.price}
                      </div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/70">
                      {s.duration}
                    </div>
                  </div>
                  <Link
                    to="/booking"
                    onClick={() =>
                      trackEvent("booking_cta_click", {
                        location: "home_service_card",
                        service: s.title,
                      })
                    }
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:text-[var(--purple-deep)]"
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
  );
}

/* ---------------- BRIDAL SHOWCASE ---------------- */
function BridalShowcase({ gallery }: { gallery: GalleryImage[] }) {
  const bridalImages = gallery.filter((image): image is GalleryImage =>
    Boolean(image?.src && image?.alt),
  );
  const bridalOnly = bridalImages.filter((image) => image.cat === "Bridal");
  const featuredImages = bridalOnly;
  const featuredImage = featuredImages[0];
  const secondaryImages = featuredImages.slice(1);

  return (
    <section className="gradient-luxe overflow-hidden py-20 text-marble md:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)]">
            Latest Bridal Work
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Bridal stories in <span className="gradient-gold-text italic">focus</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-4 text-sm leading-relaxed text-marble/75 md:text-base">
            A curated look at our newest bridal transformations, chosen to feel polished, editorial,
            and unmistakably premium.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="img-zoom group overflow-hidden rounded-[2rem] border border-white/10 shadow-luxury">
            <div className="relative aspect-[4/5] md:aspect-[16/10]">
              {featuredImage ? (
                <img
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5 px-8 text-center">
                  <div>
                    <div className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">
                      Bridal Showcase
                    </div>
                    <div className="mt-3 font-display text-2xl md:text-3xl">
                      New bridal imagery will appear here soon
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                  Bridal Highlight
                </div>
                <h3 className="mt-4 font-display text-3xl md:text-4xl">
                  {featuredImage?.alt ?? "Bridal transformations on display"}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-marble/80">
                  One frame, fully polished for the kind of bridal presentation that feels
                  luxurious, modern and editorial.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {secondaryImages.length > 0 ? (
              secondaryImages.map((g, i) => (
                <div
                  key={g.alt}
                  className={`img-zoom group overflow-hidden rounded-[1.75rem] border border-white/10 shadow-soft ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                  }`}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                        {g.cat}
                      </div>
                      <div className="mt-1 font-display text-lg">{g.alt}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex min-h-[18rem] items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/5 px-6 text-center text-marble/70">
                More bridal work will appear here as soon as the gallery is populated.
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/gallery"
            onClick={() => trackEvent("gallery_cta_click", { location: "home_showcase" })}
            className="btn-luxe inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--royal-deep)] transition-colors"
          >
            Explore Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ---------------- */
function WhyChoose() {
  const items = [
    {
      Icon: Award,
      title: "Expert Team",
      desc: "Certified makeup artists with 10+ years of bridal expertise.",
    },
    {
      Icon: ShieldCheck,
      title: "Premium Products",
      desc: "Only luxury imported brands - MAC, Huda, Charlotte Tilbury & more.",
    },
    {
      Icon: GraduationCap,
      title: "Academy Certified",
      desc: "Government-recognized makeup courses with placement assistance.",
    },
    {
      Icon: IndianRupee,
      title: "Affordable Luxury",
      desc: "Five-star service at honest, transparent prices. No hidden costs.",
    },
  ];
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
            Why Choose Us
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
            The <span className="gradient-gold-text italic">Elegance</span> difference
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 rounded-3xl bg-card border border-border hover:shadow-luxury hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl mx-auto gradient-gold flex items-center justify-center mb-5 shadow-gold">
                <Icon className="w-7 h-7 text-[var(--royal-deep)]" />
              </div>
              <h3 className="font-display text-xl text-[var(--royal)]">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- OFFER BANNER ---------------- */
function OfferBanner({
  offers,
  advertisement,
}: {
  offers: Offer[];
  advertisement: LiveAdvertisement;
}) {
  const primaryOffer = offers[0];
  const countdownDays = getCountdownDays(primaryOffer?.validity);
  return (
    <section className="px-5 lg:px-10 py-12">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] gradient-luxe text-marble p-8 md:p-14">
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--purple-deep)" }}
        />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">
              Festive Special
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              {primaryOffer ? (
                <>
                  Flat <span className="gradient-gold-text">{primaryOffer.discount}</span> <br />
                  on {primaryOffer.title.toLowerCase()}
                </>
              ) : (
                <>
                  <span className="gradient-gold-text">No active offers</span> <br />
                  are published yet
                </>
              )}
            </h2>
            <p className="mt-4 text-marble/80 max-w-md">
              {primaryOffer
                ? primaryOffer.desc
                : "Publish an offer in the admin panel to feature it on the homepage."}
            </p>
            <Link
              to="/offers"
              onClick={() => trackEvent("offer_cta_click", { location: "home_offer_banner" })}
              className="btn-luxe mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold"
            >
              {primaryOffer ? "Grab Offer" : "Manage Offers"} <ArrowRight className="w-4 h-4" />
            </Link>
            {advertisement ? (
              <div className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-marble/80">
                {advertisement.asset_type} campaign
              </div>
            ) : null}
          </div>
          <div>
            {primaryOffer ? (
              <>
                <div className="text-center text-xs uppercase tracking-widest text-marble/70 mb-4">
                  Offer ends in
                </div>
                <CountdownTimer days={countdownDays} />
              </>
            ) : (
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-8 text-center text-marble/80">
                Once an active offer is published, its timer and CTA will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function getCountdownDays(validity?: string) {
  if (!validity) {
    return 15;
  }

  const dates = validity.match(/\d{4}-\d{2}-\d{2}/g);
  const endDate = dates?.[dates.length - 1];
  if (!endDate) {
    return 15;
  }

  const target = new Date(`${endDate}T23:59:59`);
  if (Number.isNaN(target.getTime())) {
    return 15;
  }

  return Math.max(1, Math.ceil((target.getTime() - Date.now()) / 86400000));
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
            Client Love
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
            Words from our <span className="gradient-gold-text italic">brides</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-3xl p-7 hover:shadow-luxury hover:-translate-y-1 transition-all duration-500 relative"
            >
              <Quote className="absolute top-5 right-5 w-10 h-10 text-[var(--gold)] opacity-20" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="text-foreground/85 leading-relaxed italic">"{t.text}"</p>
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <div className="w-11 h-11 rounded-full gradient-royal flex items-center justify-center text-[var(--gold)] font-display font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM ---------------- */
function InstaFeed({ gallery }: { gallery: GalleryImage[] }) {
  const feedImages = gallery.filter((image): image is GalleryImage =>
    Boolean(image?.src && image?.alt),
  );

  return (
    <section className="marble-bg py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
              Instagram
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
              Follow our <span className="gradient-gold-text italic">stories</span>
            </h2>
          </div>
          <a
            href="#"
            className="btn-luxe inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-royal text-marble self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" /> @elegancemakeover
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {feedImages.length > 0 ? (
            feedImages.map((g, i) => (
              <div
                key={i}
                className="aspect-square img-zoom rounded-2xl overflow-hidden relative group"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--royal-deep)]/0 group-hover:bg-[var(--royal-deep)]/60 transition-colors flex items-center justify-center">
                  <Instagram className="w-7 h-7 text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
              Gallery images will appear here once content is published.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function KnowledgeHub({
  posts,
}: {
  posts: Array<{ slug: string; title: string; excerpt: string; category: string }>;
}) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
              Knowledge Hub
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
              Helpful answers and <span className="gradient-gold-text italic">guides</span>
            </h2>
          </div>
          <Link
            to="/blog"
            onClick={() => trackEvent("blog_cta_click", { location: "home_knowledge_hub" })}
            className="btn-luxe inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-royal text-marble self-start md:self-auto"
          >
            Visit Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <article
                key={post.slug}
                className="rounded-[1.75rem] border border-border bg-card p-6 shadow-soft"
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                  {post.category}
                </div>
                <h3 className="mt-2 font-display text-2xl text-[var(--royal)]">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  onClick={() =>
                    trackEvent("blog_article_click", {
                      location: "home_knowledge_hub",
                      slug: post.slug,
                    })
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:text-[var(--purple-deep)]"
                >
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] gradient-luxe p-7 text-marble shadow-luxury">
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)]">Fast Links</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { title: "FAQ", to: "/faq", desc: "Booking, services and local answers." },
                {
                  title: "Service Areas",
                  to: "/service-areas",
                  desc: "Cities and regions we cover.",
                },
                { title: "Booking", to: "/booking", desc: "Reserve your bridal or salon slot." },
                { title: "Contact", to: "/contact", desc: "Phone, WhatsApp and map details." },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  onClick={() =>
                    trackEvent("internal_link_click", {
                      location: "home_knowledge_hub",
                      target: item.to,
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="font-display text-xl text-[var(--gold)]">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-marble/75">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocalCoverage({
  serviceAreas,
}: {
  serviceAreas: Array<{ name: string; summary: string }>;
}) {
  return (
    <section className="marble-bg py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
              Nearby Service Areas
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
              Local coverage that feels <span className="gradient-gold-text italic">close</span>
            </h2>
          </div>
          <Link
            to="/service-areas"
            onClick={() =>
              trackEvent("service_area_cta_click", { location: "home_local_coverage" })
            }
            className="btn-luxe inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-royal text-marble self-start md:self-auto"
          >
            View all areas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {serviceAreas.slice(0, 3).map((area) => (
            <div
              key={area.name}
              className="rounded-[1.75rem] border border-border bg-card p-6 shadow-soft"
            >
              <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                {area.name}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT CTA ---------------- */
function ContactCTA() {
  return (
    <section className="gradient-royal text-marble py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center">
        <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-3">Let's Talk</div>
        <h2 className="font-display text-4xl md:text-6xl">
          Ready to look <span className="gradient-gold-text italic">stunning?</span>
        </h2>
        <p className="text-marble/80 mt-5 max-w-xl mx-auto">
          Book a free consultation or call us directly - we'll design a beauty experience just for
          you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/booking"
            onClick={() => trackEvent("booking_cta_click", { location: "home_contact_cta" })}
            className="btn-luxe px-7 py-3.5 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold"
          >
            Book Appointment
          </Link>
          <a
            href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
            onClick={() => trackEvent("phone_click", { location: "home_contact_cta" })}
            className="btn-luxe px-7 py-3.5 rounded-full border-2 border-[var(--gold)] text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)] transition-colors"
          >
            Call {siteConfig.contactPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
