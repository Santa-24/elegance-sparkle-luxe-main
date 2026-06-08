import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  adSchema,
  aboutContentSchema,
  bookingStatusSchema,
  faqSectionSchema,
  contactSettingsSchema,
  gallerySchema,
  heroContentSchema,
  offerSchema,
  pricingPackageSchema,
  seoSettingsSchema,
  socialLinksSchema,
  serviceAreaSchema,
  serviceSchema,
  testimonialSchema,
} from "@/admin/validators";
import {
  supabaseDelete,
  supabaseInsert,
  supabaseSelect,
  supabaseUpdate,
} from "@/lib/supabase.server";
import { recordAdminAuditLog } from "@/lib/security/audit.server";
import { galleryImages as staticGalleryImages, resolveGalleryImageSrc } from "@/lib/data/gallery";
import {
  bridalPackages as staticBridalPackages,
  services as staticServices,
} from "@/lib/data/services";

import { requireAdminSession } from "./admin-session";

async function logAdminMutation(
  action: "create" | "update" | "delete" | "publish" | "archive" | "status_change",
  resourceType: string,
  resourceId: string | number,
  metadata?: Record<string, unknown>,
) {
  try {
    await recordAdminAuditLog({
      action,
      resourceType,
      resourceId: String(resourceId),
      metadata,
    });
  } catch (error) {
    console.error("Failed to record admin audit log:", error);
  }
}

export type AdminBookingRecord = {
  id: number;
  booking_code: string;
  customer_name: string;
  phone: string;
  email: string | null;
  service_name: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: string;
  source: string;
};

export type AdminServiceRecord = {
  id: number;
  title: string;
  category: "bridal" | "parlour" | "academy";
  description: string;
  price_label: string;
  duration_label: string;
  featured: boolean;
  image_url: string | null;
  is_active: boolean;
};

export type AdminGalleryRecord = {
  id: number;
  title: string;
  category: "bridal" | "parlour" | "before_after" | "academy";
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminTestimonialRecord = {
  id: number;
  customer_name: string;
  service_name: string;
  rating: number;
  review_text: string;
  status: "visible" | "draft";
};

export type AdminOfferRecord = {
  id: number;
  title: string;
  discount_label: string;
  description: string;
  valid_from: string;
  valid_until: string;
  status: "scheduled" | "active" | "expired";
};

export type AdminPricingPackageRecord = {
  id: number;
  name: string;
  price: number;
  popular: boolean;
  features_text: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminAdvertisementRecord = {
  id: number;
  title: string;
  asset_url: string;
  asset_type: "poster" | "banner";
  start_date: string;
  end_date: string;
  status: "active" | "paused" | "archived";
};

export type AdminHeroContentRecord = {
  id: number;
  heading: string;
  subtitle: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  is_active: boolean;
};

export type AdminAboutContentRecord = {
  id: number;
  headline: string;
  body: string;
  bullet_points: string[] | null;
  founder_name: string;
  founder_title: string;
  founder_image_url: string | null;
  gallery_image_url: string | null;
  is_active: boolean;
};

export type AdminContactSettingsRecord = {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_url: string;
  working_hours: string;
  is_active: boolean;
};

export type AdminSocialLinksRecord = {
  id: number;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  whatsapp: string | null;
  is_active: boolean;
};

export type AdminSeoSettingsRecord = {
  id: number;
  meta_title: string;
  meta_description: string;
  keywords: string;
  canonical_url: string;
  og_image_url: string | null;
  is_active: boolean;
};

export type AdminFaqSectionRecord = {
  id: number;
  title: string;
  slug: string;
  description: string;
  items_text: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminServiceAreaRecord = {
  id: number;
  name: string;
  summary: string;
  search_intent: string;
  highlights_text: string;
  sort_order: number;
  is_active: boolean;
};

function normalizeBooking(row: AdminBookingRecord) {
  return {
    id: row.booking_code,
    name: row.customer_name,
    service: row.service_name,
    date: row.booking_date,
    time: row.booking_time,
    status: (row.status.charAt(0).toUpperCase() + row.status.slice(1)) as
      | "Pending"
      | "Approved"
      | "Rejected"
      | "Rescheduled"
      | "Completed"
      | "Cancelled",
    phone: row.phone,
    email: row.email,
    notes: row.notes,
  };
}

export const listAdminBookings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  const rows = await supabaseSelect<AdminBookingRecord>(
    "bookings?select=id,booking_code,customer_name,phone,email,service_name,booking_date,booking_time,notes,status,source&order=created_at.desc",
  );
  return rows.map(normalizeBooking);
});

export const updateAdminBooking = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      bookingCode: z.string().min(1),
      customer_name: z.string().min(1).optional(),
      phone: z.string().min(1).optional(),
      email: z.string().optional().or(z.literal("")),
      service_name: z.string().min(1).optional(),
      status: bookingStatusSchema.optional(),
      booking_date: z.string().optional(),
      booking_time: z.string().optional(),
      notes: z.string().optional().or(z.literal("")),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    const [row] = await supabaseUpdate<AdminBookingRecord>(
      "bookings",
      `booking_code=eq.${encodeURIComponent(data.bookingCode)}`,
      {
        ...(data.customer_name ? { customer_name: data.customer_name } : {}),
        ...(data.phone ? { phone: data.phone } : {}),
        ...(data.email !== undefined ? { email: data.email || null } : {}),
        ...(data.service_name ? { service_name: data.service_name } : {}),
        ...(data.status ? { status: data.status } : {}),
        ...(data.booking_date ? { booking_date: data.booking_date } : {}),
        ...(data.booking_time ? { booking_time: data.booking_time } : {}),
        ...(data.notes !== undefined ? { notes: data.notes || null } : {}),
      },
    );

    return normalizeBooking(row);
  });

