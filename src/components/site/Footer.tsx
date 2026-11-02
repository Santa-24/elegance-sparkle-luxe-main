import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { getSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/content/site-content";

const exploreLinks = [
  ["/about", "About Us"],
  ["/services", "Services Menu"],
  ["/pricing", "Bridal Pricing"],
  ["/gallery", "Bridal Gallery"],
  ["/offers", "Seasonal Offers"],
  ["/faq", "Frequently Asked Questions"],
  ["/blog", "Beauty Blog"],
  ["/service-areas", "Service Areas"],
  ["/booking", "Online Booking"],
  ["/contact", "Contact Studio"],
] as const;

const serviceLinks = [
  ["/services/bridal-makeup", "Bridal Makeup (HD)"],
  ["/services/hd-airbrush-bridal-makeup", "HD Airbrush Makeup"],
  ["/services/engagement-makeup", "Engagement Makeup"],
  ["/services/party-makeup", "Party & Event Makeup"],
  ["/services/hair-styling", "Hair Styling & Cuts"],
  ["/services/hydra-facial", "Hydra Facial Glow"],
  ["/services/hair-smoothening", "Hair Smoothening"],
  ["/services/makeup-academy-course", "Makeup Academy Course"],
] as const;

const branches = [
  {
    name: "Branch 1 (College Square)",
    address: "Near Sishumandir, College Square, Dhabalagiri, Byasanagar, Jajpur Road, Odisha",
    phone: "+91 99384 87907",
    tel: "9938487907",
  },
  {
    name: "2nd Branch (Raj Mahal Road)",
    address: "Raj Mahal Road, College Square, Dhabalagiri, Byasanagar, Jajpur Road, Odisha",
    phone: "+91 92652 00523",
    tel: "9265200523",
  },
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
  const email = contact?.email || siteConfig.contactEmail;

  return (
    <footer className="relative bg-[#090705] text-[#f9f5ef] border-t border-[#c9a96e]/15">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand + Tagline + Contact */}
          <div className="space-y-5 text-center md:text-left">
            <BrandLogo />
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-[#f9f5ef]/75 md:mx-0 font-body">
              Premier bridal makeover studio, beauty parlour, and certified makeup academy in Jajpur
              Road, Odisha. Founded and directed by Master Artist Rasmirekha Swain.
            </p>
            <div className="space-y-2.5 text-xs text-[#f9f5ef]/75 font-body pt-2">
              <div className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c9a96e]" />
                <span>College Square, Dhabalagiri, Byasanagar, Jajpur Road, Odisha</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#c9a96e]" />
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <a className="transition hover:text-[#c9a96e]" href="tel:9938487907">
                    +91 99384 87907
                  </a>
                  <span className="hidden sm:inline text-[#c9a96e]/40">·</span>
                  <a className="transition hover:text-[#c9a96e]" href="tel:9265200523">
                    +91 92652 00523
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#c9a96e]" />
                <a className="transition hover:text-[#c9a96e]" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-[#c9a96e]/85 md:justify-start pt-1">
              {instagramUrl ? (
                <a
                  aria-label="Instagram"
                  href={instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="p-1.5 transition hover:text-[#c9a96e]"
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
                  className="p-1.5 transition hover:text-[#c9a96e]"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Column 2: Specialized Beauty Services */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 font-display text-xs font-bold tracking-[0.25em] uppercase text-[#c9a96e]">
              Beauty Services
            </h4>
            <ul className="space-y-2 text-xs font-body">
              {serviceLinks.map(([to, label]) => (
                <li key={to}>
                  <a className="text-[#f9f5ef]/70 transition hover:text-[#c9a96e] block" href={to}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Exclusive Studio Branches (Poster Verified) */}
          <div className="text-center md:text-left space-y-4">
            <h4 className="font-display text-xs font-bold tracking-[0.25em] uppercase text-[#c9a96e]">
              Our Studio Locations
            </h4>
            <div className="space-y-3.5 text-xs font-body">
              {branches.map((b) => (
                <div
                  key={b.name}
                  className="p-3.5 border border-[#c9a96e]/20 bg-[#120d08]/80 hover:border-[#c9a96e]/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#c9a96e] font-semibold">
                    <MapPin className="w-3 h-3 text-[#c9a96e]" />
                    {b.name}
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#f9f5ef]/80 leading-relaxed font-light">
                    {b.address}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#c9a96e]/10">
                    <a
                      href={`tel:${b.tel}`}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#c9a96e] hover:text-[#f5e6d0] font-medium transition-colors"
                    >
                      <Phone className="w-3 h-3" /> {b.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 font-display text-xs font-bold tracking-[0.25em] uppercase text-[#c9a96e]">
              Explore Studio
            </h4>
            <ul className="space-y-2 text-xs font-body">
              {exploreLinks.map(([to, label]) => (
                <li key={to}>
                  <Link className="text-[#f9f5ef]/70 transition hover:text-[#c9a96e] block" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom border & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#c9a96e]/10 text-center text-xs tracking-wider uppercase text-[#f9f5ef]/40 flex flex-col md:flex-row md:justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="normal-case text-xxs tracking-normal italic text-[#f9f5ef]/30">
            Luxury bridal makeup, HD airbrush artistry & beauty academy in Jajpur Road, Odisha.
          </p>
        </div>
      </div>
    </footer>
  );
}
