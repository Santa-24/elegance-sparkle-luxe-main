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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Escape key closes menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navigation Header (z-index: 30) */}
      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "border-b border-[#c9a96e]/15 backdrop-blur-md"
            : ""
        }`}
        style={{
          backgroundColor: scrolled || isMenuOpen ? "#0d0a07" : "transparent",
        }}
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
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-[#c9a96e] cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Nav Backdrop overlay (z-index: 40) */}
      {isMenuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Nav Overlay Panel (z-index: 50) */}
      {isMenuOpen && (
        <div
          className="mobile-nav lg:hidden fixed inset-0 flex flex-col justify-center px-10 pt-20 animate-fade-in"
          style={{ backgroundColor: "#0d0a07" }}
        >
          {/* Close button inside panel */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-[#c9a96e] hover:text-[#f5e6d0] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <ul className="flex flex-col items-center gap-8">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={navLinkClass(active, true)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4 w-full max-w-[280px]">
              <Link
                to="/booking"
                className="block text-center py-4 rounded-none bg-[#c9a96e] text-[#0d0a07] font-semibold tracking-[0.2em] text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
