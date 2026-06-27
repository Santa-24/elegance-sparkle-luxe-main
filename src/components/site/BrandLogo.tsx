import { Link } from "@tanstack/react-router";


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
  className = "",
}: BrandLogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <span className="font-display text-base sm:text-lg font-normal tracking-[0.3em] text-[#c9a96e] uppercase">
        ELEGANCE MAKEOVER
      </span>
    </Link>
  );
}
