import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { getLiveBlogPosts } from "@/lib/content/live.server";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/gallery",
  "/offers",
  "/testimonials",
  "/contact",
  "/booking",
  "/blog",
  "/faq",
  "/service-areas",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const baseUrl = new URL(request.url).origin;
        const blogPosts = await getLiveBlogPosts();
        const paths = [...staticPaths, ...blogPosts.map((post) => `/blog/${post.slug}`)];
        const urls = paths
          .map(
            (p) =>
              `  <url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
