import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ChevronRight, Link2, Share2, User } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { getLiveBlogPostBySlugFn, getLiveBlogPostsFn } from "@/lib/content/live.functions";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();

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

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, allPosts] = await Promise.all([
      getLiveBlogPostBySlugFn({ data: { slug: params.slug } }),
      getLiveBlogPostsFn(),
    ]);
    return { post: post as BlogPost | null, allPosts: allPosts as BlogPost[] };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {
        meta: [
          { title: "Blog - Elegance Makeover & Academy" },
          {
            name: "description",
            content: "Bridal makeup tips, academy guidance, skincare advice and beauty insights.",
          },
        ],
      };
    }

    const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/blog/${loaderData.post.slug}`);
    return {
      meta: [
        { title: `${loaderData.post.seoTitle} - Elegance Makeover & Academy` },
        {
          name: "description",
          content: loaderData.post.description,
        },
        { property: "og:title", content: loaderData.post.seoTitle },
        {
          property: "og:description",
          content: loaderData.post.description,
        },
        {
          property: "og:image",
          content: loaderData.post.featuredImageUrl || "/og-image.svg",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.post.featuredImageUrl || "/og-image.svg" },
      ],
      links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
    };
  },
  component: BlogPostPage,
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

function BlogPostPage() {
  const loaderData = Route.useLoaderData() as
    | {
        post: BlogPost | null;
        allPosts: BlogPost[];
      }
    | undefined;

  useScrollReveal();

  if (!loaderData) {
    return null;
  }

  const { post, allPosts } = loaderData;

  if (!post) {
    return (
      <SiteLayout>
        <PageHero
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: "Article not found" },
          ]}
          eyebrow="Blog"
          title={
            <>
              Article <span className="gradient-gold-text italic">not found</span>
            </>
          }
          subtitle="The requested post is unavailable, but the latest blog articles are still ready for you."
        />

        <section className="bg-background py-24 md:py-[120px]">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-10">
            <div className="reveal rounded-[2rem] border border-border bg-card p-8 shadow-soft">
              <h2 className="font-display text-3xl text-[var(--royal)]">
                We could not load that article
              </h2>
              <p className="mt-4 text-muted-foreground">
                Please return to the blog index to browse the latest bridal, academy and skincare
                posts.
              </p>
              <Link
                to="/blog"
                className="btn-luxe mt-6 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 font-semibold text-[var(--royal-deep)] shadow-gold"
              >
                Back to Blog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, `/blog/${post.slug}`);
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const tocItems = post.body
    .filter((item) => item.startsWith("#"))
    .map((item) => item.replace(/^#+\s*/, ""))
    .slice(0, 6);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle,
    description: post.description,
    image: post.featuredImageUrl || undefined,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    mainEntityOfPage: canonicalUrl || undefined,
  };

  return (
    <SiteLayout>
      <StructuredData data={articleSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ],
            canonicalUrl,
          )}
        />
      ) : null}

      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
        eyebrow={post.category}
        title={<>{post.title}</>}
        subtitle={post.description}
      />

      <section className="bg-background py-24 md:py-[120px]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.15fr_0.45fr_0.9fr] lg:px-10">
          <article className="reveal rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-10 lg:col-span-1">
            <div className="overflow-hidden rounded-[1.5rem] border border-border img-zoom">
              <img
                src={post.featuredImageUrl || "/og-image.svg"}
                alt={post.title}
                className="h-[280px] w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-2 text-[var(--purple-deep)]">
                <CalendarDays className="h-4 w-4" />
                {post.publishDate}
              </span>
              <span>Updated {post.updatedDate}</span>
              <span>{post.readTime}</span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-foreground/90">{post.excerpt}</p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 rounded-3xl bg-[var(--gold)]/10 p-5">
              <Link
                to="/booking"
                className="btn-luxe inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 font-semibold text-[var(--royal-deep)] shadow-gold"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/faq"
                className="btn-luxe inline-flex items-center gap-2 rounded-full border-2 border-[var(--royal)] px-6 py-3 font-semibold text-[var(--royal)] hover:bg-[var(--royal)] hover:text-marble"
              >
                Read FAQs
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs uppercase tracking-[0.25em] text-[var(--purple-deep)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl || siteConfig.siteUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-[var(--royal)] hover:border-[var(--gold)]"
              >
                <Share2 className="h-4 w-4" /> Share
              </a>
              <a
                href={canonicalUrl || siteConfig.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-[var(--royal)] hover:border-[var(--gold)]"
              >
                <Link2 className="h-4 w-4" /> Copy Link
              </a>
            </div>
          </article>

          <aside className="reveal space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-royal text-[var(--gold)]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                    Author
                  </div>
                  <div className="font-display text-2xl text-[var(--royal)]">{post.authorName}</div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                Published on {post.publishDate} and last updated on {post.updatedDate}.
              </div>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-[0.35em] text-[var(--purple-deep)]">
                  Category
                </div>
                <div className="mt-2 text-sm text-foreground/85">{post.category}</div>
              </div>
            </div>

            {tocItems.length > 0 ? (
              <div className="rounded-[2rem] gradient-luxe p-6 text-marble shadow-luxury">
                <div className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">
                  Table of contents
                </div>
                <div className="mt-4 space-y-3">
                  {tocItems.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-marble/80">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-2xl text-[var(--royal)]">Related articles</h3>
              <div className="mt-4 space-y-4">
                {relatedPosts.length ? (
                  relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      to="/blog/$slug"
                      params={{ slug: related.slug }}
                      className="block rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:border-[var(--gold)]"
                    >
                      <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">
                        {related.category}
                      </div>
                      <div className="mt-1 font-display text-lg text-[var(--royal)]">
                        {related.title}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{related.excerpt}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No related posts available yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
