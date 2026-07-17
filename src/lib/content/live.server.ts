import { supabaseSelect } from "@/lib/supabase.server";

import type { BridalPackage, GalleryImage, Offer, Service, Testimonial } from "@/lib/data";
import { galleryImages as staticGalleryImages } from "@/lib/data/gallery";
import {
  bridalPackages as staticBridalPackages,
  services as staticServices,
} from "@/lib/data/services";
import { faqSections as staticFaqSections, type FaqSection } from "./faq";
import { serviceAreas as staticServiceAreas, type ServiceArea } from "./service-areas";

type PaginationInput = {
  limit?: number;
  offset?: number;
};

type LiveServiceRow = {
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

type LiveGalleryRow = {
  id: number;
  title: string;
  category: "bridal" | "parlour" | "before_after" | "academy";
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_active: boolean;
};

type LiveOfferRow = {
  id: number;
  title: string;
  discount_label: string;
  description: string;
  valid_from: string;
  valid_until: string;
  status: "scheduled" | "active" | "expired" | "paused";
};

type LivePricingPackageRow = {
  id: number;
  name: string;
  price: number;
  popular: boolean;
  features_text: string;
  sort_order: number;
  is_active: boolean;
};

type LiveTestimonialRow = {
  id: number;
  customer_name: string;
  service_name: string;
  rating: number;
  review_text: string;
  status: "visible" | "draft" | "archived";
  wedding_month_year?: string | null;
};

type LiveAdvertisementRow = {
  id: number;
  title: string;
  asset_url: string;
  asset_type: "poster" | "banner" | "carousel" | "story";
  platform: "website" | "instagram" | "facebook" | "whatsapp";
  start_date: string;
  end_date: string;
  status: "active" | "paused" | "archived" | "scheduled";
};

type LiveHeroContentRow = {
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

type LiveAboutContentRow = {
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

type LiveContactSettingsRow = {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_url: string;
  working_hours: string;
  is_active: boolean;
};

type LiveSocialLinksRow = {
  id: number;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  whatsapp: string | null;
  is_active: boolean;
};

type LiveSeoSettingsRow = {
  id: number;
  meta_title: string;
  meta_description: string;
  keywords: string;
  canonical_url: string;
  og_image_url: string | null;
  is_active: boolean;
};

type LiveFaqSectionRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  items_text: string;
  sort_order: number;
  is_active: boolean;
};

type LiveServiceAreaRow = {
  id: number;
  name: string;
  summary: string;
  search_intent: string;
  highlights_text: string;
  sort_order: number;
  is_active: boolean;
};

type LiveBlogCategoryRow = {
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

type LiveBlogAuthorRow = {
  slug: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
};

type LiveBlogPostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content_text: string;
  featured_image_url: string | null;
  tags_text: string | null;
  category_slug: string;
  author_slug: string;
  published_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
};

function toServiceIcon(category: Service["category"], title: string): Service["icon"] {
  if (category === "Bridal") return "Crown";
  if (category === "Academy") return "GraduationCap";
  if (title.toLowerCase().includes("hair")) return "Scissors";
  if (title.toLowerCase().includes("facial")) return "Heart";
  return "Sparkles";
}

function mapService(row: LiveServiceRow): Service {
  return {
    title: row.title,
    desc: row.description,
    price: row.price_label,
    duration: row.duration_label,
    icon: toServiceIcon(
      row.category === "bridal" ? "Bridal" : row.category === "parlour" ? "Parlour" : "Academy",
      row.title,
    ),
    category:
      row.category === "bridal" ? "Bridal" : row.category === "parlour" ? "Parlour" : "Academy",
    featured: row.featured,
  };
}

function normalizeImagePath(path: string | null | undefined): string {
  if (!path) return "";
  return path.replace(/^\/src\/assets/, "/assets").replace(/^src\/assets/, "/assets");
}

function mapGallery(row: LiveGalleryRow): GalleryImage {
  return {
    src: normalizeImagePath(row.image_url),
    alt: row.alt_text || row.title,
    cat:
      row.category === "before_after"
        ? "Before & After"
        : row.category === "bridal"
          ? "Bridal"
          : row.category === "parlour"
            ? "Parlour"
            : "Academy",
  };
}

function mapOffer(row: LiveOfferRow): Offer {
  return {
    title: row.title,
    discount: row.discount_label,
    desc: row.description,
    validity: `${row.valid_from} to ${row.valid_until}`,
  };
}

function mapPricingPackage(row: LivePricingPackageRow): BridalPackage {
  return {
    name: row.name,
    price: row.price,
    popular: row.popular,
    features: parseLines(row.features_text),
  };
}

function mapTestimonial(row: LiveTestimonialRow): Testimonial {
  return {
    name: row.customer_name,
    rating: row.rating,
    text: row.review_text,
    service: row.service_name,
    date: row.wedding_month_year || undefined,
  };
}

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseFaqItems(value: string) {
  return parseLines(value).map((line) => {
    const [question, ...answerParts] = line.split("||");
    return {
      question: question?.trim() ?? "",
      answer: answerParts.join("||").trim(),
    };
  });
}

function mapFaqSection(row: LiveFaqSectionRow): FaqSection {
  return {
    title: row.title,
    slug: row.slug,
    description: row.description,
    items: parseFaqItems(row.items_text),
  };
}

function mapServiceArea(row: LiveServiceAreaRow): ServiceArea {
  return {
    name: row.name,
    summary: row.summary,
    searchIntent: row.search_intent,
    highlights: parseLines(row.highlights_text),
  };
}

function buildPaginationQuery(input?: PaginationInput) {
  if (!input?.limit && !input?.offset) {
    return "";
  }

  const params = new URLSearchParams();
  if (input.limit) {
    params.set("limit", String(input.limit));
  }
  if (input.offset) {
    params.set("offset", String(input.offset));
  }
  return `&${params.toString()}`;
}

function normalizeBlogTags(value: string | null | undefined) {
  return (value ?? "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitBlogContent(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const BLOG_THUMBNAILS: Record<string, string> = {
  "bridal-makeup-checklist-jajpur-road":
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "how-to-choose-makeup-academy-odisha":
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
  "pre-bridal-skincare-routine-before-wedding":
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  "party-makeup-vs-bridal-makeup":
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
};

function mapBlogPost(row: LiveBlogPostRow, categoryTitle?: string, authorName?: string) {
  return {
    slug: row.slug,
    title: row.title,
    description: row.seo_description || row.excerpt,
    seoTitle: row.seo_title || row.title,
    category: categoryTitle || row.category_slug,
    publishDate: row.published_at.slice(0, 10),
    updatedDate: row.updated_at.slice(0, 10),
    readTime: `${Math.max(3, Math.ceil(row.content_text.length / 1200))} min read`,
    keywords: normalizeBlogTags(row.tags_text),
    excerpt: row.excerpt,
    body: splitBlogContent(row.content_text),
    featuredImageUrl:
      row.featured_image_url ||
      BLOG_THUMBNAILS[row.slug] ||
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    tags: normalizeBlogTags(row.tags_text),
    authorName: authorName || row.author_slug,
    categorySlug: row.category_slug,
    authorSlug: row.author_slug,
    isFeatured: row.is_featured,
  };
}

export async function getLiveServices(input?: PaginationInput) {
  try {
    const pagination = buildPaginationQuery(input);
    const rows = await supabaseSelect<LiveServiceRow>(
      `services?select=id,title,category,description,price_label,duration_label,featured,image_url,is_active&is_active=eq.true&deleted_at=is.null&order=sort_order.asc,created_at.desc${pagination}`,
    );
    const liveServices = rows
      .filter((row) =>
        Boolean(row?.title && row?.description && row?.price_label && row?.duration_label),
      )
      .map(mapService);
    return liveServices.length > 0 ? liveServices : staticServices;
  } catch {
    return staticServices;
  }
}

export async function getLiveGallery(input?: PaginationInput) {
  try {
    const pagination = buildPaginationQuery(input);
    const rows = await supabaseSelect<LiveGalleryRow>(
      `gallery?select=id,title,category,image_url,alt_text,sort_order,is_active&is_active=eq.true&deleted_at=is.null&order=sort_order.asc,id.desc${pagination}`,
    );
    const liveGallery = rows
      .filter((row) => Boolean(row?.image_url))
      .map(mapGallery)
      .filter((image) => Boolean(image.src));
    return liveGallery.length > 0 ? liveGallery : staticGalleryImages;
  } catch {
    return staticGalleryImages;
  }
}

export async function getLiveOffers() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const rows = await supabaseSelect<LiveOfferRow>(
      `offers?select=id,title,discount_label,description,valid_from,valid_until,status&deleted_at=is.null&status=eq.active&valid_until=gte.${today}&order=created_at.desc`,
    );
    return rows.map(mapOffer);
  } catch {
    return [];
  }
}

export async function getLivePricingPackages() {
  try {
    const rows = await supabaseSelect<LivePricingPackageRow>(
      "pricing_packages?select=id,name,price,popular,features_text,sort_order,is_active&is_active=eq.true&order=sort_order.asc,id.asc",
    );
    const packages = rows
      .map(mapPricingPackage)
      .filter((pkg) => pkg.name && pkg.features.length > 0);

    const uniquePackages: typeof packages = [];
    const seenNames = new Set<string>();
    for (const pkg of packages) {
      if (!seenNames.has(pkg.name)) {
        seenNames.add(pkg.name);
        uniquePackages.push(pkg);
      }
    }

    return uniquePackages.length > 0 ? uniquePackages : staticBridalPackages;
  } catch {
    return staticBridalPackages;
  }
}

export async function getLiveBlogCategories() {
  try {
    return await supabaseSelect<LiveBlogCategoryRow>(
      "blog_categories?select=slug,title,description,sort_order,is_active&is_active=eq.true&deleted_at=is.null&order=sort_order.asc,title.asc",
    );
  } catch {
    return [];
  }
}

export async function getLiveBlogAuthors() {
  try {
    return await supabaseSelect<LiveBlogAuthorRow>(
      "blog_authors?select=slug,name,bio,avatar_url,is_active&is_active=eq.true&deleted_at=is.null&order=name.asc",
    );
  } catch {
    return [];
  }
}

export async function getLiveBlogPosts(input?: PaginationInput) {
  try {
    const pagination = buildPaginationQuery(input);
    const rows = await supabaseSelect<LiveBlogPostRow>(
      `blog_posts?select=id,slug,title,excerpt,content_text,featured_image_url,tags_text,category_slug,author_slug,published_at,updated_at,seo_title,seo_description,is_featured,is_published,sort_order&is_published=eq.true&deleted_at=is.null&order=is_featured.desc,published_at.desc,sort_order.asc${pagination}`,
    );

    const [categories, authors] = await Promise.all([
      getLiveBlogCategories(),
      getLiveBlogAuthors(),
    ]);
    const categoryBySlug = new Map(categories.map((category) => [category.slug, category.title]));
    const authorBySlug = new Map(authors.map((author) => [author.slug, author.name]));

    return rows
      .filter((row) => Boolean(row.slug && row.title && row.content_text && row.published_at))
      .map((row) =>
        mapBlogPost(row, categoryBySlug.get(row.category_slug), authorBySlug.get(row.author_slug)),
      );
  } catch {
    return [];
  }
}

export async function getLiveBlogPostBySlug(slug: string) {
  try {
    const rows = await supabaseSelect<LiveBlogPostRow>(
      `blog_posts?select=id,slug,title,excerpt,content_text,featured_image_url,tags_text,category_slug,author_slug,published_at,updated_at,seo_title,seo_description,is_featured,is_published,sort_order&slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&deleted_at=is.null&limit=1`,
    );
    if (!rows[0]) {
      return null;
    }

    const [categories, authors] = await Promise.all([
      getLiveBlogCategories(),
      getLiveBlogAuthors(),
    ]);
    const categoryBySlug = new Map(categories.map((category) => [category.slug, category.title]));
    const authorBySlug = new Map(authors.map((author) => [author.slug, author.name]));
    return mapBlogPost(
      rows[0],
      categoryBySlug.get(rows[0].category_slug),
      authorBySlug.get(rows[0].author_slug),
    );
  } catch {
    return null;
  }
}

export async function getLiveTestimonials() {
  try {
    const rows = await supabaseSelect<LiveTestimonialRow>(
      "testimonials?select=id,customer_name,service_name,rating,review_text,status,wedding_month_year&status=eq.visible&deleted_at=is.null&order=created_at.desc&limit=50",
    );
    return rows.map(mapTestimonial);
  } catch {
    return [];
  }
}

export async function getLiveAdvertisement() {
  try {
    const rows = await getLiveAdvertisements();
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLiveAdvertisements() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const rows = await supabaseSelect<LiveAdvertisementRow>(
      `advertisements?select=id,title,asset_url,asset_type,platform,start_date,end_date,status&status=in.(active,scheduled)&deleted_at=is.null&end_date=gte.${today}&order=created_at.desc`,
    );
    return rows
      .filter((row) => Boolean(row?.title && row?.asset_url))
      .map((row) => ({
        ...row,
        asset_url: normalizeImagePath(row.asset_url),
      }));
  } catch {
    return [];
  }
}

export async function getLiveHeroContent() {
  try {
    const rows = await supabaseSelect<LiveHeroContentRow>(
      "hero_content?select=id,heading,subtitle,primary_cta_label,primary_cta_url,secondary_cta_label,secondary_cta_url,hero_image_url,hero_image_alt,is_active&is_active=eq.true&order=created_at.desc",
    );
    const row = rows[0] ?? null;
    if (row) {
      return {
        ...row,
        hero_image_url: normalizeImagePath(row.hero_image_url),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getLiveAboutContent() {
  try {
    const rows = await supabaseSelect<LiveAboutContentRow>(
      "about_content?select=id,headline,body,bullet_points,founder_name,founder_title,founder_image_url,gallery_image_url,is_active&is_active=eq.true&order=created_at.desc",
    );
    const row = rows[0] ?? null;
    if (row) {
      return {
        ...row,
        founder_image_url: normalizeImagePath(row.founder_image_url),
        gallery_image_url: normalizeImagePath(row.gallery_image_url),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getLiveContactSettings() {
  try {
    const rows = await supabaseSelect<LiveContactSettingsRow>(
      "contact_settings?select=id,phone,whatsapp,email,address,map_url,working_hours,is_active&is_active=eq.true&order=created_at.desc",
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLiveSocialLinks() {
  try {
    const rows = await supabaseSelect<LiveSocialLinksRow>(
      "social_links?select=id,instagram,facebook,youtube,whatsapp,is_active&is_active=eq.true&order=created_at.desc",
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLiveSeoSettings() {
  try {
    const rows = await supabaseSelect<LiveSeoSettingsRow>(
      "seo_settings?select=id,meta_title,meta_description,keywords,canonical_url,og_image_url,is_active&is_active=eq.true&order=created_at.desc",
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLiveFaqSections() {
  try {
    const rows = await supabaseSelect<LiveFaqSectionRow>(
      "faq_sections?select=id,title,slug,description,items_text,sort_order,is_active&is_active=eq.true&order=sort_order.asc,id.asc",
    );
    const sections = rows
      .map(mapFaqSection)
      .filter((section) => section.title && section.slug && section.items.length > 0);
    return sections.length > 0 ? sections : staticFaqSections;
  } catch {
    return staticFaqSections;
  }
}

export async function getLiveServiceAreas() {
  try {
    const rows = await supabaseSelect<LiveServiceAreaRow>(
      "service_areas?select=id,name,summary,search_intent,highlights_text,sort_order,is_active&is_active=eq.true&order=sort_order.asc,id.asc",
    );
    const areas = rows
      .map(mapServiceArea)
      .filter((area) => area.name && area.summary && area.searchIntent);
    return areas.length > 0 ? areas : staticServiceAreas;
  } catch {
    return staticServiceAreas;
  }
}

export async function getLiveSiteContent() {
  const [hero, about, contact, social, seo] = await Promise.all([
    getLiveHeroContent(),
    getLiveAboutContent(),
    getLiveContactSettings(),
    getLiveSocialLinks(),
    getLiveSeoSettings(),
  ]);

  return {
    hero,
    about,
    contact,
    social,
    seo,
  };
}
