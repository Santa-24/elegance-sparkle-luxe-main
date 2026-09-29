import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { getLiveBlogPosts } from "@/lib/content/live.server";
import { galleryImages } from "@/lib/data/gallery";

const targetLocationSlugs = [
  "jajpur-road",
  "vyasanagar",
  "jajpur-town",
  "danagadi",
  "kalinganagar",
  "panikoili",
  "kuakhia",
  "bhadrak",
  "cuttack",
  "bhubaneswar",
];

const targetServiceSlugs = [
  "bridal-makeup",
  "hd-airbrush-bridal-makeup",
  "engagement-makeup",
  "party-makeup",
  "hair-styling",
  "hydra-facial",
  "hair-smoothening",
  "makeup-academy-course",
];

type SitemapEntry = {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
  images?: Array<{ loc: string; title: string; caption?: string }>;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestOrigin = new URL(request.url).origin;
        const baseUrl =
          requestOrigin &&
          !requestOrigin.includes("localhost") &&
          !requestOrigin.includes("127.0.0.1")
            ? requestOrigin
            : "https://elegancemakeover.makeup";

        const today = new Date().toISOString().split("T")[0];
        const blogPosts = await getLiveBlogPosts();

        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "daily",
            priority: "1.0",
            lastmod: today,
            images: [
              {
                loc: `${baseUrl}/assets/hero-bride.webp`,
                title: "Luxury Bridal Makeup Artist in Jajpur Road - Elegance Makeover",
                caption: "Master bridal transformation by Rasmirekha Swain in Jajpur Road, Odisha",
              },
              {
                loc: `${baseUrl}/assets/logo.webp`,
                title: "Elegance Makeover & Academy Official Logo",
              },
            ],
          },
          { path: "/booking", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/service-areas", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/pricing", changefreq: "weekly", priority: "0.8", lastmod: today },
          {
            path: "/gallery",
            changefreq: "weekly",
            priority: "0.8",
            lastmod: today,
            images: galleryImages.slice(0, 10).map((img) => ({
              loc: `${baseUrl}${img.src}`,
              title: img.alt,
              caption: `${img.cat} makeover by Elegance Makeover & Academy`,
            })),
          },
          { path: "/offers", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/testimonials", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/faq", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.6", lastmod: today },
        ];

        // Add service detail pages
        for (const slug of targetServiceSlugs) {
          entries.push({
            path: `/services/${slug}`,
            changefreq: "weekly",
            priority: "0.9",
            lastmod: today,
          });
        }

        // Add location landing pages
        for (const area of targetLocationSlugs) {
          entries.push({
            path: `/service-areas/${area}`,
            changefreq: "weekly",
            priority: "0.9",
            lastmod: today,
          });
        }

        // Add live blog post pages
        for (const post of blogPosts) {
          entries.push({
            path: `/blog/${post.slug}`,
            changefreq: "weekly",
            priority: "0.7",
            lastmod: (post.updatedDate || post.publishDate || today).split("T")[0],
            images: post.featuredImageUrl
              ? [
                  {
                    loc: post.featuredImageUrl.startsWith("http")
                      ? post.featuredImageUrl
                      : `${baseUrl}${post.featuredImageUrl}`,
                    title: post.title,
                  },
                ]
              : undefined,
          });
        }

        const xmlUrls = entries
          .map((entry) => {
            const lastmodTag = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
            const imageTags = entry.images?.length
              ? entry.images
                  .map(
                    (img) =>
                      `\n    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title>${img.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>${img.caption ? `\n      <image:caption>${img.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:caption>` : ""}\n    </image:image>`,
                  )
                  .join("")
              : "";

            return `  <url>\n    <loc>${baseUrl}${entry.path}</loc>${lastmodTag}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>${imageTags}\n  </url>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlUrls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
