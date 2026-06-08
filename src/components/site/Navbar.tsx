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
  const base = mobile
    ? "block px-4 py-3 rounded-xl text-base font-medium transition-colors"
    : "px-3.5 py-2 rounded-full text-sm font-medium transition-colors relative";

  return `${base} ${
    active
      ? "text-[var(--royal)] bg-[var(--gold)]/10"
      : "text-foreground/80 hover:text-[var(--royal)] hover:bg-muted"
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-10 min-h-[4.5rem] md:min-h-20 flex items-center justify-between">
        <BrandLogo size="sm" showDecorations={false} />

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link to={l.to} className={navLinkClass(active)}>
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] gradient-gold rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="btn-luxe inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold text-sm shadow-soft"
          >
            Book Appointment
          </Link>
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-2 bg-background/95 backdrop-blur-xl border-b border-border">
          <ul className="flex flex-col gap-1">
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
            <li className="mt-2">
              <Link
                to="/booking"
                className="block text-center px-4 py-3 rounded-xl gradient-gold text-[var(--royal-deep)] font-semibold"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