export const deleteAdminBooking = createServerFn({ method: "POST" })
  .inputValidator(z.object({ bookingCode: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    const [booking] = await supabaseSelect<Pick<AdminBookingRecord, "id">>(
      `bookings?select=id&booking_code=eq.${encodeURIComponent(data.bookingCode)}&limit=1`,
    );

    if (booking?.id) {
      await supabaseDelete<Record<string, unknown>>("notifications", `booking_id=eq.${booking.id}`);
    }

    await supabaseDelete<AdminBookingRecord>(
      "bookings",
      `booking_code=eq.${encodeURIComponent(data.bookingCode)}`,
    );
    return { success: true };
  });

export const listAdminServices = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const rows = await supabaseSelect<AdminServiceRecord>(
    "services?select=id,title,category,description,price_label,duration_label,featured,image_url,is_active,sort_order&order=sort_order.asc,created_at.desc",
  );

  if (rows.length > 0) {
    return rows;
  }

  const seeded = await Promise.all(
    staticServices.map((service, index) =>
      supabaseInsert<AdminServiceRecord>("services", {
        title: service.title,
        category:
          service.category === "Bridal"
            ? "bridal"
            : service.category === "Academy"
              ? "academy"
              : "parlour",
        description: service.desc,
        price_label: service.price,
        duration_label: service.duration,
        featured: Boolean(service.featured),
        image_url: null,
        is_active: true,
        sort_order: index,
      }),
    ),
  );

  return seeded.flat();
});

export const upsertAdminService = createServerFn({ method: "POST" })
  .inputValidator(
    serviceSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminServiceRecord>(
        "services",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "services", row.id, { title: row.title });
      return row;
    }

    const [row] = await supabaseInsert<AdminServiceRecord>("services", payload);
    void logAdminMutation("create", "services", row.id, { title: row.title });
    return row;
  });

export const deleteAdminService = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminServiceRecord>("services", `id=eq.${data.id}`);
    void logAdminMutation("delete", "services", data.id);
    return { success: true };
  });

export const listAdminGalleryItems = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  const rows = await supabaseSelect<AdminGalleryRecord>(
    "gallery?select=id,title,category,image_url,alt_text,sort_order,is_active&order=sort_order.asc,id.desc",
  );

  if (rows.length > 0) {
    return rows.map((row) => ({
      ...row,
      image_url: resolveGalleryImageSrc(row.image_url),
    }));
  }

  const seeded = await Promise.all(
    staticGalleryImages.map((image, index) =>
      supabaseInsert<AdminGalleryRecord>("gallery", {
        title: `${image.cat} ${index + 1}`,
        category:
          image.cat === "Before & After"
            ? "before_after"
            : image.cat === "Academy"
              ? "academy"
              : image.cat === "Parlour"
                ? "parlour"
                : "bridal",
        image_url: image.src,
        alt_text: image.alt,
        sort_order: index,
        is_active: true,
      }),
    ),
  );

  return seeded.flat();
});

