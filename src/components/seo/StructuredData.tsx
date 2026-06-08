import type { ReactNode } from "react";

export function StructuredData({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must remain a raw string for search engines.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoSlot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
