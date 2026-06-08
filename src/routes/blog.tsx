import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Filter, Tag } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getLiveBlogPostsFn } from "@/lib/content/live.functions";
import { buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/blog");

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  category: string;
  categorySlug: string;
  publishDate: string;
  updatedDate: string;
  readTime: string;
  keywords: string[];
  excerpt: string;
  body: string[];
  featuredImageUrl: string;
  tags: string[];
  authorName: string;
  authorSlug: string;
  isFeatured: boolean;
};

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const posts = (await getLiveBlogPostsFn()) as BlogPost[];
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Beauty Blog - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Read bridal makeup tips, academy guidance, skincare advice and beauty insights from Elegance Makeover & Academy.",
      },
      { property: "og:title", content: "Beauty Blog - Elegance Makeover & Academy" },
      {
        property: "og:description",
        content: "Practical beauty and bridal advice for clients and students in Odisha.",
      },
      { property: "og:url", content: canonicalUrl },
    ],
    links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts } = Route.useLoaderData() as { posts: BlogPost[] };
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  const featured = posts[0] ?? null;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category))).filter(Boolean)],
    [posts],
  );
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags))).filter(Boolean)],
    [posts],
  );

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
    return matchesCategory && matchesTag;
  });

  return (
    <SiteLayout>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        eyebrow="Content Hub"
        title={
          <>
            Bridal and beauty <span className="gradient-gold-text italic">insights</span>
          </>
        }
        subtitle="A growing library of bridal advice, academy guidance and local beauty tips."
      />

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-[var(--purple-deep)]" />
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all ${
                  activeCategory === category
                    ? "border-transparent gradient-gold text-[var(--royal-deep)] shadow-gold"
                    : "border-border bg-card text-[var(--purple-deep)] hover:border-[var(--gold)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-[var(--purple-deep)]" />
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all ${
                  activeTag === tag
                    ? "border-transparent bg-[var(--royal)] text-marble"
                    : "border-border bg-card text-[var(--purple-deep)] hover:border-[var(--gold)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {featured ? (
            <article className="grid gap-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] bg-[var(--royal-deep)]">
                <img
                  src={featured.featuredImageUrl || "/og-image.svg"}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,19,53,0.15),rgba(24,19,53,0.9))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-marble">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                    Featured article
                  </div>
                  <h2 className="mt-4 font-display text-4xl leading-tight">{featured.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marble/80">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 md:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    <span>{featured.category}</span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[var(--purple-deep)]" />
                      {featured.publishDate}
                    </span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-[var(--royal)]">
                    {featured.seoTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--purple-deep)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="btn-luxe mt-8 inline-flex w-fit items-center gap-2 rounded-full gradient-gold px-6 py-3 font-semibold text-[var(--royal-deep)] shadow-gold"
                >
                  Read Article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ) : (
            <div className="rounded-[2rem] border border-border bg-card p-10 text-center text-muted-foreground">
              No blog posts are published yet.
            </div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft"
              >
                <img
                  src={post.featuredImageUrl || "/og-image.svg"}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                    {post.category}
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-[var(--royal)]">{post.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.publishDate}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--purple-deep)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:text-[var(--purple-deep)]"
                  >
                    Continue reading <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
