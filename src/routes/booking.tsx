import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Check, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { appointmentSlots, workingHours } from "@/admin/data";
import { createBookingRequest } from "@/lib/api/bookings.functions";
import { trackEvent } from "@/lib/analytics";
import { getSiteConfig } from "@/lib/site-config";
import { getLiveFaqSectionsFn, getLiveServicesFn } from "@/lib/content/live.functions";

const siteConfig = getSiteConfig();

export const Route = createFileRoute("/booking")({
  loader: async () => {
    const [services, faqSections] = await Promise.all([
      getLiveServicesFn(),
      getLiveFaqSectionsFn(),
    ]);
    return {
      serviceOptions: [
        ...new Set([...services.map((service) => service.title), "Academy Enquiry"]),
      ],
      bookingFaqs: faqSections.find((section) => section.slug === "booking")?.items ?? [],
    };
  },
  head: () => ({
    meta: [
      { title: "Book Appointment — Elegance Makeover" },
      {
        name: "description",
        content: "Book your bridal makeup, parlour service or academy enrollment in 4 easy steps.",
      },
      { property: "og:title", content: "Book Your Appointment — Elegance Makeover" },
      {
        property: "og:description",
        content: "Quick step-by-step booking for premium beauty services.",
      },
    ],
  }),
  component: BookingPage,
});

const serviceMap: Record<string, string> = {
  "bridal-makeup": "Bridal Makeup",
  "party-makeup": "Party Makeup",
  "facial": "Premium Facial",
  "hair-styling": "Hair Styling & Cut",
  "threading": "Threading & Brows",
  "academy": "Academy Enrollment"
};

const SERVICES = [
  "Bridal Makeup",
  "Party Makeup",
  "Premium Facial",
  "Hair Styling & Cut",
  "Threading & Brows",
  "Academy Enrollment"
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "5:30 PM",
  "7:00 PM"
];

function getTodayForInput() {
  return new Date().toISOString().slice(0, 10);
}

function getMaxDateForInput() {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().slice(0, 10);
}

