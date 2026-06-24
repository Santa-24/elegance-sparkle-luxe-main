import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { getCountdownDays } from "@/lib/utils/formatting";
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

    const elements = document.querySelectorAll(".reveal, .img-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

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
  useScrollReveal();
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
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0d0a07]">
      {/* Background Image */}
      <img
        src={heroBride}
        alt="Luxury bridal makeup by Elegance Makeover"
        width={1672}
        height={941}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0d0a07]/75" />
      
      {/* Gold Grid Overlay (3% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #c9a96e 1px, transparent 1px),
            linear-gradient(to bottom, #c9a96e 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Dual Vertical Gold Rules */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-[#c9a96e]/15 hidden sm:block" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-[#c9a96e]/15 hidden sm:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#f5e6d0] pt-12 md:pt-16">
        {/* Active Promotion Chip inline to prevent overlap */}
        <div className="inline-flex justify-center mb-5 animate-fade-up">
          <div className="border border-[#c9a96e]/30 bg-[#161009]/80 px-4 py-1.5 text-[#f5e6d0] text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 max-w-[92vw]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
            {advertisement
              ? `${advertisement.asset_type === "poster" ? "Poster" : "Promotion"} live now`
              : "Now booking 2026 wedding season"}
          </div>
        </div>

        <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4 animate-fade-up">
          Bridal · Beauty · Academy
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.1] tracking-tight animate-fade-up delay-100">
          Where every bride <br />
          becomes <span className="italic font-display text-[#c9a96e]">unforgettable</span>
        </h1>
        
        <p className="mt-6 text-xs sm:text-sm md:text-base text-[#f5e6d0]/80 max-w-xl mx-auto font-light leading-relaxed animate-fade-up delay-200">
          Expert bridal makeup, premium parlour services and certified academy courses by Rasmirekha
          Swain — in the heart of Jajpur Road, Odisha.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-300">
          <Link
            to="/booking"
            onClick={() => trackEvent("booking_cta_click", { location: "home_hero" })}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-8 bg-[#c9a96e] text-[#0d0a07] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d9c49e] transition-colors rounded-none"
          >
            Book Appointment <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/services"
            onClick={() => trackEvent("service_cta_click", { location: "home_hero" })}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-8 border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors font-semibold text-xs tracking-[0.2em] uppercase rounded-none"
          >
            View Services
          </Link>
        </div>

        {/* Stats Band inside Hero with thin gold lines */}
        <div className="border-t border-[#c9a96e]/20 pt-8 mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto animate-fade-up delay-500">
          {[
            ["10+", "Years Experience"],
            ["500+", "Happy Brides"],
            ["50+", "Certified Students"],
          ].map(([n, l]) => (
            <div key={l} className="text-center px-2">
              <div className="font-display text-2xl sm:text-3xl text-[#c9a96e] font-light">{n}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#f5e6d0]/60 mt-1 font-body">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f5e6d0]/50 text-[9px] uppercase tracking-[0.3em]">
        <span>Scroll</span>
        <div className="w-[1px] h-8 bg-[#c9a96e]/30" />
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
    <section className="px-6 py-12 max-w-7xl mx-auto reveal">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View full ad: ${advertisement.title}`}
        className="group w-full text-left border border-[#c9a96e]/20 bg-[#161009] cursor-pointer transition-colors hover:border-[#c9a96e]/50"
      >
        <div className="relative isolate min-h-[360px] md:min-h-[480px] overflow-hidden flex items-end">
          <img
            src={advertisement.asset_url}
            alt={advertisement.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Flat overlay */}
          <div className="absolute inset-0 bg-[#0d0a07]/80" />
          
          <div className="relative z-10 max-w-3xl p-6 sm:p-10 md:p-12 text-[#f5e6d0]">
            <div className="inline-flex items-center gap-2 border border-[#c9a96e]/30 bg-[#0d0a07]/80 px-3.5 py-1 text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
              Live Advertisement
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {advertisement.title}
            </h2>

            <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#f5e6d0]/80 font-light">
              {advertisement.asset_type === "poster"
                ? "Special brand campaign published live. Tap to see the details."
                : "Limited-time event creative. Tap to view full size details."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.2em]">
              <span className="border border-[#c9a96e]/25 bg-[#0d0a07] px-2.5 py-1 text-[#c9a96e]">
                {advertisement.asset_type}
              </span>
              <span className="border border-[#c9a96e]/25 bg-[#0d0a07] px-2.5 py-1 text-[#c9a96e]">
                {advertisement.platform}
              </span>
              <span className="border border-[#c9a96e]/25 bg-[#c9a96e] text-[#0d0a07] px-2.5 py-1 font-semibold">
                Click to Expand
              </span>
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
    <div className="fixed inset-0 z-[70] bg-[#0d0a07]/95 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 w-12 h-12 border border-[#c9a96e]/30 bg-[#0d0a07] text-[#c9a96e] flex items-center justify-center hover:bg-[#c9a96e] hover:text-[#0d0a07] transition-colors"
        aria-label="Close ad preview"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative max-h-[90vh] max-w-[96vw] overflow-hidden border border-[#c9a96e]/20 bg-[#0d0a07]">
        {showNavigation ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="View previous ad"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center border border-[#c9a96e]/30 bg-[#0d0a07] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0a07] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="View next ad"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center border border-[#c9a96e]/30 bg-[#0d0a07] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0a07] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
        <img
          src={advertisement.asset_url}
          alt={advertisement.title}
          className="max-h-[85vh] max-w-[92vw] object-contain mx-auto"
        />
        <div className="absolute bottom-0 inset-x-0 bg-[#0d0a07]/90 border-t border-[#c9a96e]/20 p-4 sm:p-6 text-[#f5e6d0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]">
                Ad Preview
              </div>
              <div className="mt-1 font-display text-lg sm:text-xl font-light">{advertisement.title}</div>
              {showNavigation ? (
                <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#f5e6d0]/50">
                  {currentIndex + 1} of {advertisements.length}
                </div>
              ) : null}
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e]">
              <Eye className="h-3.5 w-3.5" />
              Full size view
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ABOUT PREVIEW ---------------- */
function AboutPreview() {
  return (
    <section className="bg-[#f9f5ef] text-[#0d0a07] py-24 md:py-[120px] reveal border-y border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo Container with Custom Gold Corner Brackets */}
        <div className="relative max-w-md mx-auto lg:max-w-none w-full">
          <div className="relative p-4 border border-[#c9a96e]/30">
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c9a96e]" />
            {/* Top Right Bracket */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#c9a96e]" />
            {/* Bottom Left Bracket */}
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#c9a96e]" />
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#c9a96e]" />
            
            <div className="overflow-hidden">
              <img
                src={owner}
                alt="Rasmirekha Swain - Founder of Elegance Makeover"
                width={800}
                height={1024}
                loading="lazy"
                className="w-full h-[520px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 bg-[#0d0a07] border border-[#c9a96e]/30 p-4 text-[#f5e6d0]">
            <div className="font-display text-lg font-light tracking-wide text-[#c9a96e]">
              Rasmirekha Swain
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#f5e6d0]/70 mt-0.5">
              Founder · Lead Makeup Artist
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
            About Us
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#0d0a07] font-light leading-tight">
            A decade of crafting <span className="italic font-display text-[#c9a96e]">timeless beauty</span>.
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] my-6" />
          
          <p className="text-[#0d0a07]/80 text-sm md:text-base leading-relaxed font-light">
            Elegance Makeover & Academy was founded by Rasmirekha Swain with a simple promise —
            every woman deserves to feel like royalty. With 10+ years of expertise and an
            internationally certified team, we blend traditional Odia elegance with modern HD
            glamour.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] border border-[#c9a96e]/40 text-[#0d0a07] font-medium bg-transparent">
              Certified Bridal Artist
            </span>
            <span className="px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] border border-[#c9a96e]/40 text-[#0d0a07] font-medium bg-transparent">
              Premium Imported Products
            </span>
            <span className="px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] border border-[#c9a96e]/40 text-[#0d0a07] font-medium bg-transparent">
              Professional Academy
            </span>
          </div>

          <ul className="mt-8 space-y-3.5 text-xs text-[#0d0a07]/90 font-light">
            {[
              "Personally trained under elite international masters",
              "Individual hygiene protocol with sterile luxury kits",
              "Comprehensive makeup courses with professional certification",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#c9a96e] shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              to="/about"
              onClick={() =>
                trackEvent("internal_link_click", {
                  location: "home_about_preview",
                  target: "/about",
                })
              }
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0d0a07] border-b border-[#c9a96e] pb-1 font-semibold hover:text-[#c9a96e] transition-colors"
            >
              Explore Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services({ services }: { services: Service[] }) {
  return (
    <section className="bg-[#0d0a07] text-[#f5e6d0] py-24 md:py-[120px] reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-[1px] w-8 bg-[#c9a96e]/40" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Our Services</span>
            <div className="h-[1px] w-8 bg-[#c9a96e]/40" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[#f5e6d0]">
            Curated <span className="italic text-[#c9a96e]">luxury</span> experiences
          </h2>
          <p className="text-[#f5e6d0]/70 text-xs md:text-sm font-light mt-4 max-w-md mx-auto leading-relaxed">
            Every service is crafted with premium products, expert hands and an unmatched eye for
            detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((s, i) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <div
                  key={s.title}
                  className="group bg-[#161009] p-6 border-t-2 border-t-[#c9a96e] border-x border-b border-[#c9a96e]/20 hover:border-[#c9a96e] transition-colors duration-500 flex flex-col justify-between min-h-[320px]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div>
                    <div className="w-12 h-12 border border-[#c9a96e]/30 flex items-center justify-center mb-6 text-[#c9a96e]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {s.featured && (
                      <span className="inline-block text-[8px] tracking-[0.2em] uppercase bg-[#c9a96e] text-[#0d0a07] px-2.5 py-0.5 font-semibold mb-3">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-display text-xl sm:text-2xl font-light text-[#f5e6d0]">{s.title}</h3>
                    <p className="text-[#f5e6d0]/70 text-xs mt-2.5 font-light leading-relaxed">{s.desc}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#c9a96e]/10">
                      <div>
                        <div className="text-[8px] uppercase tracking-widest text-[#f5e6d0]/50">
                          Starting From
                        </div>
                        <div className="font-display text-base font-light text-[#c9a96e] mt-0.5">
                          {s.price}
                        </div>
                      </div>
                      <div className="text-[9px] tracking-wider uppercase border border-[#c9a96e]/20 px-2 py-0.5 text-[#f5e6d0]/80">
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
                      className="mt-4 w-full justify-center inline-flex h-9 items-center gap-2 border border-[#c9a96e]/30 text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0a07] transition-all font-semibold"
                    >
                      Book Session <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full border border-[#c9a96e]/20 bg-[#161009] p-10 text-center text-xs text-[#f5e6d0]/75">
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
  const featuredImage = bridalOnly[0];
  const secondaryImages = bridalOnly.slice(1, 5);

  return (
    <section className="bg-[#f9f5ef] text-[#0d0a07] py-24 md:py-[120px] reveal border-t border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
            Latest Bridal Work
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[#0d0a07]">
            Bridal transformations <span className="italic text-[#c9a96e]">in focus</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-4" />
          <p className="mt-4 text-xs md:text-sm text-[#0d0a07]/80 font-light leading-relaxed max-w-md mx-auto">
            A curated look at our newest bridal transformations, chosen to feel polished, editorial,
            and unmistakably premium.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* 1 Large Cell (spans 2 columns and 2 rows on desktop) */}
          {featuredImage ? (
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden border border-[#c9a96e]/20 aspect-[4/3] md:aspect-auto">
              <img
                src={featuredImage.src}
                alt={featuredImage.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0d0a07]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-[#f5e6d0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block border border-[#c9a96e]/40 bg-[#0d0a07] px-2.5 py-0.5 text-[8px] uppercase tracking-[0.2em] text-[#c9a96e]">
                  Featured Transformation
                </span>
                <h3 className="mt-2 font-display text-2xl font-light">
                  {featuredImage.alt}
                </h3>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 md:row-span-2 flex min-h-[320px] items-center justify-center border border-[#c9a96e]/20 bg-[#0d0a07]/5 p-8 text-center text-xs text-[#0d0a07]/75">
              Featured bridal imagery will appear here soon.
            </div>
          )}

          {/* 4 Smaller Cells */}
          {secondaryImages.length > 0 ? (
            secondaryImages.map((img) => (
              <div
                key={img.src}
                className="relative group overflow-hidden border border-[#c9a96e]/20 aspect-square"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0d0a07]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-[#f5e6d0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#c9a96e] block">
                    {img.cat}
                  </span>
                  <h4 className="mt-1 font-display text-sm font-light">{img.alt}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 flex items-center justify-center border border-[#c9a96e]/20 bg-[#0d0a07]/5 p-6 text-center text-xs text-[#0d0a07]/60 animate-pulse">
              Bridal transformations coming soon.
            </div>
          )}
          
          {/* Fill up if there are fewer than 4 secondary images */}
          {secondaryImages.length > 0 && secondaryImages.length < 4 && 
            Array.from({ length: 4 - secondaryImages.length }).map((_, i) => (
              <div key={i} className="hidden md:flex items-center justify-center border border-[#c9a96e]/20 bg-[#0d0a07]/5 p-6 text-center text-xs text-[#0d0a07]/60 aspect-square">
                Coming soon
              </div>
            ))
          }
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            onClick={() => trackEvent("gallery_cta_click", { location: "home_showcase" })}
            className="inline-block text-xs uppercase tracking-[0.25em] text-[#0d0a07] border-b border-[#c9a96e] pb-1 font-semibold hover:text-[#c9a96e] transition-colors"
          >
            Explore Full Gallery
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
      desc: "Only luxury imported brands — MAC, Huda, Charlotte Tilbury & more.",
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
    <section className="bg-[#0d0a07] text-[#f5e6d0] py-24 md:py-[120px] reveal border-t border-[#c9a96e]/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
            Why Choose Us
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[#f5e6d0]">
            The <span className="italic text-[#c9a96e]">Elegance</span> difference
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-4" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-8 border border-[#c9a96e]/25 bg-[#161009] hover:border-[#c9a96e] transition-colors duration-500"
            >
              <div className="w-12 h-12 border border-[#c9a96e]/40 mx-auto flex items-center justify-center mb-6 text-[#c9a96e]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-light text-[#f5e6d0]">{title}</h3>
              <p className="text-[#f5e6d0]/70 text-xs mt-3 font-light leading-relaxed">{desc}</p>
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
    <section className="px-6 py-12 max-w-7xl mx-auto reveal">
      <div className="relative overflow-hidden bg-[#c9a96e] text-[#0d0a07] p-8 md:p-14">
        {/* Editorial border inside banner */}
        <div className="absolute inset-4 border border-[#0d0a07]/10 pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-8 items-center z-10">
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-[#0d0a07]/80 mb-3 font-semibold">
              Limited Opportunity
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
              {primaryOffer ? (
                <>
                  Flat <span className="italic font-normal">{primaryOffer.discount}</span> <br />
                  on {primaryOffer.title.toLowerCase()}
                </>
              ) : (
                <>
                  Exclusive Bridal <br />
                  Promotions Available
                </>
              )}
            </h2>
            <p className="mt-4 text-xs md:text-sm text-[#0d0a07]/80 max-w-md font-light leading-relaxed">
              {primaryOffer
                ? primaryOffer.desc
                : "Schedule a personalized consultation with Rasmirekha Swain and design a custom package fits your bridal or academy needs."}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/offers"
                onClick={() => trackEvent("offer_cta_click", { location: "home_offer_banner" })}
                className="inline-flex h-11 items-center justify-center gap-2 px-8 bg-[#0d0a07] text-[#c9a96e] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#161009] transition-colors animate-pulse"
              >
                {primaryOffer ? "Grab Offer" : "Explore Offers"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            {advertisement ? (
              <div className="mt-4 inline-block text-[8px] uppercase tracking-[0.2em] border border-[#0d0a07]/20 px-2 py-0.5 text-[#0d0a07]/70">
                {advertisement.asset_type} active
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col items-center md:items-end justify-center">
            {primaryOffer ? (
              <>
                <div className="text-center text-[10px] uppercase tracking-widest text-[#0d0a07]/80 mb-4 font-semibold">
                  Valid Until Expiration
                </div>
                <CountdownTimer days={countdownDays} dark={true} />
              </>
            ) : (
              <div className="border border-[#0d0a07]/20 p-6 text-center text-xs text-[#0d0a07]/80 max-w-xs">
                Contact our customer support directly via WhatsApp for any custom bridal seasonal offers.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-[#0d0a07] text-[#f5e6d0] py-24 md:py-[120px] reveal border-t border-[#c9a96e]/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
            Client Stories
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[#f5e6d0]">
            Words from our <span className="italic text-[#c9a96e]">brides</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#161009] border border-[#c9a96e]/20 p-8 flex flex-col justify-between min-h-[260px] relative hover:border-[#c9a96e] transition-colors duration-500"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#c9a96e] opacity-10" />
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <p className="text-[#f5e6d0]/90 text-sm italic leading-relaxed font-light font-display">
                  "{t.text}"
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-[#c9a96e]/10 flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] font-display text-sm font-light">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-[#f5e6d0] text-xs tracking-wide">{t.name}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[#f5e6d0]/50 mt-0.5">{t.service}</div>
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
    <section className="bg-[#f9f5ef] text-[#0d0a07] py-24 md:py-[120px] reveal border-y border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
              Instagram
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#0d0a07]">
              Follow our <span className="italic text-[#c9a96e]">stories</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/rasmirekha2011"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 px-6 bg-[#0d0a07] text-[#f5e6d0] hover:bg-[#161009] transition-colors text-xs font-semibold tracking-[0.2em] uppercase self-start md:self-auto"
          >
            <Instagram className="w-3.5 h-3.5" /> @rasmirekha2011
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feedImages.length > 0 ? (
            feedImages.map((g, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden relative group border border-[#c9a96e]/15 bg-[#0d0a07]/5"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <a 
                  href="https://www.instagram.com/rasmirekha2011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-[#0d0a07]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Instagram className="w-6 h-6 text-[#c9a96e]" />
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full border border-[#c9a96e]/20 bg-white/50 p-8 text-center text-xs text-[#0d0a07]/60">
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
    <section className="bg-[#0d0a07] text-[#f5e6d0] py-24 md:py-[120px] reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
              Knowledge Hub
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#f5e6d0]">
              Helpful answers and <span className="italic text-[#c9a96e]">guides</span>
            </h2>
          </div>
          <Link
            to="/blog"
            onClick={() => trackEvent("blog_cta_click", { location: "home_knowledge_hub" })}
            className="inline-flex h-11 items-center justify-center gap-2 px-6 border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors text-xs font-semibold tracking-[0.2em] uppercase self-start md:self-auto"
          >
            Visit Blog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <article
                key={post.slug}
                className="border border-[#c9a96e]/20 bg-[#161009] p-6 hover:border-[#c9a96e] transition-colors duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[8px] uppercase tracking-[0.25em] text-[#c9a96e]">
                    {post.category}
                  </div>
                  <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-light text-[#f5e6d0]">{post.title}</h3>
                  <p className="mt-2.5 text-xs text-[#f5e6d0]/70 font-light leading-relaxed">{post.excerpt}</p>
                </div>
                
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  onClick={() =>
                    trackEvent("blog_article_click", {
                      location: "home_knowledge_hub",
                      slug: post.slug,
                    })
                  }
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] hover:text-[#f5e6d0] font-semibold"
                >
                  Read article <ArrowRight className="h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>

          <div className="border border-[#c9a96e]/30 bg-[#161009] p-7 text-[#f5e6d0]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-5">Quick Resources</div>
            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="border border-[#c9a96e]/15 bg-[#0d0a07] p-5 hover:border-[#c9a96e] transition-colors"
                >
                  <div className="font-display text-lg font-light text-[#c9a96e]">{item.title}</div>
                  <p className="mt-1.5 text-xs text-[#f5e6d0]/75 font-light leading-relaxed">{item.desc}</p>
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
    <section className="bg-[#f9f5ef] text-[#0d0a07] py-24 md:py-[120px] reveal border-y border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
              Nearby Service Areas
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#0d0a07]">
              Local coverage that feels <span className="italic text-[#c9a96e]">close</span>
            </h2>
          </div>
          <Link
            to="/service-areas"
            onClick={() =>
              trackEvent("service_area_cta_click", { location: "home_local_coverage" })
            }
            className="inline-flex h-11 items-center justify-center gap-2 px-6 bg-[#0d0a07] text-[#f5e6d0] hover:bg-[#161009] transition-colors text-xs font-semibold tracking-[0.2em] uppercase self-start md:self-auto"
          >
            View all areas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceAreas.slice(0, 3).map((area) => (
            <div
              key={area.name}
              className="border border-[#c9a96e]/20 bg-white/70 p-6"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold">
                {area.name}
              </div>
              <p className="mt-2.5 text-xs text-[#0d0a07]/80 leading-relaxed font-light">{area.summary}</p>
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
    <section className="bg-[#c9a96e] text-[#0d0a07] py-24 md:py-[120px] reveal relative">
      <div className="absolute inset-4 border border-[#0d0a07]/10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#0d0a07]/80 mb-3 font-semibold">Let's Talk</div>
        <h2 className="font-display text-4xl md:text-6xl font-light">
          Ready to look <span className="italic font-normal">stunning?</span>
        </h2>
        <p className="text-[#0d0a07]/80 text-sm md:text-base mt-4 max-w-lg mx-auto font-light leading-relaxed">
          Book a free consultation or call us directly — we'll design a customized beauty experience just for
          you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/booking"
            onClick={() => trackEvent("booking_cta_click", { location: "home_contact_cta" })}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-8 bg-[#0d0a07] text-[#c9a96e] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#161009] transition-colors"
          >
            Book Appointment
          </Link>
          <a
            href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
            onClick={() => trackEvent("phone_click", { location: "home_contact_cta" })}
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 px-8 border border-[#0d0a07] text-[#0d0a07] hover:bg-[#0d0a07] hover:text-[#c9a96e] transition-all font-semibold text-xs tracking-[0.2em] uppercase"
          >
            Call {siteConfig.contactPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
