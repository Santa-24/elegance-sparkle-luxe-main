import { Link } from "@tanstack/react-router";

import logo from "../../assets/logo.webp";

type BrandLogoProps = {
  size?: "sm" | "md";
  showTagline?: boolean;
  showDecorations?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "h-12 md:h-14",
  md: "h-16 md:h-20",
};

export function BrandLogo({
  size = "sm",
  showTagline = true,
  showDecorations = true,
  className = "",
}: BrandLogoProps) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <div className="brand-logo-shell">
        <img
          src={logo}
          alt="Elegance Makeover logo"
          className={`brand-logo-image ${sizeClasses[size]}`}
        />
        {showDecorations ? <span className="brand-logo-glow" /> : null}
        {showDecorations ? <span className="brand-logo-spark brand-logo-spark-left" /> : null}
        {showDecorations ? <span className="brand-logo-spark brand-logo-spark-right" /> : null}
      </div>
      {showTagline && (
        <div className="leading-tight">
          <div className="font-display text-lg md:text-xl font-bold text-foreground">
            Elegance <span className="gradient-gold-text">Makeover</span>
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            & Academy
          </div>
        </div>
      )}
    </Link>
  );
}
