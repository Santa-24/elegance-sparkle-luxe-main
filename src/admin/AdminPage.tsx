import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  CalendarClock,
  CircleCheckBig,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Plus,
  Phone,
  Pencil,
  Shield,
  Sparkles,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { adminStats, appointmentSlots } from "@/admin/data";
import {
  getAdminSessionStatus,
  loginAdmin,
  logoutAdmin,
} from "@/admin/api";
import {
  deleteAdminAdvertisement,
  deleteAdminAboutContent,
  deleteAdminBooking,
  deleteAdminContactSettings,
  deleteAdminGalleryItem,
  deleteAdminHeroContent,
  deleteAdminFaqSection,
  deleteAdminOffer,
  deleteAdminPricingPackage,
  deleteAdminSeoSettings,
  deleteAdminSocialLinks,
  deleteAdminServiceArea,
  deleteAdminService,
  deleteAdminTestimonial,
  listAdminAdvertisements,
  listAdminAboutContent,
  listAdminBookings,
  listAdminFaqSections,
  listAdminContactSettings,
  listAdminGalleryItems,
  listAdminHeroContent,
  listAdminOffers,
  listAdminPricingPackages,
  listAdminSeoSettings,
  listAdminSocialLinks,
  listAdminServiceAreas,
  listAdminServices,
  listAdminTestimonials,
  type AdminAdvertisementRecord,
  type AdminAboutContentRecord,
  type AdminBookingRecord,
  type AdminFaqSectionRecord,
  type AdminContactSettingsRecord,
  type AdminGalleryRecord,
  type AdminHeroContentRecord,
  type AdminOfferRecord,
  type AdminPricingPackageRecord,
  type AdminSeoSettingsRecord,
  type AdminSocialLinksRecord,
  type AdminServiceAreaRecord,
  type AdminServiceRecord,
  type AdminTestimonialRecord,
  updateAdminBooking,
  upsertAdminAdvertisement,
  upsertAdminAboutContent,
  upsertAdminFaqSection,
  upsertAdminContactSettings,
  upsertAdminHeroContent,
  upsertAdminSeoSettings,
  upsertAdminSocialLinks,
  upsertAdminServiceArea,
  upsertAdminGalleryItem,
  upsertAdminOffer,
  upsertAdminPricingPackage,
  upsertAdminService,
  upsertAdminTestimonial,
  uploadAdminAsset,
} from "@/admin/api";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();

type AdminSection =
  | "Bookings"
  | "Services"
  | "Gallery"
  | "Testimonials"
  | "Offers"
  | "Pricing Packages"
  | "Ads"
  | "Hero"
  | "About"
  | "Contact"
  | "Social"
  | "FAQ"
  | "Service Areas"
  | "SEO";

type AdminBookingView = {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected" | "Rescheduled" | "Completed" | "Cancelled";
  phone: string;
  email?: string | null;
  notes?: string | null;
};

type DraftValue = string | number | boolean;
type DraftState = Record<string, DraftValue>;
type EditorMode = "view" | "create" | "edit";

type DashboardData = {
  bookings: AdminBookingView[];
  services: AdminServiceRecord[];
  gallery: AdminGalleryRecord[];
  testimonials: AdminTestimonialRecord[];
  offers: AdminOfferRecord[];
  pricingPackages: AdminPricingPackageRecord[];
  advertisements: AdminAdvertisementRecord[];
  heroContent: AdminHeroContentRecord[];
  aboutContent: AdminAboutContentRecord[];
  contactSettings: AdminContactSettingsRecord[];
  socialLinks: AdminSocialLinksRecord[];
  faqSections: AdminFaqSectionRecord[];
  serviceAreas: AdminServiceAreaRecord[];
  seoSettings: AdminSeoSettingsRecord[];
};

const sectionDataKeys: Record<AdminSection, keyof DashboardData> = {
  Bookings: "bookings",
  Services: "services",
  Gallery: "gallery",
  Testimonials: "testimonials",
  Offers: "offers",
  "Pricing Packages": "pricingPackages",
  Ads: "advertisements",
  Hero: "heroContent",
  About: "aboutContent",
  Contact: "contactSettings",
  Social: "socialLinks",
  FAQ: "faqSections",
  "Service Areas": "serviceAreas",
  SEO: "seoSettings",
};

type FieldKind = "text" | "number" | "date" | "textarea" | "select" | "checkbox" | "file";

type FieldOption = {
  label: string;
  value: string;
};

type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
  options?: FieldOption[];
  placeholder?: string;
};

type SectionConfig = {
  key: AdminSection;
  title: string;
  summary: string;
  fields: FieldDef[];
  canCreate: boolean;
};

