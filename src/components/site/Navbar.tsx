import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/offers", label: "Offers" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

function navLinkClass(active: boolean, mobile = false) {
  if (mobile) {
    return `block py-2 text-center font-display text-2xl tracking-[0.2em] uppercase transition-colors ${
      active ? "text-[#c9a96e]" : "text-[#f9f5ef]/80 hover:text-[#c9a96e]"
    }`;
  }
  return `font-body text-[10px] tracking-[0.25em] uppercase transition-colors relative py-1.5 ${
    active ? "text-[#c9a96e]" : "text-[#f9f5ef]/75 hover:text-[#c9a96e]"
  }`;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#0d0a07] border-b border-[#c9a96e]/15 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-5 lg:px-10 min-h-[4.5rem] md:min-h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <BrandLogo />

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link to={l.to} className={navLinkClass(active)}>
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#c9a96e]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="inline-flex h-10 items-center justify-center px-6 rounded-none bg-[#c9a96e] text-[#0d0a07] font-semibold text-[11px] tracking-[0.2em] uppercase hover:brightness-105 transition-all"
          >
            Book Now
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-11 h-11 flex items-center justify-center text-[#c9a96e] z-50"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0d0a07] flex flex-col justify-center px-10 pt-20 animate-fade-in">
          <ul className="flex flex-col items-center gap-8">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <li key={l.to}>
                  <Link to={l.to} className={navLinkClass(active, true)}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4 w-full max-w-[280px]">
              <Link
                to="/booking"
                className="block text-center py-4 rounded-none bg-[#c9a96e] text-[#0d0a07] font-semibold tracking-[0.2em] text-xs uppercase"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
