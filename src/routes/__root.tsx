import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { SkipLink } from "@/components/site/SkipLink";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { getSiteConfig } from "@/lib/site-config";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildCanonicalUrl, buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";
import { trackPageView, initDeferredAnalytics } from "@/lib/analytics";
import { getLiveSiteContentFn } from "@/lib/content/live.functions";
import { SiteContentProvider } from "@/lib/content/site-content";

const siteConfig = getSiteConfig();

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-[var(--gold-accessible)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground font-display">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full gradient-gold px-6 py-2.5 text-sm font-semibold text-[var(--royal-deep)] btn-luxe"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full gradient-gold px-5 py-2 text-sm font-semibold text-[var(--royal-deep)] btn-luxe"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-background px-5 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => getLiveSiteContentFn(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elegance Makeover & Academy - Premium Bridal & Beauty in Jajpur Road" },
      {
        name: "description",
        content:
          "Premium bridal makeup, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha. Book your luxury beauty experience today.",
      },
      { name: "author", content: "Elegance Makeover & Academy" },
      { name: "application-name", content: "Elegance Makeover & Academy" },
      { name: "theme-color", content: "#0B132B" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Elegance" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "msapplication-TileColor", content: "#0B132B" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      {
        property: "og:title",
        content: "Elegance Makeover & Academy | Bridal Makeup Salon",
      },
      {
        property: "og:description",
        content:
          "Premium bridal makeup, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha. Book your luxury beauty experience today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://elegancemakeover.makeup" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Elegance Makeover & Academy | Bridal Makeup Salon",
      },
      {
        name: "twitter:description",
        content:
          "Premium bridal makeup, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha. Book your luxury beauty experience today.",
      },
      { name: "twitter:image", content: "https://elegancemakeover.makeup/assets/logo.webp" },
    ],
    links: [
      { rel: "icon", href: "/assets/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/assets/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#D4AF37" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, pathname);
  const organizationSchema = buildOrganizationSchema(siteConfig, canonicalUrl);
  const webSiteSchema = buildWebSiteSchema(siteConfig, canonicalUrl);

  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
        {canonicalUrl ? (
          <>
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
          </>
        ) : null}
        <StructuredData data={organizationSchema} />
        <StructuredData data={webSiteSchema} />
      </head>
      <body>
        <SkipLink />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const siteContent = Route.useLoaderData();
  const location = useLocation();

  useEffect(() => {
    const cleanup = initDeferredAnalytics(siteConfig.ga4Id, siteConfig.clarityId);
    return cleanup;
  }, []);

  useEffect(() => {
    if (siteConfig.ga4Id) {
      trackPageView(location.pathname, location.searchStr);
    }
  }, [location.pathname, location.searchStr]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider value={siteContent}>
        <main id="main-content">
          <Outlet />
        </main>
      </SiteContentProvider>
    </QueryClientProvider>
  );
}
