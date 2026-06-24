/**
 * SkipLink — Accessibility skip navigation
 * Renders an anchor that's visually hidden until focused,
 * allowing keyboard users to jump straight to #main-content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[9999] -translate-y-full rounded-br-lg bg-[var(--royal-deep)] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
