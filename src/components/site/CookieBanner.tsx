import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to show the banner smoothly
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    trackEvent("cookie_consent_click", { choice: "accepted" });
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
    trackEvent("cookie_consent_click", { choice: "declined" });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[60] bg-[#161009] border border-[#c9a96e]/30 p-6 shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-fade-up">
      <div className="absolute inset-2 border border-[#c9a96e]/10 pointer-events-none" />

      <div className="relative z-10">
        <h4 className="font-display text-base tracking-wide text-[#c9a96e] font-light uppercase">
          Cookie Consent
        </h4>
        <p className="mt-2.5 text-xs text-[#f5e6d0]/80 font-light leading-relaxed">
          We use essential and analytics cookies to optimize your luxury beauty and academy training
          experience on our website.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 inline-flex h-9 items-center justify-center bg-[#c9a96e] text-[#0d0a07] text-[10px] tracking-[0.15em] font-semibold uppercase hover:bg-[#d9c49e] transition-colors cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 inline-flex h-9 items-center justify-center border border-[#c9a96e]/40 text-[#c9a96e] text-[10px] tracking-[0.15em] font-semibold uppercase hover:bg-[#c9a96e]/10 transition-colors cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
