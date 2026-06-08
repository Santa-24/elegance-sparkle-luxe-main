import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(1000).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const getLiveServicesFn = createServerFn({ method: "GET" })
  .inputValidator(listQuerySchema.optional())
  .handler(async ({ data }) => {
    const { getLiveServices } = await import("./live.server");
    return getLiveServices(data);
  });

export const getLiveGalleryFn = createServerFn({ method: "GET" })
  .inputValidator(listQuerySchema.optional())
  .handler(async ({ data }) => {
    const { getLiveGallery } = await import("./live.server");
    return getLiveGallery(data);
  });

export const getLiveOffersFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveOffers } = await import("./live.server");
  return getLiveOffers();
});

export const getLivePricingPackagesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLivePricingPackages } = await import("./live.server");
  return getLivePricingPackages();
});

export const getLiveBlogPostsFn = createServerFn({ method: "GET" })
  .inputValidator(listQuerySchema.optional())
  .handler(async ({ data }) => {
    const { getLiveBlogPosts } = await import("./live.server");
    return getLiveBlogPosts(data);
  });

export const getLiveBlogPostBySlugFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { getLiveBlogPostBySlug } = await import("./live.server");
    return getLiveBlogPostBySlug(data.slug);
  });

export const getLiveTestimonialsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveTestimonials } = await import("./live.server");
  return getLiveTestimonials();
});

export const getLiveAdvertisementFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveAdvertisement } = await import("./live.server");
  return getLiveAdvertisement();
});

export const getLiveAdvertisementsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveAdvertisements } = await import("./live.server");
  return getLiveAdvertisements();
});

export const getLiveHeroContentFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveHeroContent } = await import("./live.server");
  return getLiveHeroContent();
});

export const getLiveAboutContentFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveAboutContent } = await import("./live.server");
  return getLiveAboutContent();
});

export const getLiveContactSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveContactSettings } = await import("./live.server");
  return getLiveContactSettings();
});

export const getLiveSocialLinksFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveSocialLinks } = await import("./live.server");
  return getLiveSocialLinks();
});

export const getLiveSeoSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveSeoSettings } = await import("./live.server");
  return getLiveSeoSettings();
});

export const getLiveFaqSectionsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveFaqSections } = await import("./live.server");
  return getLiveFaqSections();
});

export const getLiveServiceAreasFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveServiceAreas } = await import("./live.server");
  return getLiveServiceAreas();
});

export const getLiveSiteContentFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getLiveSiteContent } = await import("./live.server");
  return getLiveSiteContent();
});