function isTimeSlotPast(slot: string, selectedDate: string) {
  const todayStr = new Date().toISOString().slice(0, 10);
  if (selectedDate !== todayStr) return false;

  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();

  const [time, modifier] = slot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  if (hours < currentHours) return true;
  if (hours === currentHours && minutes <= currentMinutes) return true;

  return false;
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState("");
  const { bookingFaqs } = Route.useLoaderData() as {
    bookingFaqs: { question: string; answer: string }[];
  };

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
    honeypot: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam && serviceMap[serviceParam]) {
        setData((prev) => ({ ...prev, service: serviceMap[serviceParam] }));
      }
    }
  }, []);

  function next() {
    if (step < 5) setStep(step + 1);
  }
  function prev() {
    if (step > 1) setStep(step - 1);
  }

  function validateCurrentStep() {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!data.name.trim()) errors.name = "Please enter your full name.";
      
      const cleanPhone = data.phone.replace(/[\s\-\+\(\)]/g, "");
      if (!data.phone.trim()) {
        errors.phone = "Please enter your phone number.";
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone) && !/^\d{10}$/.test(cleanPhone)) {
        errors.phone = "Please enter a valid 10-digit Indian phone number.";
      }
    }

    if (step === 2 && !data.service.trim()) {
      errors.service = "Please choose a service.";
    }

    if (step === 3) {
      if (!data.date.trim()) errors.date = "Please select a preferred date.";
      if (!data.time.trim()) errors.time = "Please select a time slot.";
    }

    return errors;
  }

  function handleNext() {
    const errors = validateCurrentStep();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("Please fix the highlighted fields before continuing.");
      return;
    }

    setSubmitError("");
    setFieldErrors({});
    next();
  }

  function generateTempBookingCode() {
    return `EM-TEMP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }

  function redirectToWhatsApp(code: string) {
    const text = `Hi Elegance Makeover! I just booked ${data.service} on ${data.date} at ${data.time}. My name is ${data.name}, phone: ${data.phone}. Please confirm my slot.`;
    const whatsappUrl = `https://wa.me/919265200523?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  async function confirmBooking() {
    const errors = validateCurrentStep();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("Please fix the highlighted fields before confirming.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setFieldErrors({});

    try {
      const result = await createBookingRequest({ data });
      setBookingId(result.bookingCode);
      
      // Redirect to WhatsApp
      redirectToWhatsApp(result.bookingCode);
      setStep(5);
      
      trackEvent("booking_submit", {
        service: data.service,
        booking_code_length: result.bookingCode.length,
      });
    } catch (error) {
      console.error("Supabase insert failed. Redirecting to WhatsApp anyway:", error);
      const tempCode = generateTempBookingCode();
      setBookingId(tempCode);
      redirectToWhatsApp(tempCode);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  }

  const faqSchema = bookingFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": bookingFaqs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <SiteLayout>
      {faqSchema && <StructuredData data={faqSchema} />}
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Booking" }]}
        eyebrow="Booking"
        title={
          <>
            Reserve your <span className="gradient-gold-text italic">slot</span>
          </>
        }
        subtitle="Four quick steps and we'll lock in your luxury beauty experience."
      />

      <section className="bg-background py-14">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          {/* Step indicator */}
          <div className="flex items-center justify-between gap-2 sm:gap-0 mb-10 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="min-w-0 flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold transition-all ${
                    step >= n
                      ? "gradient-gold text-[var(--royal-deep)] shadow-gold"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </div>
                {n < 4 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step > n ? "gradient-gold" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-7 md:p-10 shadow-soft min-h-[400px]">
            {step === 1 && (
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl text-[var(--royal)]">Your Details</h2>
                <p className="text-sm text-muted-foreground">So we know who to pamper.</p>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Full Name
                    </label>
                    <Input
                      id="name-input"
                      value={data.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                        if (fieldErrors.name) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.name;
                            return next;
                          });
                        }
                      }}
                      error={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" role="alert" aria-live="polite" className="mt-1.5 text-sm text-rose-600 font-medium">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone-input" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Phone Number
                    </label>
                    <Input
                      id="phone-input"
                      type="tel"
                      value={data.phone}
                      placeholder="e.g. 9876543210"
                      onChange={(e) => {
                        setData({ ...data, phone: e.target.value });
                        if (fieldErrors.phone) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.phone;
                            return next;
                          });
                        }
                      }}
                      error={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    />
                    {fieldErrors.phone && (
                      <p id="phone-error" role="alert" aria-live="polite" className="mt-1.5 text-sm text-rose-600 font-medium">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Email (optional)
                    </label>
                    <Input
                      id="email-input"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl text-[var(--royal)]">Choose a Service</h2>
                <p className="text-sm text-muted-foreground">Pick what you'd love to experience.</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setData({ ...data, service: s });
                        if (fieldErrors.service) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.service;
                            return next;
                          });
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        data.service === s
                          ? "border-[var(--gold)] bg-[var(--gold)]/10"
                          : "border-border hover:border-[var(--gold)]/50"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[var(--purple-deep)] mb-2" />
                      <div className="font-semibold text-sm">{s}</div>
                    </button>
                  ))}
                </div>
                {fieldErrors.service ? (
                  <p className="mt-3 text-sm text-rose-600">{fieldErrors.service}</p>
                ) : null}
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl text-[var(--royal)]">Pick Date & Time</h2>
                <p className="text-sm text-muted-foreground">
                  Select a convenient day and available time slot.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="date-input" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Preferred Date
                    </label>
                    <Input
                      id="date-input"
                      type="date"
                      value={data.date}
                      min={getTodayForInput()}
                      max={getMaxDateForInput()}
                      onChange={(e) => {
                        setData({ ...data, date: e.target.value, time: "" }); // Reset time when date changes
                        if (fieldErrors.date) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.date;
                            return next;
                          });
                        }
                      }}
                      error={Boolean(fieldErrors.date)}
                      aria-describedby={fieldErrors.date ? "date-error" : undefined}
                    />
                    {fieldErrors.date && (
                      <p id="date-error" role="alert" aria-live="polite" className="mt-1.5 text-sm text-rose-600 font-medium">
                        {fieldErrors.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Time Slot
                    </label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const isPast = isTimeSlotPast(t, data.date);
                        return (
                          <button
                            key={t}
                            disabled={isPast}
                            onClick={() => {
                              setData({ ...data, time: t });
                              if (fieldErrors.time) {
                                setFieldErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.time;
                                  return next;
                                });
                              }
                            }}
                            className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              data.time === t
                                ? "gradient-gold text-[var(--royal-deep)] shadow-gold"
                                : isPast
                                  ? "bg-muted text-muted-foreground/45 cursor-not-allowed opacity-50"
                                  : "bg-muted hover:bg-[var(--gold)]/20 cursor-pointer"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.time ? (
                      <p className="mt-3 text-sm text-rose-600">{fieldErrors.time}</p>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Note: We confirm availability via WhatsApp within 2 hours.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl text-[var(--royal)]">Confirm & Submit</h2>
                <p className="text-sm text-muted-foreground">Please review your booking details.</p>
                
                <div className="mt-6 space-y-4 rounded-2xl border border-border bg-muted/40 p-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Full Name</span>
                      <strong className="text-foreground text-[15px]">{data.name}</strong>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Phone Number</span>
                      <strong className="text-foreground text-[15px]">{data.phone}</strong>
                    </div>
                    {data.email && (
                      <div className="col-span-2">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground block">Email Address</span>
                        <strong className="text-foreground text-[15px]">{data.email}</strong>
                      </div>
                    )}
                    <div className="col-span-2 border-t border-border/60 pt-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Selected Service</span>
                      <strong className="text-gold-safe text-base font-semibold">{data.service}</strong>
                    </div>
                    <div className="border-t border-border/60 pt-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Preferred Date</span>
                      <strong className="text-foreground text-[15px]">{data.date}</strong>
                    </div>
                    <div className="border-t border-border/60 pt-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Preferred Time</span>
                      <strong className="text-foreground text-[15px]">{data.time}</strong>
                    </div>
                  </div>
                </div>

                {/* Honeypot field spam protection */}
                <input
                  type="text"
                  value={data.honeypot}
                  onChange={(e) => setData({ ...data, honeypot: e.target.value })}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="sr-only"
                />

                <div className="mt-6 space-y-1.5">
                  <label htmlFor="notes-textarea" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Special Notes / Request (optional)
                  </label>
                  <textarea
                    id="notes-textarea"
                    rows={3}
                    value={data.notes}
                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                    placeholder="E.g. Reception look, preferred shades, allergies..."
                    className="w-full bg-card rounded-lg px-4 py-3 text-[15px] border border-input shadow-sm transition-all duration-200 hover:border-gold/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold focus-visible:border-gold"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-up text-center py-6">
                <div className="w-20 h-20 mx-auto rounded-full gradient-gold flex items-center justify-center shadow-gold mb-5 animate-pulse-gold">
                  <Check className="w-9 h-9 text-[var(--royal-deep)]" />
                </div>
                <h2 className="font-display text-3xl text-[var(--royal)]">Booking Request Sent!</h2>
                <p className="text-muted-foreground mt-2">
                  Booking request sent! We'll confirm your slot on WhatsApp within 2 hours.
                </p>
                <div className="mt-6 inline-block gold-border px-6 py-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Booking ID
                  </div>
                  <div className="font-display text-xl text-gold-safe font-bold">
                    {bookingId}
                  </div>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>
                    <strong>Service:</strong> {data.service || "—"}
                  </p>
                  <p>
                    <strong>Date:</strong> {data.date || "—"} at {data.time || "—"}
                  </p>
                </div>
                <button
                  onClick={() => redirectToWhatsApp(bookingId)}
                  className="btn-luxe mt-6 inline-flex px-6 py-3 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold cursor-pointer"
                >
                  Message on WhatsApp again
                </button>
              </div>
            )}

            {step < 5 && (
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="px-5 py-2.5 rounded-full bg-muted text-foreground/80 disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={step === 4 ? confirmBooking : handleNext}
                  disabled={isSubmitting}
                  className="btn-luxe px-6 py-2.5 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : step === 4 ? "Confirm Booking" : "Next"}{" "}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {submitError ? <p className="mt-4 text-sm text-rose-700">{submitError}</p> : null}
          </div>
        </div>
      </section>

      <section className="marble-bg py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)] font-semibold">
              Booking FAQs
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--royal)] mt-2">
              A few things to know before you{" "}
              <span className="text-gold-safe italic">confirm</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {bookingFaqs.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <summary className="cursor-pointer list-none font-display text-lg text-[var(--royal)]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
