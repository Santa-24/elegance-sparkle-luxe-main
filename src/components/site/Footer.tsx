import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { getSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/content/site-content";

const exploreLinks = [
  ["/about", "About Us"],
  ["/services", "Services"],
  ["/pricing", "Pricing"],
  ["/gallery", "Gallery"],
  ["/offers", "Offers"],
  ["/faq", "FAQ"],
  ["/blog", "Blog"],
  ["/service-areas", "Service Areas"],
] as const;

export function Footer() {
  const siteConfig = getSiteConfig();
  const companyName = siteConfig.siteName?.trim() || "Elegance Makeover & Academy";
  const siteContent = useSiteContent();
  const contact = siteContent?.contact;
  const social = siteContent?.social;
  const instagramUrl =
    social?.instagram && social.instagram !== "#"
      ? social.instagram
      : siteConfig.instagramUrl !== "#"
        ? siteConfig.instagramUrl
        : null;
  const facebookUrl =
    social?.facebook && social.facebook !== "#"
      ? social.facebook
      : siteConfig.facebookUrl !== "#"
        ? siteConfig.facebookUrl
        : null;
  const phone = contact?.phone || siteConfig.contactPhone;
  const email = contact?.email || siteConfig.contactEmail;
  const address = contact?.address || siteConfig.contactAddress;

  return (
    <footer className="relative bg-[#090705] text-[#f9f5ef] border-t border-[#c9a96e]/15">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand + Tagline */}
          <div className="space-y-6 text-center md:text-left">
            <BrandLogo />
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#f9f5ef]/75 md:mx-0 font-body">
              Premium bridal makeup, beauty parlour services, and professional academy training in Jajpur Road, Odisha. Crafting timeless looks with luxury imports.
            </p>
            <div className="flex items-center justify-center gap-4 text-[#c9a96e]/85 md:justify-start">
              {instagramUrl ? (
                <a
                  aria-label="Instagram"
                  href={instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="p-2 transition hover:text-[#c9a96e]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ) : null}
              {facebookUrl ? (
                <a
                  aria-label="Facebook"
                  href={facebookUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="p-2 transition hover:text-[#c9a96e]"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Column 2: Explore links */}
          <div className="text-center md:text-left">
            <h4 className="mb-6 font-display text-xs font-bold tracking-[0.3em] uppercase text-[#c9a96e]">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs tracking-wider uppercase font-body">
              {exploreLinks.map(([to, label]) => (
                <li key={to}>
                  <Link className="text-[#f9f5ef]/75 transition hover:text-[#c9a96e]" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div className="text-center md:text-left">
            <h4 className="mb-6 font-display text-xs font-bold tracking-[0.3em] uppercase text-[#c9a96e]">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-[#f9f5ef]/75 font-body">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a96e]" />
                <span className="text-xs leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#c9a96e]" />
                <a
                  className="text-xs transition hover:text-[#c9a96e]"
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#c9a96e]" />
                <a className="text-xs transition hover:text-[#c9a96e]" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border & Copyright */}
        <div className="mt-16 pt-8 border-t border-[#c9a96e]/10 text-center text-xs tracking-wider uppercase text-[#f9f5ef]/40 flex flex-col md:flex-row md:justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="normal-case text-xxs tracking-normal italic text-[#f9f5ef]/30">
            Timeless bridal beauty & professional academy training.
          </p>
        </div>
      </div>
    </footer>
  );
}
