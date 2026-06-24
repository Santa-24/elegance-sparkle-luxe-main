import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function getTodayForInput() {
  return new Date().toISOString().slice(0, 10);
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState("");
  const { serviceOptions, bookingFaqs } = Route.useLoaderData() as {
    serviceOptions: string[];
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
      if (!data.phone.trim()) errors.phone = "Please enter your phone number.";
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
      setStep(5);
      trackEvent("booking_submit", {
        service: data.service,
        booking_code_length: result.bookingCode.length,
      });
    } catch (error) {
      console.error(error);
      setSubmitError("We could not save your booking yet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SiteLayout>
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
                  {serviceOptions.map((s) => (
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
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
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
                <h2 className="font-display text-2xl text-[var(--royal)]">Date & Time</h2>
                <p className="text-sm text-muted-foreground">
                  Our working hours are {workingHours}. Preferred booking window: 9:00 AM - 11:00
                  AM.
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
                      onChange={(e) => {
                        setData({ ...data, date: e.target.value });
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
                      {appointmentSlots.map((t) => (
                        <button
                          key={t}
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
                              : "bg-muted hover:bg-[var(--gold)]/20"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {fieldErrors.time ? (
                      <p className="mt-3 text-sm text-rose-600">{fieldErrors.time}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl text-[var(--royal)]">Any notes for us?</h2>
                <p className="text-sm text-muted-foreground">
                  Tell us about your event, look or preferences.
                </p>
                <input
                  type="text"
                  value={data.honeypot}
                  onChange={(e) => setData({ ...data, honeypot: e.target.value })}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="sr-only"
                />
                <div className="mt-4 space-y-1.5">
                  <label htmlFor="notes-textarea" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Notes / Preferences
                  </label>
                  <textarea
                    id="notes-textarea"
                    rows={6}
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
                <h2 className="font-display text-3xl text-[var(--royal)]">Booking Confirmed!</h2>
                <p className="text-muted-foreground mt-2">
                  Thank you, {data.name || "beautiful"}. We'll contact you on{" "}
                  {data.phone || "your number"} shortly.
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
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=Booking%20${bookingId}%20-%20${encodeURIComponent(data.service)}%20on%20${data.date}%20at%20${data.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "booking_confirmation",
                      service: data.service,
                    })
                  }
                  className="btn-luxe mt-6 inline-flex px-6 py-3 rounded-full gradient-gold text-[var(--royal-deep)] font-semibold shadow-gold"
                >
                  Confirm on WhatsApp
                </a>
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
                  onClickCapture={() =>
                    step === 4
                      ? trackEvent("booking_step_submit_click", { step })
                      : trackEvent("booking_step_next_click", { step })
                  }
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
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--purple-deep)]">
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
