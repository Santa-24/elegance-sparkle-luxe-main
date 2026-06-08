import { Phone, MessageCircle } from "lucide-react";

import { getSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/content/site-content";

const siteConfig = getSiteConfig();
const WA_NUMBER = "919265200523";
const WA_MSG = encodeURIComponent("Hi Elegance Makeover, I'd like to book an appointment.");

export function FloatingActions() {
  const siteContent = useSiteContent();
  const contact = siteContent?.contact;
  const social = siteContent?.social;
  const whatsappTarget =
    contact?.whatsapp?.replace(/\D/g, "") ||
    social?.whatsapp?.replace(/\D/g, "") ||
    siteConfig.whatsappNumber ||
    WA_NUMBER;
  const phoneTarget = contact?.phone || siteConfig.contactPhone;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsappTarget || WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-luxury btn-luxe animate-float"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <span
          className="absolute inset-0 rounded-full animate-pulse-gold"
          style={{ boxShadow: "0 0 0 0 #25D36699" }}
        />
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative" />
      </a>
      <a
        href={`tel:${phoneTarget.replace(/\s+/g, "")}`}
        aria-label="Call now"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-gold flex items-center justify-center text-[var(--royal-deep)] shadow-gold btn-luxe"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </div>
  );
}
