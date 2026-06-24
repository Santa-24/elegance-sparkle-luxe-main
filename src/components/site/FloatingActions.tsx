import { MessageCircle } from "lucide-react";

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

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsappTarget || WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#c9a96e] text-[#0d0a07] hover:opacity-95 transition-opacity"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
