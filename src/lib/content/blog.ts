export type BlogCategory = "Bridal" | "Academy" | "Skincare" | "Local SEO" | "Beauty Tips";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  publishDate: string;
  readTime: string;
  keywords: string[];
  excerpt: string;
  body: string[];
};

export const blogCategories: BlogCategory[] = [
  "Bridal",
  "Academy",
  "Skincare",
  "Local SEO",
  "Beauty Tips",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "bridal-makeup-checklist-jajpur-road",
    title: "Bridal Makeup Checklist for Jajpur Road Weddings",
    description:
      "A practical bridal checklist for brides planning a refined, long-lasting wedding look in Odisha.",
    category: "Bridal",
    publishDate: "2026-06-03",
    readTime: "6 min read",
    keywords: ["bridal makeup Jajpur Road", "bridal checklist", "wedding makeup Odisha"],
    excerpt:
      "Use this checklist to plan your bridal prep, timing, product choices and final touch-ups.",
    body: [
      "Start with a trial look if your wedding date allows it. Trials reduce uncertainty and help align your makeup with jewelry, outfit and lighting.",
      "Prepare skin in the days before the event with hydration, gentle cleansing and no harsh experiments. Good skin prep matters as much as product quality.",
      "On the day itself, keep your accessories, outfit references and any allergy notes ready so the artist can work faster and more precisely.",
      "For a polished finish, combine makeup with hair styling and draping instead of treating them as separate last-minute tasks.",
    ],
  },
  {
    slug: "how-to-choose-makeup-academy-odisha",
    title: "How to Choose a Makeup Academy in Odisha",
    description:
      "What to look for in academy training, certifications, live practice and placement support.",
    category: "Academy",
    publishDate: "2026-06-03",
    readTime: "5 min read",
    keywords: ["makeup academy Odisha", "beauty course", "certified makeup training"],
    excerpt:
      "Choose a makeup academy that teaches real client work, not just theory, and offers a clear path to practice.",
    body: [
      "Look for a curriculum that covers skin prep, base work, eye design, hair basics and client handling. A useful course should build both skill and confidence.",
      "Ask whether the academy offers live demonstrations and supervised practice on models or real clients. That experience is often what separates a course from a certificate.",
      "Placement support and portfolio guidance are important signals that the academy is serious about student outcomes.",
      "If you’re local to Odisha, choosing a nearby academy can make attendance and follow-up practice much easier.",
    ],
  },
  {
    slug: "pre-bridal-skincare-routine-before-wedding",
    title: "Pre-Bridal Skincare Routine Before the Wedding",
    description:
      "A simple, high-impact skincare routine to prepare for bridal makeup and photography.",
    category: "Skincare",
    publishDate: "2026-06-03",
    readTime: "5 min read",
    keywords: ["pre bridal skincare", "wedding skincare routine", "skin prep before wedding"],
    excerpt:
      "A calm, consistent skincare routine helps your makeup sit better and last longer on the wedding day.",
    body: [
      "Keep skincare simple in the final two weeks. Hydration, gentle cleansing and sun protection usually matter more than adding new aggressive treatments.",
      "Avoid trying multiple new products right before the wedding. A stable routine reduces the risk of irritation or unexpected breakouts.",
      "Book facial or cleanup services with enough time before the final bridal appointment so skin has time to settle naturally.",
      "If your skin has any sensitivity, tell the artist early so the makeup plan can be adjusted.",
    ],
  },
  {
    slug: "party-makeup-vs-bridal-makeup",
    title: "Party Makeup vs Bridal Makeup: What’s the Difference?",
    description:
      "Understand how bridal and party looks differ in finish, timing, durability and product selection.",
    category: "Beauty Tips",
    publishDate: "2026-06-03",
    readTime: "4 min read",
    keywords: ["party makeup", "bridal makeup difference", "makeup tips"],
    excerpt:
      "The right look depends on duration, lighting, event importance and how much wear the makeup needs to survive.",
    body: [
      "Party makeup is often lighter and quicker, while bridal makeup is designed to last longer and look balanced across many photo conditions.",
      "Bridal looks usually need stronger base work, more precise structure and a higher focus on longevity.",
      "For receptions or day events, a softer party look can be the better choice if the event does not require all-day wear.",
      "A good artist will suggest the right option based on your event, not simply push the most expensive package.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, category: BlogCategory) {
  return blogPosts.filter((post) => post.slug !== slug && post.category === category).slice(0, 3);
}
