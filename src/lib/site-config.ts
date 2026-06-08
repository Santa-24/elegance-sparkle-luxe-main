// Back-compat re-export for modules importing "@/lib/site-config".
//
// The actual implementation lives under src/lib/config/site.ts and is
// re-exported via src/lib/config/index.ts.

export { getSiteConfig, type SiteConfig } from "./config";