export const upsertAdminGalleryItem = createServerFn({ method: "POST" })
  .inputValidator(
    gallerySchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminGalleryRecord>(
        "gallery",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "gallery", row.id, { title: row.title });
      return row;
    }

    const [row] = await supabaseInsert<AdminGalleryRecord>("gallery", payload);
    void logAdminMutation("create", "gallery", row.id, { title: row.title });
    return row;
  });

export const deleteAdminGalleryItem = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    await supabaseDelete<AdminGalleryRecord>("gallery", `id=eq.${data.id}`);
    void logAdminMutation("delete", "gallery", data.id);
    return { success: true };
  });

export const listAdminTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminTestimonialRecord>(
    "testimonials?select=id,customer_name,service_name,rating,review_text,status&order=created_at.desc",
  );
});

export const upsertAdminTestimonial = createServerFn({ method: "POST" })
  .inputValidator(
    testimonialSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminTestimonialRecord>(
        "testimonials",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "testimonials", row.id, { customer_name: row.customer_name });
      return row;
    }

    const [row] = await supabaseInsert<AdminTestimonialRecord>("testimonials", payload);
    void logAdminMutation("create", "testimonials", row.id, { customer_name: row.customer_name });
    return row;
  });

export const deleteAdminTestimonial = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminTestimonialRecord>("testimonials", `id=eq.${data.id}`);
    void logAdminMutation("delete", "testimonials", data.id);
    return { success: true };
  });

export const listAdminOffers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  return supabaseSelect<AdminOfferRecord>(
    "offers?select=id,title,discount_label,description,valid_from,valid_until,status&order=created_at.desc",
  );
});

export const upsertAdminOffer = createServerFn({ method: "POST" })
  .inputValidator(
    offerSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminOfferRecord>("offers", `id=eq.${data.id}`, payload);
      void logAdminMutation("update", "offers", row.id, { title: row.title, status: row.status });
      return row;
    }

    const [row] = await supabaseInsert<AdminOfferRecord>("offers", payload);
    void logAdminMutation("create", "offers", row.id, { title: row.title, status: row.status });
    return row;
  });

export const deleteAdminOffer = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    await supabaseDelete<AdminOfferRecord>("offers", `id=eq.${data.id}`);
    void logAdminMutation("delete", "offers", data.id);
    return { success: true };
  });

function normalizePricingFeaturesText(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join("\n");
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

export const listAdminPricingPackages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  try {
    const rows = await supabaseSelect<AdminPricingPackageRecord>(
      "pricing_packages?select=id,name,price,popular,features_text,sort_order,is_active&order=sort_order.asc,id.asc",
    );

    if (rows.length > 0) {
      return rows;
    }

    return staticBridalPackages.map((pkg, index) => ({
      id: index + 1,
      name: pkg.name,
      price: pkg.price,
      popular: pkg.popular,
      features_text: pkg.features.join("\n"),
      sort_order: index,
      is_active: true,
    }));
  } catch {
    return staticBridalPackages.map((pkg, index) => ({
      id: index + 1,
      name: pkg.name,
      price: pkg.price,
      popular: pkg.popular,
      features_text: pkg.features.join("\n"),
      sort_order: index,
      is_active: true,
    }));
  }
});

export const upsertAdminPricingPackage = createServerFn({ method: "POST" })
  .inputValidator(
    pricingPackageSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    const record = {
      ...payload,
      features_text: normalizePricingFeaturesText(payload.features_text),
    };

    if (data.id) {
      const [row] = await supabaseUpdate<AdminPricingPackageRecord>(
        "pricing_packages",
        `id=eq.${data.id}`,
        record,
      );
      void logAdminMutation("update", "pricing_packages", row.id, { name: row.name });
      return row;
    }

    const [row] = await supabaseInsert<AdminPricingPackageRecord>("pricing_packages", record);
    void logAdminMutation("create", "pricing_packages", row.id, { name: row.name });
    return row;
  });