const sectionConfigs: Record<AdminSection, SectionConfig> = {
  Bookings: {
    key: "Bookings",
    title: "Bookings",
    summary: "Edit booking details, change status, or remove a request.",
    canCreate: false,
    fields: [
      { key: "customer_name", label: "Customer", kind: "text" },
      { key: "phone", label: "Phone", kind: "text" },
      { key: "email", label: "Email", kind: "text" },
      { key: "service_name", label: "Service", kind: "text" },
      { key: "booking_date", label: "Date", kind: "date" },
      {
        key: "booking_time",
        label: "Time",
        kind: "select",
        options: appointmentSlots.map((slot) => ({ label: slot, value: slot })),
      },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
          { label: "Rescheduled", value: "rescheduled" },
          { label: "Completed", value: "completed" },
        ],
      },
      { key: "notes", label: "Notes", kind: "textarea" },
    ],
  },
  Services: {
    key: "Services",
    title: "Services",
    summary: "Create, edit, hide, or delete any service entry.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "category",
        label: "Category",
        kind: "select",
        options: [
          { label: "Bridal", value: "bridal" },
          { label: "Parlour", value: "parlour" },
          { label: "Academy", value: "academy" },
        ],
      },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "price_label", label: "Price", kind: "text" },
      { key: "duration_label", label: "Duration", kind: "text" },
      { key: "image_url", label: "Image upload", kind: "file" },
      { key: "featured", label: "Featured", kind: "checkbox" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Gallery: {
    key: "Gallery",
    title: "Gallery",
    summary: "Manage gallery assets and sort order.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "category",
        label: "Category",
        kind: "select",
        options: [
          { label: "Bridal", value: "bridal" },
          { label: "Parlour", value: "parlour" },
          { label: "Before & After", value: "before_after" },
          { label: "Academy", value: "academy" },
        ],
      },
      { key: "image_url", label: "Image upload", kind: "file" },
      { key: "alt_text", label: "Alt text", kind: "text" },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Testimonials: {
    key: "Testimonials",
    title: "Testimonials",
    summary: "Publish or draft reviews and remove unwanted entries.",
    canCreate: true,
    fields: [
      { key: "customer_name", label: "Customer", kind: "text" },
      { key: "service_name", label: "Service", kind: "text" },
      { key: "rating", label: "Rating", kind: "number" },
      { key: "review_text", label: "Review", kind: "textarea" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Visible", value: "visible" },
          { label: "Draft", value: "draft" },
        ],
      },
    ],
  },
  Offers: {
    key: "Offers",
    title: "Offers",
    summary: "Adjust active campaigns, schedules, and expiry windows.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "discount_label", label: "Discount", kind: "text" },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "valid_from", label: "Starts", kind: "date" },
      { key: "valid_until", label: "Ends", kind: "date" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Scheduled", value: "scheduled" },
          { label: "Active", value: "active" },
          { label: "Expired", value: "expired" },
        ],
      },
    ],
  },
  "Pricing Packages": {
    key: "Pricing Packages",
    title: "Pricing Packages",
    summary: "Edit bridal package names, prices, popularity flags, and included features.",
    canCreate: true,
    fields: [
      { key: "name", label: "Package name", kind: "text" },
      { key: "price", label: "Price", kind: "number" },
      { key: "popular", label: "Popular", kind: "checkbox" },
      {
        key: "features_text",
        label: "Features",
        kind: "textarea",
        placeholder: "One feature per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Ads: {
    key: "Ads",
    title: "Ads",
    summary: "Manage posters and banners shown in promotions.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "asset_url", label: "Poster upload", kind: "file" },
      {
        key: "asset_type",
        label: "Type",
        kind: "select",
        options: [
          { label: "Poster", value: "poster" },
          { label: "Banner", value: "banner" },
        ],
      },
      { key: "start_date", label: "Start date", kind: "date" },
      { key: "end_date", label: "End date", kind: "date" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
          { label: "Archived", value: "archived" },
        ],
      },
    ],
  },
  Hero: {
    key: "Hero",
    title: "Hero",
    summary: "Edit the homepage hero heading, CTA buttons, and hero image.",
    canCreate: true,
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "textarea" },
      { key: "primary_cta_label", label: "Primary CTA", kind: "text" },
      { key: "primary_cta_url", label: "Primary URL", kind: "text" },
      { key: "secondary_cta_label", label: "Secondary CTA", kind: "text" },
      { key: "secondary_cta_url", label: "Secondary URL", kind: "text" },
      { key: "hero_image_url", label: "Hero image", kind: "file" },
      { key: "hero_image_alt", label: "Hero image alt", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  About: {
    key: "About",
    title: "About",
    summary: "Manage about-section text, highlights, and supporting images.",
    canCreate: true,
    fields: [
      { key: "headline", label: "Headline", kind: "text" },
      { key: "body", label: "Body", kind: "textarea" },
      {
        key: "bullet_points",
        label: "Bullet points",
        kind: "textarea",
        placeholder: "One point per line",
      },
      { key: "founder_name", label: "Founder name", kind: "text" },
      { key: "founder_title", label: "Founder title", kind: "text" },
      { key: "founder_image_url", label: "Founder image", kind: "file" },
      { key: "gallery_image_url", label: "Gallery image", kind: "file" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Contact: {
    key: "Contact",
    title: "Contact",
    summary: "Update the public contact details, address, and working hours.",
    canCreate: true,
    fields: [
      { key: "phone", label: "Phone", kind: "text" },
      { key: "whatsapp", label: "WhatsApp", kind: "text" },
      { key: "email", label: "Email", kind: "text" },
      { key: "address", label: "Address", kind: "textarea" },
      { key: "map_url", label: "Map URL", kind: "text" },
      { key: "working_hours", label: "Working hours", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Social: {
    key: "Social",
    title: "Social",
    summary: "Manage the social links displayed in the client footer and contact area.",
    canCreate: true,
    fields: [
      { key: "instagram", label: "Instagram", kind: "text" },
      { key: "facebook", label: "Facebook", kind: "text" },
      { key: "youtube", label: "YouTube", kind: "text" },
      { key: "whatsapp", label: "WhatsApp", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  FAQ: {
    key: "FAQ",
    title: "FAQ",
    summary: "Manage public FAQ sections and their question/answer entries.",
    canCreate: true,
    fields: [
      { key: "title", label: "Section title", kind: "text" },
      { key: "slug", label: "Section slug", kind: "text", placeholder: "booking" },
      { key: "description", label: "Description", kind: "textarea" },
      {
        key: "items_text",
        label: "Items",
        kind: "textarea",
        placeholder: "Question || Answer per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  "Service Areas": {
    key: "Service Areas",
    title: "Service Areas",
    summary: "Manage local coverage areas shown on the public site.",
    canCreate: true,
    fields: [
      { key: "name", label: "Area name", kind: "text" },
      { key: "summary", label: "Summary", kind: "textarea" },
      { key: "search_intent", label: "Search intent", kind: "textarea" },
      {
        key: "highlights_text",
        label: "Highlights",
        kind: "textarea",
        placeholder: "One highlight per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  SEO: {
    key: "SEO",
    title: "SEO",
    summary: "Control meta titles, descriptions, keywords, canonical URLs, and OG images.",
    canCreate: true,
    fields: [
      { key: "meta_title", label: "Meta title", kind: "text" },
      { key: "meta_description", label: "Meta description", kind: "textarea" },
      {
        key: "keywords",
        label: "Keywords",
        kind: "textarea",
        placeholder: "Comma-separated keywords",
      },
      { key: "canonical_url", label: "Canonical URL", kind: "text" },
      { key: "og_image_url", label: "OG image", kind: "file" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
};

function emptyDraftFor(section: AdminSection): DraftState {
  switch (section) {
    case "Bookings":
      return {
        customer_name: "",
        phone: "",
        email: "",
        service_name: "",
        booking_date: "",
        booking_time: "",
        status: "pending",
        notes: "",
      };
    case "Services":
      return {
        title: "",
        category: "bridal",
        description: "",
        price_label: "",
        duration_label: "",
        image_url: "",
        featured: false,
        is_active: true,
      };
    case "Gallery":
      return {
        title: "",
        category: "bridal",
        image_url: "",
        alt_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Testimonials":
      return {
        customer_name: "",
        service_name: "",
        rating: 5,
        review_text: "",
        status: "visible",
      };
    case "Offers":
      return {
        title: "",
        discount_label: "",
        description: "",
        valid_from: "",
        valid_until: "",
        status: "active",
      };
    case "Pricing Packages":
      return {
        name: "",
        price: 0,
        popular: false,
        features_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Ads":
      return {
        title: "",
        asset_url: "",
        asset_type: "poster",
        start_date: "",
        end_date: "",
        status: "active",
      };
    case "Hero":
      return {
        heading: "",
        subtitle: "",
        primary_cta_label: "",
        primary_cta_url: "",
        secondary_cta_label: "",
        secondary_cta_url: "",
        hero_image_url: "",
        hero_image_alt: "",
        is_active: true,
      };
    case "About":
      return {
        headline: "",
        body: "",
        bullet_points: "",
        founder_name: "",
        founder_title: "",
        founder_image_url: "",
        gallery_image_url: "",
        is_active: true,
      };
    case "Contact":
      return {
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        map_url: "",
        working_hours: "",
        is_active: true,
      };
    case "Social":
      return {
        instagram: "",
        facebook: "",
        youtube: "",
        whatsapp: "",
        is_active: true,
      };
    case "FAQ":
      return {
        title: "",
        slug: "",
        description: "",
        items_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Service Areas":
      return {
        name: "",
        summary: "",
        search_intent: "",
        highlights_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "SEO":
      return {
        meta_title: "",
        meta_description: "",
        keywords: "",
        canonical_url: "",
        og_image_url: "",
        is_active: true,
      };
  }
}

function draftFromRecord(section: AdminSection, record: Record<string, unknown>): DraftState {
  switch (section) {
    case "Bookings":
      return {
        customer_name: String(record.name ?? ""),
        phone: String(record.phone ?? ""),
        email: String(record.email ?? ""),
        service_name: String(record.service ?? ""),
        booking_date: String(record.date ?? ""),
        booking_time: String(record.time ?? ""),
        status: String(record.status ?? "").toLowerCase(),
        notes: String(record.notes ?? ""),
      };
    case "Services":
      return {
        title: String(record.title ?? ""),
        category: String(record.category ?? "bridal"),
        description: String(record.description ?? ""),
        price_label: String(record.price_label ?? ""),
        duration_label: String(record.duration_label ?? ""),
        image_url: String(record.image_url ?? ""),
        featured: Boolean(record.featured),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Gallery":
      return {
        title: String(record.title ?? ""),
        category: String(record.category ?? "bridal"),
        image_url: String(record.image_url ?? ""),
        alt_text: String(record.alt_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Testimonials":
      return {
        customer_name: String(record.customer_name ?? ""),
        service_name: String(record.service_name ?? ""),
        rating: Number(record.rating ?? 5),
        review_text: String(record.review_text ?? ""),
        status: String(record.status ?? "visible"),
      };
    case "Offers":
      return {
        title: String(record.title ?? ""),
        discount_label: String(record.discount_label ?? ""),
        description: String(record.description ?? ""),
        valid_from: String(record.valid_from ?? ""),
        valid_until: String(record.valid_until ?? ""),
        status: String(record.status ?? "active"),
      };
    case "Pricing Packages":
      return {
        name: String(record.name ?? ""),
        price: Number(record.price ?? 0),
        popular: Boolean(record.popular),
        features_text: String(record.features_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Ads":
      return {
        title: String(record.title ?? ""),
        asset_url: String(record.asset_url ?? ""),
        asset_type: String(record.asset_type ?? "poster"),
        start_date: String(record.start_date ?? ""),
        end_date: String(record.end_date ?? ""),
        status: String(record.status ?? "active"),
      };
    case "Hero":
      return {
        heading: String(record.heading ?? ""),
        subtitle: String(record.subtitle ?? ""),
        primary_cta_label: String(record.primary_cta_label ?? ""),
        primary_cta_url: String(record.primary_cta_url ?? ""),
        secondary_cta_label: String(record.secondary_cta_label ?? ""),
        secondary_cta_url: String(record.secondary_cta_url ?? ""),
        hero_image_url: String(record.hero_image_url ?? ""),
        hero_image_alt: String(record.hero_image_alt ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "About": {
      const points = Array.isArray(record.bullet_points)
        ? record.bullet_points.join("\n")
        : String(record.bullet_points ?? "");

      return {
        headline: String(record.headline ?? ""),
        body: String(record.body ?? ""),
        bullet_points: points,
        founder_name: String(record.founder_name ?? ""),
        founder_title: String(record.founder_title ?? ""),
        founder_image_url: String(record.founder_image_url ?? ""),
        gallery_image_url: String(record.gallery_image_url ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    }
    case "Contact":
      return {
        phone: String(record.phone ?? ""),
        whatsapp: String(record.whatsapp ?? ""),
        email: String(record.email ?? ""),
        address: String(record.address ?? ""),
        map_url: String(record.map_url ?? ""),
        working_hours: String(record.working_hours ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Social":
      return {
        instagram: String(record.instagram ?? ""),
        facebook: String(record.facebook ?? ""),
        youtube: String(record.youtube ?? ""),
        whatsapp: String(record.whatsapp ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "FAQ":
      return {
        title: String(record.title ?? ""),
        slug: String(record.slug ?? ""),
        description: String(record.description ?? ""),
        items_text: String(record.items_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Service Areas":
      return {
        name: String(record.name ?? ""),
        summary: String(record.summary ?? ""),
        search_intent: String(record.search_intent ?? ""),
        highlights_text: String(record.highlights_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "SEO":
      return {
        meta_title: String(record.meta_title ?? ""),
        meta_description: String(record.meta_description ?? ""),
        keywords: String(record.keywords ?? ""),
        canonical_url: String(record.canonical_url ?? ""),
        og_image_url: String(record.og_image_url ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
  }
}

function isDataUrl(value: unknown) {
  return typeof value === "string" && value.startsWith("data:");
}

async function persistMediaAsset(section: AdminSection, title: string, value: unknown) {
  if (!isDataUrl(value)) {
    return typeof value === "string" ? value : "";
  }

  const folder =
    section === "Ads"
      ? "advertisements"
      : section === "Gallery"
        ? "gallery"
        : section === "Hero" || section === "About" || section === "SEO"
          ? "site-content"
          : "services";
  const fileName = title || `${section.toLowerCase()}-asset`;
  const uploaded = await uploadAdminAsset({
    data: {
      bucket: "",
      folder,
      fileName,
      dataUrl: String(value),
    },
  });

  return uploaded.publicUrl;
}

async function safeLoadList<T>(loader: () => Promise<T[]>) {
  try {
    const data = await loader();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadDashboardData(): Promise<DashboardData> {
  const [
    bookings,
    services,
    gallery,
    testimonials,
    offers,
    pricingPackages,
    advertisements,
    heroContent,
    aboutContent,
    contactSettings,
    socialLinks,
    faqSections,
    serviceAreas,
    seoSettings,
  ] = await Promise.all([
    safeLoadList(listAdminBookings),
    safeLoadList(listAdminServices),
    safeLoadList(listAdminGalleryItems),
    safeLoadList(listAdminTestimonials),
    safeLoadList(listAdminOffers),
    safeLoadList(listAdminPricingPackages),
    safeLoadList(listAdminAdvertisements),
    safeLoadList(listAdminHeroContent),
    safeLoadList(listAdminAboutContent),
    safeLoadList(listAdminContactSettings),
    safeLoadList(listAdminSocialLinks),
    safeLoadList(listAdminFaqSections),
    safeLoadList(listAdminServiceAreas),
    safeLoadList(listAdminSeoSettings),
  ]);

  return {
    bookings,
    services,
    gallery,
    testimonials,
    offers,
    pricingPackages,
    advertisements,
    heroContent,
    aboutContent,
    contactSettings,
    socialLinks,
    faqSections,
    serviceAreas,
    seoSettings,
  };
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Manage bookings, services, gallery content, testimonials and offers for Elegance Makeover & Academy.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [email, setEmail] = useState(siteConfig.adminEmail);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("Bookings");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    bookings: [],
    services: [],
    gallery: [],
    testimonials: [],
    offers: [],
    pricingPackages: [],
    advertisements: [],
    heroContent: [],
    aboutContent: [],
    contactSettings: [],
    socialLinks: [],
    faqSections: [],
    serviceAreas: [],
    seoSettings: [],
  });
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>("view");
  const [draft, setDraft] = useState<DraftState>(emptyDraftFor("Bookings"));

  const siteTel = `tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`;

  useEffect(() => {
    let cancelled = false;

    async function hydrateSession() {
      try {
        const session = await getAdminSessionStatus();
        if (!cancelled && session.authenticated) {
          setEmail(session.email ?? "");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    void hydrateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await loadDashboardData();
        if (!cancelled) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setActionError(
            error instanceof Error
              ? `Could not load admin data from Supabase: ${error.message}`
              : "Could not load admin data from Supabase.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const activeItems = Array.isArray(dashboardData[sectionDataKeys[activeSection]])
    ? (dashboardData[sectionDataKeys[activeSection]] as Array<
        Record<string, unknown> & { id: string | number }
      >)
    : [];

  const selectedRecord = activeItems.find((item) => String(item.id) === String(selectedId));
  const initialDraft = useMemo(() => {
    if (editorMode === "create") {
      return emptyDraftFor(activeSection);
    }

    return selectedRecord
      ? draftFromRecord(activeSection, selectedRecord)
      : emptyDraftFor(activeSection);
  }, [activeSection, editorMode, selectedRecord]);
  const draftSignature = JSON.stringify(draft);
  const initialDraftSignature = JSON.stringify(initialDraft);
  const hasUnsavedChanges = editorMode !== "view" && draftSignature !== initialDraftSignature;

  useEffect(() => {
    if (!selectedRecord) {
      setDraft(emptyDraftFor(activeSection));
      return;
    }

    setDraft(draftFromRecord(activeSection, selectedRecord));
  }, [activeSection, selectedRecord]);

  useEffect(() => {
    setSelectedId(null);
    setEditorMode("view");
  }, [activeSection]);

  const closeEditor = useCallback(
    (force = false) => {
      if (!force && hasUnsavedChanges) {
        const shouldDiscard = window.confirm(
          "You have unsaved changes. Close the editor and discard them?",
        );
        if (!shouldDiscard) {
          return;
        }
      }

      setDraft(initialDraft);
      setEditorMode("view");
    },
    [hasUnsavedChanges, initialDraft],
  );

  useEffect(() => {
    if (editorMode === "view") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeEditor();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorMode, activeSection, selectedRecord, closeEditor]);

  const liveStats = useMemo(
    () =>
      adminStats.map((item) => {
        if (item.label === "Total bookings") {
          return { ...item, value: String(dashboardData.bookings.length) };
        }

        if (item.label === "Customers") {
          return {
            ...item,
            value: String(new Set(dashboardData.bookings.map((item) => item.phone)).size),
          };
        }

        if (item.label === "Active offers") {
          return {
            ...item,
            value: String(dashboardData.offers.filter((offer) => offer.status === "active").length),
          };
        }

        if (item.label === "Gallery images") {
          return {
            ...item,
            value: String(dashboardData.gallery.filter((item) => item.is_active).length),
          };
        }

        if (item.label === "Upcoming appointments") {
          return {
            ...item,
            value: String(
              dashboardData.bookings.filter((booking) => booking.status !== "Rejected").length,
            ),
          };
        }

        return item;
      }),
    [dashboardData],
  );

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const result = await loginAdmin({ data: { email, password } });
      if (result.authorized) {
        setPassword("");
        setAuthError("");
        setIsAuthenticated(true);
        return;
      }

      setAuthError("Unable to sign in. Please check your email and password.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.toLowerCase().includes("invalid login credentials")) {
        setAuthError(
          "Invalid email or password. Please try again.",
        );
        return;
      }

      setAuthError(
        message
          ? `Unable to sign in: ${message}`
          : "Unable to sign in. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  }

  function selectRecord(id: string | number) {
    setSelectedId(id);
    setEditorMode("edit");
  }

  function startCreate() {
    setSelectedId(null);
    setDraft(emptyDraftFor(activeSection));
    setEditorMode("create");
  }

  async function refreshData() {
    const data = await loadDashboardData();
    setDashboardData(data);
  }

  async function handleDelete(id: string | number) {
    setActionError("");
    try {
      switch (activeSection) {
        case "Bookings":
          await deleteAdminBooking({ data: { bookingCode: String(id) } });
          break;
        case "Services":
          await deleteAdminService({ data: { id: Number(id) } });
          break;
        case "Gallery":
          await deleteAdminGalleryItem({ data: { id: Number(id) } });
          break;
        case "Testimonials":
          await deleteAdminTestimonial({ data: { id: Number(id) } });
          break;
        case "Offers":
          await deleteAdminOffer({ data: { id: Number(id) } });
          break;
        case "Pricing Packages":
          await deleteAdminPricingPackage({ data: { id: Number(id) } });
          break;
        case "Ads":
          await deleteAdminAdvertisement({ data: { id: Number(id) } });
          break;
        case "Hero":
          await deleteAdminHeroContent({ data: { id: Number(id) } });
          break;
        case "About":
          await deleteAdminAboutContent({ data: { id: Number(id) } });
          break;
        case "Contact":
          await deleteAdminContactSettings({ data: { id: Number(id) } });
          break;
        case "Social":
          await deleteAdminSocialLinks({ data: { id: Number(id) } });
          break;
        case "FAQ":
          await deleteAdminFaqSection({ data: { id: Number(id) } });
          break;
        case "Service Areas":
          await deleteAdminServiceArea({ data: { id: Number(id) } });
          break;
        case "SEO":
          await deleteAdminSeoSettings({ data: { id: Number(id) } });
          break;
      }

      if (String(selectedId) === String(id)) {
        setSelectedId(null);
        setEditorMode("view");
      }

      await refreshData();
    } catch (error) {
      console.error(error);
      setActionError("Delete failed. Please check the Supabase connection and try again.");
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActionError("");

    try {
      let savedId: string | number | null = null;

      switch (activeSection) {
        case "Bookings": {
          if (!selectedRecord) {
            setActionError("Pick an existing booking before saving edits.");
            return;
          }

          const saved = await updateAdminBooking({
            data: {
              bookingCode: String(selectedRecord.id),
              customer_name: String(draft.customer_name ?? ""),
              phone: String(draft.phone ?? ""),
              email: String(draft.email ?? ""),
              service_name: String(draft.service_name ?? ""),
              booking_date: String(draft.booking_date ?? ""),
              booking_time: String(draft.booking_time ?? ""),
              status: String(draft.status ?? "pending") as
                | "pending"
                | "approved"
                | "rejected"
                | "rescheduled"
                | "completed",
              notes: String(draft.notes ?? ""),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Services": {
          const imageUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "service"),
            draft.image_url,
          );
          const saved = await upsertAdminService({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              category: String(draft.category ?? "bridal") as "bridal" | "parlour" | "academy",
              description: String(draft.description ?? ""),
              price_label: String(draft.price_label ?? ""),
              duration_label: String(draft.duration_label ?? ""),
              image_url: imageUrl,
              featured: Boolean(draft.featured),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Gallery": {
          const imageUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "gallery"),
            draft.image_url,
          );
          const saved = await upsertAdminGalleryItem({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              category: String(draft.category ?? "bridal") as
                | "bridal"
                | "parlour"
                | "before_after"
                | "academy",
              image_url: imageUrl,
              alt_text: String(draft.alt_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Testimonials": {
          const saved = await upsertAdminTestimonial({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              customer_name: String(draft.customer_name ?? ""),
              service_name: String(draft.service_name ?? ""),
              rating: Number(draft.rating ?? 5),
              review_text: String(draft.review_text ?? ""),
              status: String(draft.status ?? "visible") as "visible" | "draft",
            },
          });
          savedId = saved.id;
          break;
        }
        case "Offers": {
          const saved = await upsertAdminOffer({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              discount_label: String(draft.discount_label ?? ""),
              description: String(draft.description ?? ""),
              valid_from: String(draft.valid_from ?? ""),
              valid_until: String(draft.valid_until ?? ""),
              status: String(draft.status ?? "active") as "scheduled" | "active" | "expired",
            },
          });
          savedId = saved.id;
          break;
        }
        case "Pricing Packages": {
          const saved = await upsertAdminPricingPackage({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              name: String(draft.name ?? ""),
              price: Number(draft.price ?? 0),
              popular: Boolean(draft.popular),
              features_text: String(draft.features_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Ads": {
          const assetUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "advertisement"),
            draft.asset_url,
          );
          const saved = await upsertAdminAdvertisement({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              asset_url: assetUrl,
              asset_type: String(draft.asset_type ?? "poster") as "poster" | "banner",
              start_date: String(draft.start_date ?? ""),
              end_date: String(draft.end_date ?? ""),
              status: String(draft.status ?? "active") as "active" | "paused" | "archived",
            },
          });
          savedId = saved.id;
          break;
        }
        case "Hero": {
          const heroImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.heading ?? "hero"),
            draft.hero_image_url,
          );
          const saved = await upsertAdminHeroContent({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              heading: String(draft.heading ?? ""),
              subtitle: String(draft.subtitle ?? ""),
              primary_cta_label: String(draft.primary_cta_label ?? ""),
              primary_cta_url: String(draft.primary_cta_url ?? ""),
              secondary_cta_label: String(draft.secondary_cta_label ?? ""),
              secondary_cta_url: String(draft.secondary_cta_url ?? ""),
              hero_image_url: heroImageUrl,
              hero_image_alt: String(draft.hero_image_alt ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "About": {
          const founderImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.founder_name ?? "founder"),
            draft.founder_image_url,
          );
          const galleryImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.headline ?? "about-gallery"),
            draft.gallery_image_url,
          );
          const saved = await upsertAdminAboutContent({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              headline: String(draft.headline ?? ""),
              body: String(draft.body ?? ""),
              bullet_points: String(draft.bullet_points ?? ""),
              founder_name: String(draft.founder_name ?? ""),
              founder_title: String(draft.founder_title ?? ""),
              founder_image_url: founderImageUrl,
              gallery_image_url: galleryImageUrl,
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Contact": {
          const saved = await upsertAdminContactSettings({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              phone: String(draft.phone ?? ""),
              whatsapp: String(draft.whatsapp ?? ""),
              email: String(draft.email ?? ""),
              address: String(draft.address ?? ""),
              map_url: String(draft.map_url ?? ""),
              working_hours: String(draft.working_hours ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Social": {
          const saved = await upsertAdminSocialLinks({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              instagram: String(draft.instagram ?? ""),
              facebook: String(draft.facebook ?? ""),
              youtube: String(draft.youtube ?? ""),
              whatsapp: String(draft.whatsapp ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "FAQ": {
          const saved = await upsertAdminFaqSection({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              slug: String(draft.slug ?? ""),
              description: String(draft.description ?? ""),
              items_text: String(draft.items_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Service Areas": {
          const saved = await upsertAdminServiceArea({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              name: String(draft.name ?? ""),
              summary: String(draft.summary ?? ""),
              search_intent: String(draft.search_intent ?? ""),
              highlights_text: String(draft.highlights_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "SEO": {
          const ogImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.meta_title ?? "seo"),
            draft.og_image_url,
          );
          const saved = await upsertAdminSeoSettings({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              meta_title: String(draft.meta_title ?? ""),
              meta_description: String(draft.meta_description ?? ""),
              keywords: String(draft.keywords ?? ""),
              canonical_url: String(draft.canonical_url ?? ""),
              og_image_url: ogImageUrl,
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
      }

      await refreshData();
      setSelectedId(savedId);
      if (savedId !== null) {
        setEditorMode("edit");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown save failure.";

      if (errorMessage.includes("Bucket not found")) {
        setActionError(
          "Upload failed because the configured Supabase storage bucket does not exist. Set SUPABASE_MEDIA_BUCKET in .env and create that public bucket in Supabase.",
        );
        return;
      }

      setActionError("Save failed. Please check the Supabase connection and try again.");
    }
  }

  const config = sectionConfigs[activeSection];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <section className="relative overflow-hidden gradient-luxe text-marble">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,var(--gold)_0,transparent_35%),radial-gradient(circle_at_80%_80%,var(--purple-deep)_0,transparent_40%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-24 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
            <Shield className="h-3.5 w-3.5" />
            Secure Admin Console
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl leading-tight md:text-6xl">
                Manage the salon with <span className="gradient-gold-text italic">control</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-marble/80 md:text-base">
                Edit every major content collection, approve bookings, and delete anything that does
                not belong. Everything is stored in Supabase.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                to="/booking"
                className="btn-luxe inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-5 py-3 font-semibold text-[var(--royal-deep)] shadow-gold"
              >
                Open Booking <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteTel}
                className="btn-luxe inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-5 py-3 font-semibold text-marble hover:bg-[var(--gold)] hover:text-[var(--royal-deep)]"
              >
                <Phone className="h-4 w-4" />
                Call Owner
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {!isAuthenticated ? (
            <div className="mx-auto max-w-2xl rounded-[2rem] glass-light p-6 shadow-luxury md:p-10">
              <div className="flex items-center gap-3 text-[var(--purple-deep)]">
                <Shield className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.3em]">Admin Login</span>
              </div>
              <h2 className="mt-4 font-display text-3xl text-[var(--royal)]">
                Unlock the dashboard
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in with the email and password from your `.env` file.
              </p>

              <form onSubmit={handleUnlock} className="mt-8 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="username"
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--gold)]"
                    placeholder="Enter admin email"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--gold)]"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-luxe inline-flex w-full items-center justify-center gap-2 rounded-full gradient-gold px-6 py-3.5 font-semibold text-[var(--royal-deep)] shadow-gold"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {loading ? "Signing in..." : "Enter Dashboard"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-dashed border-[var(--gold)]/50 bg-[var(--gold)]/10 p-4 text-sm text-foreground/80">
                Sign in with your admin email and password only. If access is blocked, make sure
                `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly in `.env`.
              </div>
              {authError ? (
                <p className="mt-3 text-sm font-medium text-rose-700">{authError}</p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {liveStats.map((item) => (
                  <StatCard key={item.label} label={item.label} value={item.value} />
                ))}
              </div>

              {loading ? (
                <div className="rounded-[2rem] bg-card border border-border p-6 text-sm text-muted-foreground shadow-soft">
                  Loading Supabase data...
                </div>
              ) : null}

              <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
                <aside className="space-y-6 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)] xl:w-[320px] xl:self-start xl:overflow-y-auto xl:pr-2">
                  <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,12,28,0.96),rgba(30,20,47,0.92))] p-6 text-marble shadow-soft">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                          Control Center
                        </div>
                        <h2 className="mt-2 font-display text-3xl text-marble">Dashboard</h2>
                      </div>
                      <CalendarClock className="h-6 w-6 text-[var(--gold)]" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-marble/75">
                      Switch between collections, review records, and jump into the editor on the
                      right.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {liveStats.slice(0, 4).map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                            {item.label}
                          </div>
                          <div className="mt-2 font-display text-2xl text-marble">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                      {(Object.keys(sectionConfigs) as AdminSection[]).map((section) => {
                        const sectionCount = dashboardData[sectionDataKeys[section]].length;
                        const isActive = activeSection === section;
                        const sectionConfig = sectionConfigs[section];

                        return (
                          <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`group flex w-full flex-col gap-3 rounded-2xl border p-4 text-left transition-all ${
                              isActive
                                ? "border-[var(--gold)]/60 bg-[var(--gold)]/12 text-[var(--royal)] shadow-[0_14px_30px_rgba(180,140,60,0.12)]"
                                : "border-border bg-background/60 text-foreground/80 hover:-translate-y-0.5 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-sm font-semibold">{sectionConfig.title}</div>
                                <div className="mt-1 text-xs leading-relaxed text-foreground/60">
                                  {sectionConfig.summary}
                                </div>
                              </div>
                              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-[var(--royal)] shadow-sm">
                                {sectionCount}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--purple-deep)]/80">
                              <span>{sectionConfig.canCreate ? "Editable" : "Review only"}</span>
                              <span className="text-foreground/30">•</span>
                              <span>{isActive ? "Currently open" : "Tap to switch"}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-card border border-border p-6 shadow-soft">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">
                          {config.title}
                        </div>
                        <h3 className="mt-2 font-display text-2xl text-[var(--royal)]">
                          Record Queue
                        </h3>
                      </div>
                      <div className="rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--royal)]">
                        {activeItems.length}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{config.summary}</p>

                    {config.canCreate ? (
                      <button
                        type="button"
                        onClick={startCreate}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-gold px-5 py-3 text-sm font-semibold text-[var(--royal-deep)] shadow-gold"
                      >
                        <Plus className="h-4 w-4" />
                        New {config.title.slice(0, -1)}
                      </button>
                    ) : null}

                    <div className="mt-5 max-h-[26rem] space-y-3 overflow-y-auto pr-1 sm:max-h-[34rem]">
                      {activeItems.length ? (
                        activeItems.map((item) => {
                          const itemStatus = renderItemStatus(activeSection, item);
                          const isSelected = String(item.id) === String(selectedId);

                          if (activeSection === "Bookings") {
                            return (
                              <button
                                key={String(item.id)}
                                onClick={() => selectRecord(item.id)}
                                className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                                  isSelected
                                    ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 shadow-[0_8px_24px_rgba(180,140,60,0.12)]"
                                    : "border-border bg-background/60 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5"
                                }`}
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-foreground">
                                      {renderItemTitle(activeSection, item)}
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                                      <span>{String(item.service ?? "")}</span>
                                      <span>{String(item.date ?? "")}</span>
                                      <span>{String(item.time ?? "")}</span>
                                    </div>
                                  </div>
                                  {itemStatus ? <StatusBadge status={itemStatus} /> : null}
                                </div>
                                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <span className="truncate text-[11px] text-muted-foreground">
                                    {String(item.phone ?? "")}
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--royal)]">
                                      <Pencil className="h-3.5 w-3.5" />
                                      Edit
                                    </span>
                                    <span
                                      role="button"
                                      tabIndex={0}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        void handleDelete(item.id);
                                      }}
                                      onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                          event.preventDefault();
                                          event.stopPropagation();
                                          void handleDelete(item.id);
                                        }
                                      }}
                                      className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-700"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          }

                          return (
                            <button
                              key={String(item.id)}
                              onClick={() => selectRecord(item.id)}
                              className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                                isSelected
                                  ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 shadow-[0_8px_24px_rgba(180,140,60,0.12)]"
                                  : "border-border bg-background/60 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <div className="truncate font-medium text-foreground">
                                    {renderItemTitle(activeSection, item)}
                                  </div>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    {renderItemMeta(activeSection, item)}
                                  </div>
                                </div>
                                {itemStatus ? <StatusBadge status={itemStatus} /> : null}
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--royal)]">
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </span>
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    void handleDelete(item.id);
                                  }}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      void handleDelete(item.id);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-700"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </span>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <div className="rounded-2xl border border-dashed border-border bg-background/50 p-5 text-sm text-muted-foreground">
                          No records in this section yet.
                        </div>
                      )}
                    </div>
                  </div>
                </aside>

                <div className="space-y-6 xl:ml-2">
                  {loading ? (
                    <div className="rounded-[2rem] border border-border bg-card/90 p-6 text-sm text-muted-foreground shadow-soft">
                      Loading Supabase data...
                    </div>
                  ) : null}

                  <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <div className="max-w-2xl">
                        <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">
                          Editor
                        </div>
                        <h3 className="mt-2 font-display text-3xl text-[var(--royal)]">
                          {selectedRecord
                            ? `Ready to edit ${renderItemTitle(activeSection, selectedRecord)}`
                            : config.canCreate
                              ? `Create a new ${config.title.slice(0, -1).toLowerCase()}`
                              : "Select a record to review"}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          The actual form now opens as a modal drawer, which keeps the dashboard
                          clean and prevents the editor from overlapping the cards behind it.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <Sparkles className="h-5 w-5 text-[var(--gold)]" />
                        <div>
                          <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">
                            Current section
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {config.title}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await logoutAdmin();
                          } finally {
                            setIsAuthenticated(false);
                          }
                        }}
                        className="rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-[var(--royal)] transition hover:border-[var(--gold)] hover:text-[var(--purple-deep)]"
                      >
                        Sign out
                      </button>
                    </div>

                    {selectedRecord ? (
                      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/10 px-4 py-3">
                        <div className="text-sm text-foreground">
                          Editing:{" "}
                          <span className="font-semibold">
                            {renderItemTitle(activeSection, selectedRecord)}
                          </span>
                        </div>
                        <StatusBadge
                          status={renderItemStatus(activeSection, selectedRecord) ?? "Draft"}
                        />
                        <button
                          type="button"
                          onClick={() => setEditorMode("edit")}
                          className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--royal)] shadow-sm"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Open editor
                        </button>
                      </div>
                    ) : null}

                    {config.canCreate ? (
                      <button
                        type="button"
                        onClick={startCreate}
                        className="mt-5 inline-flex items-center gap-2 rounded-full gradient-gold px-5 py-3 text-sm font-semibold text-[var(--royal-deep)] shadow-gold"
                      >
                        <Plus className="h-4 w-4" />
                        New {config.title.slice(0, -1)}
                      </button>
                    ) : null}

                    {actionError ? (
                      <p className="mt-4 rounded-2xl bg-rose-500/10 p-3 text-sm text-rose-700">
                        {actionError}
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <DashboardPanel
                        icon={Users}
                        title="Collections"
                        description="Manage bookings, services, gallery, testimonials, offers, and ads from one place."
                        badge="Live data"
                      />
                      <DashboardPanel
                        icon={Sparkles}
                        title="CMS content"
                        description="Edit hero, about, contact, social links, and SEO settings that power the public site."
                        badge="Site config"
                      />
                      <DashboardPanel
                        icon={GalleryHorizontalEnd}
                        title="Media workflow"
                        description="Upload posters and images directly into Supabase Storage with previews and replacement."
                        badge="Storage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {editorMode !== "view" ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-md sm:p-4 lg:p-6">
          <button
            type="button"
            aria-label="Close editor backdrop"
            onClick={() => closeEditor()}
            className="absolute inset-0 cursor-default"
          />
          <div className="relative z-[101] mt-4 flex w-full max-w-[min(96vw,1180px)] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:mt-8 sm:rounded-[2rem]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">
                  Modal editor
                </div>
                <h3 className="mt-2 font-display text-xl text-[var(--royal)] sm:text-2xl">
                  {selectedRecord
                    ? `Edit ${renderItemTitle(activeSection, selectedRecord)}`
                    : `Create a new ${config.title.slice(0, -1).toLowerCase()}`}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  The editor is now isolated in a fixed modal with its own scroll, so it will not
                  overlap the dashboard cards.
                </p>
                {hasUnsavedChanges ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                    Unsaved changes
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => closeEditor()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-7rem)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
              {actionError ? (
                <p className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {actionError}
                </p>
              ) : null}

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={startCreate}
                  className="inline-flex items-center gap-2 rounded-full gradient-gold px-5 py-3 text-sm font-semibold text-[var(--royal-deep)] shadow-gold"
                >
                  <Plus className="h-4 w-4" />
                  New {config.title.slice(0, -1)}
                </button>
                {selectedRecord ? (
                  <button
                    type="button"
                    onClick={() => setDraft(initialDraft)}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                  >
                    Revert changes
                  </button>
                ) : null}
                <div className="ml-auto rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--royal)]">
                  {config.title}
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {config.fields.map((field) => (
                    <FieldControl
                      key={field.key}
                      field={field}
                      value={draft[field.key]}
                      onChange={(value) =>
                        setDraft((current) => ({ ...current, [field.key]: value }))
                      }
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-gold px-6 py-3 font-semibold text-[var(--royal-deep)] shadow-gold sm:w-auto"
                  >
                    <CircleCheckBig className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft(initialDraft)}
                    className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 sm:w-auto"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => closeEditor()}
                    className="rounded-full border border-transparent px-6 py-3 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function renderItemTitle(section: AdminSection, item: Record<string, unknown>) {
  switch (section) {
    case "Bookings":
      return String(item.name ?? "");
    case "Services":
      return String(item.title ?? "");
    case "Gallery":
      return String(item.title ?? "");
    case "Testimonials":
      return String(item.customer_name ?? "");
    case "Offers":
      return String(item.title ?? "");
    case "Pricing Packages":
      return String(item.name ?? "");
    case "Ads":
      return String(item.title ?? "");
    case "Hero":
      return String(item.heading ?? "");
    case "About":
      return String(item.headline ?? "");
    case "Contact":
      return String(item.phone ?? "");
    case "Social":
      return String(item.instagram ?? item.facebook ?? item.whatsapp ?? "Social links");
    case "FAQ":
      return String(item.title ?? "");
    case "Service Areas":
      return String(item.name ?? "");
    case "SEO":
      return String(item.meta_title ?? "");
  }
}

function renderItemMeta(section: AdminSection, item: Record<string, unknown>) {
  switch (section) {
    case "Bookings":
      return `${item.service ?? ""} / ${item.date ?? ""} / ${item.status ?? ""}`;
    case "Services":
      return `${item.category ?? ""} / ${item.duration_label ?? ""}`;
    case "Gallery":
      return `${item.category ?? ""} / sort ${item.sort_order ?? 0}`;
    case "Testimonials":
      return `${item.service_name ?? ""} / ${item.rating ?? ""} stars / ${item.status ?? ""}`;
    case "Offers":
      return `${item.status ?? ""} / ${item.valid_until ?? ""}`;
    case "Pricing Packages":
      return `Rs ${Number(item.price ?? 0).toLocaleString("en-IN")} / ${
        item.popular ? "popular" : "standard"
      }`;
    case "Ads":
      return `${item.asset_type ?? ""} / ${item.status ?? ""}`;
    case "Hero":
      return `${item.primary_cta_label ?? ""} / ${item.is_active ? "active" : "paused"}`;
    case "About":
      return `${item.founder_name ?? ""} / ${item.is_active ? "active" : "paused"}`;
    case "Contact":
      return `${item.email ?? ""} / ${item.is_active ? "active" : "paused"}`;
    case "Social":
      return `${item.instagram ?? item.facebook ?? item.whatsapp ?? ""} / ${
        item.is_active ? "active" : "paused"
      }`;
    case "FAQ":
      return `${item.slug ?? ""} / ${item.is_active ? "active" : "paused"}`;
    case "Service Areas":
      return `${item.search_intent ?? ""} / ${item.is_active ? "active" : "paused"}`;
    case "SEO":
      return `${item.canonical_url ?? ""} / ${item.is_active ? "active" : "paused"}`;
  }
}

function renderItemStatus(section: AdminSection, item: Record<string, unknown>) {
  switch (section) {
    case "Bookings":
      return String(item.status ?? "");
    case "Services":
      return item.is_active ? "active" : "paused";
    case "Gallery":
      return item.is_active ? "active" : "paused";
    case "Testimonials":
      return String(item.status ?? "");
    case "Offers":
      return String(item.status ?? "");
    case "Pricing Packages":
      return item.is_active ? "active" : "paused";
    case "Ads":
      return String(item.status ?? "");
    case "Hero":
    case "About":
    case "Contact":
    case "Social":
    case "FAQ":
    case "Service Areas":
    case "SEO":
      return item.is_active ? "active" : "paused";
  }
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] glass-light p-5 shadow-soft">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--purple-deep)]">{label}</div>
      <div className="mt-3 font-display text-3xl text-[var(--royal)]">{value}</div>
    </div>
  );
}

function DashboardPanel({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,246,242,0.95))] p-6 shadow-soft transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-royal shadow-sm">
          <Icon className="h-5 w-5 text-[var(--gold)]" />
        </div>
        {badge ? (
          <span className="rounded-full bg-[var(--gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--royal)]">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-2xl text-[var(--royal)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: DraftValue | undefined;
  onChange: (value: DraftValue) => void;
}) {
  const baseInputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/25";

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  }

  const showPreview = typeof value === "string" && value.length > 0;

  if (field.kind === "textarea") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-slate-600">{field.label}</label>
        <textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className={baseInputClass}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.kind === "file") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-slate-600">{field.label}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={`${baseInputClass} cursor-pointer px-3 py-2`}
        />
        {showPreview ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={String(value)} alt={field.label} className="h-40 w-full object-cover" />
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            Upload an image to replace the current asset.
          </p>
        )}
      </div>
    );
  }

  if (field.kind === "select") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-slate-600">{field.label}</label>
        <select
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseInputClass} appearance-none`}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.kind === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        <span className="text-sm font-medium text-slate-900">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-slate-600">{field.label}</label>
      <input
        type={field.kind === "number" ? "number" : field.kind}
        value={value === undefined ? "" : String(value)}
        onChange={(event) =>
          onChange(field.kind === "number" ? Number(event.target.value) : event.target.value)
        }
        className={baseInputClass}
        placeholder={field.placeholder}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Approved" || status === "active" || status === "visible"
      ? "bg-emerald-500/15 text-emerald-700"
      : status === "Rejected" || status === "paused" || status === "draft"
        ? "bg-rose-500/15 text-rose-700"
        : status === "Rescheduled" || status === "scheduled"
          ? "bg-[var(--gold)]/20 text-[var(--royal)]"
          : "bg-sky-500/15 text-sky-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}
