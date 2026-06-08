import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getLiveGalleryFn } from "@/lib/content/live.functions";

export const Route = createFileRoute("/gallery")({
  loader: async () => {
    const images = await getLiveGalleryFn();
    return { images };
  },
  head: () => ({
    meta: [
      { title: "Gallery — Elegance Makeover" },
      {
        name: "description",
        content:
          "Explore our portfolio of bridal makeup, parlour transformations and academy work. Real brides, real magic.",
      },
      { property: "og:title", content: "Bridal & Beauty Gallery — Elegance Makeover" },
      {
        property: "og:description",
        content: "Premium bridal makeup gallery from Jajpur Road, Odisha.",
      },
    ],
  }),
  component: GalleryPage,
});

const categories = ["All", "Bridal", "Parlour", "Before & After", "Academy"];

function GalleryPage() {
  const { images } = Route.useLoaderData();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = filter === "All" ? images : images.filter((g) => g.cat === filter);

  useEffect(() => {
    setOpen(null);
  }, [filter]);

  useEffect(() => {
    if (open !== null && (items.length === 0 || open < 0 || open >= items.length)) {
      setOpen(null);
    }
  }, [items, open]);

  return (
    <SiteLayout>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        eyebrow="Portfolio"
        title={
          <>
            Our <span className="gradient-gold-text italic">artistry</span> in frames
          </>
        }
        subtitle="A glimpse of the beautiful transformations we've crafted."
      />

      <section className="bg-[linear-gradient(180deg,rgba(250,244,236,0.8),rgba(255,255,255,1))] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="text-[10px] uppercase tracking-[0.45em] text-[var(--purple-deep)]">
              Curated Gallery
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Browse the bridal work in a cleaner masonry presentation, then open any image for a
              closer view.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? "gradient-gold text-[var(--royal-deep)] shadow-gold"
                    : "bg-card border border-border text-foreground/75 hover:border-[var(--gold)] hover:text-[var(--royal)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-5 space-y-5 sm:columns-2 xl:columns-3">
            {items.length > 0 ? (
              items.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  className="img-zoom group relative block w-full overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-soft break-inside-avoid"
                >
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-[var(--royal-deep)]/0 transition-all group-hover:bg-[var(--royal-deep)]/55" />
                  <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all group-hover:opacity-100">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] backdrop-blur-sm">
                      {g.cat}
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-3 text-left text-marble">
                      <div className="font-display text-lg leading-tight">{g.alt}</div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-gold">
                        <Eye className="h-5 w-5 text-[var(--royal-deep)]" />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[1.75rem] border border-border/60 bg-card p-10 text-center text-muted-foreground">
                No gallery images are published yet. Add or activate images in the admin panel to
                show them here.
              </div>
            )}
          </div>
        </div>
      </section>

      {open !== null && items[open] && (
        <div className="fixed inset-0 z-[60] bg-[var(--royal-deep)]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up">
          <button
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 w-12 h-12 rounded-full glass text-marble flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setOpen((v) => (v === null ? null : (v - 1 + items.length) % items.length))
            }
            className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass text-marble flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setOpen((v) => (v === null ? null : (v + 1) % items.length))}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass text-marble flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <img
            src={items[open].src}
            alt={items[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-luxury"
          />
        </div>
      )}
    </SiteLayout>
  );
}