export const deleteAdminPricingPackage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminPricingPackageRecord>("pricing_packages", `id=eq.${data.id}`);
    void logAdminMutation("delete", "pricing_packages", data.id);
    return { success: true };
  });

export const listAdminAdvertisements = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  return supabaseSelect<AdminAdvertisementRecord>(
    "advertisements?select=id,title,asset_url,asset_type,start_date,end_date,status&order=created_at.desc",
  );
});

export const upsertAdminAdvertisement = createServerFn({ method: "POST" })
  .inputValidator(
    adSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminAdvertisementRecord>(
        "advertisements",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "advertisements", row.id, {
        title: row.title,
        status: row.status,
      });
      return row;
    }

    const [row] = await supabaseInsert<AdminAdvertisementRecord>("advertisements", payload);
    void logAdminMutation("create", "advertisements", row.id, {
      title: row.title,
      status: row.status,
    });
    return row;
  });

export const deleteAdminAdvertisement = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    await supabaseDelete<AdminAdvertisementRecord>("advertisements", `id=eq.${data.id}`);
    void logAdminMutation("delete", "advertisements", data.id);
    return { success: true };
  });

function normalizeBulletPoints(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export const listAdminHeroContent = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminHeroContentRecord>(
    "hero_content?select=id,heading,subtitle,primary_cta_label,primary_cta_url,secondary_cta_label,secondary_cta_url,hero_image_url,hero_image_alt,is_active&order=created_at.desc",
  );
});

export const upsertAdminHeroContent = createServerFn({ method: "POST" })
  .inputValidator(
    heroContentSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    const record = payload;

    if (data.id) {
      const [row] = await supabaseUpdate<AdminHeroContentRecord>(
        "hero_content",
        `id=eq.${data.id}`,
        record,
      );
      void logAdminMutation("update", "hero_content", row.id, { heading: row.heading });
      return row;
    }

    const [row] = await supabaseInsert<AdminHeroContentRecord>("hero_content", record);
    void logAdminMutation("create", "hero_content", row.id, { heading: row.heading });
    return row;
  });

export const deleteAdminHeroContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminHeroContentRecord>("hero_content", `id=eq.${data.id}`);
    void logAdminMutation("delete", "hero_content", data.id);
    return { success: true };
  });

export const listAdminAboutContent = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminAboutContentRecord>(
    "about_content?select=id,headline,body,bullet_points,founder_name,founder_title,founder_image_url,gallery_image_url,is_active&order=created_at.desc",
  );
});

export const upsertAdminAboutContent = createServerFn({ method: "POST" })
  .inputValidator(
    aboutContentSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, bullet_points, ...payload } = data;
    const record = {
      ...payload,
      bullet_points: normalizeBulletPoints(bullet_points),
    };

    if (data.id) {
      const [row] = await supabaseUpdate<AdminAboutContentRecord>(
        "about_content",
        `id=eq.${data.id}`,
        record,
      );
      void logAdminMutation("update", "about_content", row.id, { headline: row.headline });
      return row;
    }

    const [row] = await supabaseInsert<AdminAboutContentRecord>("about_content", record);
    void logAdminMutation("create", "about_content", row.id, { headline: row.headline });
    return row;
  });

export const deleteAdminAboutContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminAboutContentRecord>("about_content", `id=eq.${data.id}`);
    void logAdminMutation("delete", "about_content", data.id);
    return { success: true };
  });

export const listAdminContactSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminContactSettingsRecord>(
    "contact_settings?select=id,phone,whatsapp,email,address,map_url,working_hours,is_active&order=created_at.desc",
  );
});

export const upsertAdminContactSettings = createServerFn({ method: "POST" })
  .inputValidator(
    contactSettingsSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;

    if (data.id) {
      const [row] = await supabaseUpdate<AdminContactSettingsRecord>(
        "contact_settings",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "contact_settings", row.id, { phone: row.phone });
      return row;
    }

    const [row] = await supabaseInsert<AdminContactSettingsRecord>("contact_settings", payload);
    void logAdminMutation("create", "contact_settings", row.id, { phone: row.phone });
    return row;
  });

