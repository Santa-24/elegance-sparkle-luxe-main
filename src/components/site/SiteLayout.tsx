import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">{children}</div>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; to?: string }>;
}) {
  return (
    <section className="relative gradient-luxe text-marble py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 70% 80%, var(--purple-deep) 0, transparent 45%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-5 lg:px-10 text-center animate-fade-up">
        {breadcrumbs?.length ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.35em] text-marble/70"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-[var(--gold)] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--gold)]">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span className="opacity-50">/</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow && (
          <div className="inline-block text-xs md:text-sm tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
        <div className="gold-divider" />
        {subtitle && (
          <p className="text-marble/80 max-w-2xl mx-auto mt-3 text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
