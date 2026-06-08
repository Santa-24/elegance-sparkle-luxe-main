import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { StructuredData } from "@/components/seo/StructuredData";
import { trackEvent } from "@/lib/analytics";
import { submitContactMessage } from "@/lib/api/contact.functions";
import { useSiteContent } from "@/lib/content/site-content";
import { buildBreadcrumbSchema, buildCanonicalUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();
const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, "/contact");

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Elegance Makeover" },
      {
        name: "description",
        content: `Visit, call or WhatsApp us. Elegance Makeover & Academy, ${siteConfig.contactAddress}. Phone: ${siteConfig.contactPhone}.`,
      },
      { property: "og:title", content: "Contact Elegance Makeover" },
      {
        property: "og:description",
        content: "Get in touch for bookings, courses and consultations.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const siteContent = useSiteContent();
  const contact = siteContent?.contact;
  const social = siteContent?.social;
  const contactPhone = contact?.phone || siteConfig.contactPhone;
  const whatsappNumber = contact?.whatsapp || siteConfig.whatsappNumber;
  const contactEmail = contact?.email || siteConfig.contactEmail;
  const contactAddress = contact?.address || siteConfig.contactAddress;
  const mapUrl =
    contact?.map_url ||
    `https://www.google.com/maps?q=${encodeURIComponent(contactAddress)}&output=embed`;
  const workingHours = contact?.working_hours || siteConfig.contactHours;
  const instagramUrl = social?.instagram || siteConfig.instagramUrl;
  const facebookUrl = social?.facebook || siteConfig.facebookUrl;

  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    honeypot: "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitContactMessage({ data: form });
      setSent(true);
      trackEvent("contact_submit", {
        service: form.service || "unspecified",
        has_email: Boolean(form.email),
      });
      setTimeout(() => setSent(false), 4000);
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        honeypot: "",
      });
    } catch (error) {
      console.error(error);
      setSubmitError("We could not send your message yet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": ["ContactPage", "LocalBusiness"],
    name: siteConfig.siteName,
    url: canonicalUrl || siteConfig.siteUrl,
    telephone: contactPhone,
    email: contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactAddress,
      addressLocality: "Jajpur Road",
      addressRegion: "Odisha",
      addressCountry: "IN",
    },
    areaServed: "Odisha",
  };

  return (
    <SiteLayout>
      <StructuredData data={contactSchema} />
      {canonicalUrl ? (
        <StructuredData
          data={buildBreadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ],
            canonicalUrl,
          )}
        />
      ) : null}

      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let's create something <span className="gradient-gold-text italic">beautiful</span>
          </>
        }
        subtitle="We're here to answer every question - from bridal bookings to academy enrollment."
      />

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-10">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-soft">
            <h2 className="font-display text-3xl text-[var(--royal)]">Get in touch</h2>
            <p className="mt-1 text-sm text-muted-foreground">Open {workingHours}</p>

            <div className="mt-6 space-y-4">
              <a
                href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                onClick={() => trackEvent("phone_click", { location: "contact_page" })}
                className="group flex items-center gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-[var(--gold)]/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-royal">
                  <Phone className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-semibold text-foreground">{contactPhone}</div>
                </div>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                onClick={() => trackEvent("email_click", { location: "contact_page" })}
                className="flex items-center gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-[var(--gold)]/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-royal">
                  <Mail className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="break-all font-semibold text-foreground">{contactEmail}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-muted p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-royal">
                  <MapPin className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-semibold text-foreground">{contactAddress}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={instagramUrl}
                aria-label="Visit us on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full gradient-royal text-[var(--gold)] transition-transform hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={facebookUrl}
                aria-label="Visit us on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full gradient-royal text-[var(--gold)] transition-transform hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  aria-label="Message us on WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-full gradient-royal text-[var(--gold)] transition-transform hover:scale-110"
                >
                  <Phone className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="mt-6 h-64 overflow-hidden rounded-2xl border border-border">
              <iframe title="Map" src={mapUrl} className="h-full w-full" loading="lazy" />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-card rounded-3xl border border-border p-8 shadow-soft"
          >
            <h2 className="font-display text-3xl text-[var(--royal)]">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We respond within a few hours.</p>

            <input
              type="text"
              value={form.honeypot}
              onChange={(event) => setForm({ ...form, honeypot: event.target.value })}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              className="sr-only"
            />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Your Name"
                value={form.name}
                onChange={(value) => setForm({ ...form, name: value })}
                required
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) => setForm({ ...form, phone: value })}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => setForm({ ...form, email: value })}
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Service
                </label>
                <select
                  value={form.service}
                  onChange={(event) => setForm({ ...form, service: event.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-transparent bg-muted px-4 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
                >
                  <option value="">Select a service</option>
                  <option>Bridal Makeup</option>
                  <option>Party Makeup</option>
                  <option>Facial</option>
                  <option>Hair Styling</option>
                  <option>Academy Course</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-transparent bg-muted px-4 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
                  placeholder="Tell us about your event or needs..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent || isSubmitting}
              onClickCapture={() =>
                trackEvent("contact_submit_click", { location: "contact_form" })
              }
              className="btn-luxe mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-[#d4af37] px-6 py-3.5 font-semibold text-[var(--royal-deep)] shadow-gold"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : sent ? (
                <>
                  <Check className="h-4 w-4" /> Message Sent!
                </>
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
            {submitError ? <p className="mt-3 text-sm text-rose-700">{submitError}</p> : null}
          </form>
        </div>
      </section>

      <section className="marble-bg py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-[var(--purple-deep)]">FAQs</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-[var(--royal)]">
              Questions we hear most often
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Helpful answers for brides, students and walk-in clients before you reach out.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Do you handle bridal makeup and draping together?",
                a: "Yes. Bridal bookings can include makeup, hair styling, draping and finishing so the full look is coordinated in one appointment.",
              },
              {
                q: "How far in advance should I book for a wedding?",
                a: "For peak wedding dates, booking 2 to 8 weeks in advance is ideal. We still recommend checking availability even if your date is sooner.",
              },
              {
                q: "Do you offer academy courses for beginners?",
                a: "Yes. We offer beginner-friendly and advanced academy options with practical training, portfolio support and guidance on client work.",
              },
              {
                q: "Can I contact you on WhatsApp for quick questions?",
                a: "Absolutely. Use the WhatsApp button or call us directly for fast booking support, package details and location guidance.",
              },
            ].map((item) => (
              <article
                key={item.q}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-xl text-[var(--royal)]">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-transparent bg-muted px-4 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}