export const deleteAdminContactSettings = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminContactSettingsRecord>("contact_settings", `id=eq.${data.id}`);
    void logAdminMutation("delete", "contact_settings", data.id);
    return { success: true };
  });

export const listAdminSocialLinks = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminSocialLinksRecord>(
    "social_links?select=id,instagram,facebook,youtube,whatsapp,is_active&order=created_at.desc",
  );
});

export const upsertAdminSocialLinks = createServerFn({ method: "POST" })
  .inputValidator(
    socialLinksSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;

    if (data.id) {
      const [row] = await supabaseUpdate<AdminSocialLinksRecord>(
        "social_links",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "social_links", row.id, {});
      return row;
    }

    const [row] = await supabaseInsert<AdminSocialLinksRecord>("social_links", payload);
    void logAdminMutation("create", "social_links", row.id, {});
    return row;
  });

export const deleteAdminSocialLinks = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminSocialLinksRecord>("social_links", `id=eq.${data.id}`);
    void logAdminMutation("delete", "social_links", data.id);
    return { success: true };
  });

export const listAdminSeoSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return supabaseSelect<AdminSeoSettingsRecord>(
    "seo_settings?select=id,meta_title,meta_description,keywords,canonical_url,og_image_url,is_active&order=created_at.desc",
  );
});

export const upsertAdminSeoSettings = createServerFn({ method: "POST" })
  .inputValidator(
    seoSettingsSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;

    if (data.id) {
      const [row] = await supabaseUpdate<AdminSeoSettingsRecord>(
        "seo_settings",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "seo_settings", row.id, { meta_title: row.meta_title });
      return row;
    }

    const [row] = await supabaseInsert<AdminSeoSettingsRecord>("seo_settings", payload);
    void logAdminMutation("create", "seo_settings", row.id, { meta_title: row.meta_title });
    return row;
  });

export const deleteAdminSeoSettings = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminSeoSettingsRecord>("seo_settings", `id=eq.${data.id}`);
    void logAdminMutation("delete", "seo_settings", data.id);
    return { success: true };
  });

export const listAdminFaqSections = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  try {
    return await supabaseSelect<AdminFaqSectionRecord>(
      "faq_sections?select=id,title,slug,description,items_text,sort_order,is_active&order=sort_order.asc,id.asc",
    );
  } catch {
    return [];
  }
});

export const upsertAdminFaqSection = createServerFn({ method: "POST" })
  .inputValidator(
    faqSectionSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminFaqSectionRecord>(
        "faq_sections",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "faq_sections", row.id, { title: row.title });
      return row;
    }

    const [row] = await supabaseInsert<AdminFaqSectionRecord>("faq_sections", payload);
    void logAdminMutation("create", "faq_sections", row.id, { title: row.title });
    return row;
  });

export const deleteAdminFaqSection = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminFaqSectionRecord>("faq_sections", `id=eq.${data.id}`);
    void logAdminMutation("delete", "faq_sections", data.id);
    return { success: true };
  });

export const listAdminServiceAreas = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  try {
    return await supabaseSelect<AdminServiceAreaRecord>(
      "service_areas?select=id,name,summary,search_intent,highlights_text,sort_order,is_active&order=sort_order.asc,id.asc",
    );
  } catch {
    return [];
  }
});

export const upsertAdminServiceArea = createServerFn({ method: "POST" })
  .inputValidator(
    serviceAreaSchema.extend({
      id: z.number().int().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id: _, ...payload } = data;
    if (data.id) {
      const [row] = await supabaseUpdate<AdminServiceAreaRecord>(
        "service_areas",
        `id=eq.${data.id}`,
        payload,
      );
      void logAdminMutation("update", "service_areas", row.id, { name: row.name });
      return row;
    }

    const [row] = await supabaseInsert<AdminServiceAreaRecord>("service_areas", payload);
    void logAdminMutation("create", "service_areas", row.id, { name: row.name });
    return row;
  });

export const deleteAdminServiceArea = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.number().int() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    await supabaseDelete<AdminServiceAreaRecord>("service_areas", `id=eq.${data.id}`);
    void logAdminMutation("delete", "service_areas", data.id);
    return { success: true };
  });
