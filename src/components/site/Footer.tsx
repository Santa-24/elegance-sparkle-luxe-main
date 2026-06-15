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
  const whatsappNumber =
    contact?.whatsapp?.replace(/\D/g, "") ||
    social?.whatsapp?.replace(/\D/g, "") ||
    siteConfig.whatsappNumber;

  return (
    <footer className="relative overflow-hidden gradient-luxe text-marble">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-5 text-center md:text-left">
            <BrandLogo />
            <p className="mx-auto max-w-sm text-sm leading-7 text-white/75 md:mx-0">
              Premium bridal makeup, beauty services, and academy training for clients across Jajpur
              Road and nearby Odisha service areas.
            </p>
            <div className="flex items-center justify-center gap-3 text-white/70 md:justify-start">
              {instagramUrl ? (
                <a
                  aria-label="Instagram"
                  href={instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="rounded-full border border-white/15 p-2 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
              {facebookUrl ? (
                <a
                  aria-label="Facebook"
                  href={facebookUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="rounded-full border border-white/15 p-2 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 font-display text-lg text-[var(--gold)]">Explore</h4>
            <ul className="space-y-2 text-sm">
              {exploreLinks.map(([to, label]) => (
                <li key={to}>
                  <Link className="text-white/75 transition hover:text-[var(--gold)]" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 font-display text-lg text-[var(--gold)]">Contact</h4>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a
                  className="transition hover:text-[var(--gold)]"
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a className="transition hover:text-[var(--gold)]" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 font-display text-lg text-[var(--gold)]">Service Areas</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>Jajpur Road</li>
              <li>Jajpur</li>
              <li>Cuttack</li>
              <li>Bhubaneswar</li>
              <li>Bhadrak</li>
              <li>Nearby Odisha regions</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-sm text-white/60 md:flex-row md:justify-between md:text-left">
          <p className="max-w-xl">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="max-w-xl">
            Bridal beauty, academy learning, and premium salon experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}
