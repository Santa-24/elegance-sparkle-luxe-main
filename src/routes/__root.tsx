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

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { getSiteConfig } from "@/lib/site-config";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildCanonicalUrl, buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";
import { trackPageView } from "@/lib/analytics";
import { getLiveSiteContentFn } from "@/lib/content/live.functions";
import { SiteContentProvider } from "@/lib/content/site-content";

const siteConfig = getSiteConfig();

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold gradient-gold-text">404</h1>
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
      {
        property: "og:title",
        content: "Elegance Makeover & Academy - Premium Bridal & Beauty in Jajpur Road",
      },
      {
        property: "og:description",
        content:
          "Premium bridal makeup, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha. Book your luxury beauty experience today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Elegance Makeover & Academy - Premium Bridal & Beauty in Jajpur Road",
      },
      {
        name: "twitter:description",
        content:
          "Premium bridal makeup, beauty parlour and certified academy by Rasmirekha Swain in Jajpur Road, Odisha. Book your luxury beauty experience today.",
      },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { rel: "shortcut icon", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
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
    <html lang="en">
      <head>
        <HeadContent />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        {siteConfig.ga4Id ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.ga4Id}', { send_page_view: false });
                `,
              }}
            />
          </>
        ) : null}
        {siteConfig.clarityId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${siteConfig.clarityId}");
              `,
            }}
          />
        ) : null}
        <StructuredData data={organizationSchema} />
        <StructuredData data={webSiteSchema} />
      </head>
      <body>
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
    if (siteConfig.ga4Id) {
      trackPageView(location.pathname, location.searchStr);
    }
  }, [location.pathname, location.searchStr]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider value={siteContent}>
        <Outlet />
      </SiteContentProvider>
    </QueryClientProvider>
  );
}
