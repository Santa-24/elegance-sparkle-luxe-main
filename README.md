<div align="center">

# Elegance Makeover & Academy — Website & CMS

**Client:** Elegance Makeover & Academy, Jajpur Road, Odisha
**Delivered by:** Rasmirekha Swain
**Version:** 1.0.0 · Production Ready

</div>

---

## Project Overview

This is the official website and content management system built for Elegance Makeover & Academy — a premium bridal makeup and beauty parlour based in Jajpur Road, Odisha.

The deliverable includes a fully branded public-facing website, a Supabase-backed content layer, and a private admin dashboard that allows the client to independently manage services, gallery images, bookings, offers, testimonials, and all other site content — without any technical knowledge required.

---

## What's Included

### Public Website

A polished, mobile-responsive website covering:

- **Home** — Hero section, service highlights, gallery preview, offers, testimonials, and local area coverage
- **Services** — Full list of offered makeup and parlour services
- **Gallery** — Portfolio of work, filterable and updatable via the admin panel
- **Pricing** — Packages and pricing, managed live from the dashboard
- **Booking** — Online appointment request form with spam protection
- **Contact** — Business info, inquiry form, and embedded contact details
- **About** — Studio story, team, and credentials
- **Offers** — Active promotions and seasonal deals
- **Testimonials** — Client reviews displayed dynamically
- **FAQ** — Common questions and answers
- **Blog** — Articles with category and author support
- **Service Areas** — Local coverage map and area listings

### Admin Dashboard

A password-protected backend portal for the client team to manage all site content, including:

- Bookings and appointment requests
- Services, pricing packages, and offers
- Gallery uploads and media management
- Testimonials and customer reviews
- Blog posts, categories, and authors
- About page content and contact settings
- SEO metadata and social sharing settings
- Advertisements and promotional banners
- Site-wide hero content and announcements

### Technical Highlights

- **SEO-ready** — Structured data, canonical URLs, sitemap, and social sharing tags configured out of the box
- **Spam protection** — Honeypot fields on all forms; optional Cloudflare Turnstile integration available
- **Analytics** — Google Analytics 4 and Microsoft Clarity integrated for visitor insights
- **Fast and modern** — Built with TanStack Start, React 19, Vite, and Tailwind CSS for performance and maintainability

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.x |
| Framework | TanStack Start + React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Database & CMS | Supabase (PostgreSQL) |
| Media Storage | Supabase Storage |
| Analytics | Google Analytics 4, Microsoft Clarity |
| Spam Protection | Cloudflare Turnstile (optional) |
| Icons | Lucide React |
| Form Handling | React Hook Form + Zod |

---

## Project Structure

```
elegance-sparkle-luxe-main/
├── docs/
│   └── schema.sql              ← Database setup script
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── src/
│   ├── admin/                  ← Admin dashboard logic and API
│   ├── components/             ← Reusable UI, SEO, and security components
│   ├── lib/                    ← Data loaders, configs, and server utilities
│   └── routes/                 ← All public and admin pages
├── .env.example                ← Environment variable template
├── package.json
└── vite.config.ts
```

---

## Setup & Installation

### Prerequisites

- Node.js 18 or 20+
- npm
- A Supabase project (free tier is sufficient to start)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd elegance-sparkle-luxe-main

# 2. Install dependencies
npm install

# 3. Set up environment variables
copy .env.example .env
# Fill in all required values (see Environment Variables below)

# 4. Apply the database schema
# Open your Supabase project → SQL Editor → paste and run docs/schema.sql
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values below.

### Required

| Variable | Description |
|---|---|
| `ADMIN_SESSION_SECRET` | Secret key for signing the admin session cookie |
| `ADMIN_EMAIL` | Login email for the admin dashboard |
| `ADMIN_PASSWORD` | Login password for the admin dashboard |
| `SESSION_SECRET` | Session encryption key |
| `JWT_SECRET` | Additional server-side security key |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public/anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |

### Optional

| Variable | Description | Default |
|---|---|---|
| `SUPABASE_MEDIA_BUCKET` | Storage bucket name for admin media uploads | `cms-media` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | Disabled if empty |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key | Disabled if empty |
| `VITE_CONTACT_PHONE` | Phone number displayed on the site | `+91 92652 00523` |
| `VITE_CONTACT_EMAIL` | Email address displayed on the site | `hello@example.com` |
| `VITE_CONTACT_ADDRESS` | Business address displayed on the site | `Jajpur Road, Odisha, India` |
| `VITE_CONTACT_HOURS` | Opening hours displayed on the site | `Mon - Sun \| 10:00 AM - 8:00 PM` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for the chat button | Derived from contact phone |
| `VITE_SITE_URL` | Canonical URL for SEO (e.g. `https://yourdomain.com`) | Empty |
| `VITE_SITE_NAME` | Brand name shown in metadata and titles | `Elegance Makeover & Academy` |
| `VITE_ADMIN_EMAIL` | Pre-filled email on the admin login page | `elegancemakeover.2021@gmail.com` |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID | Empty |
| `VITE_CLARITY_ID` | Microsoft Clarity project ID | Empty |
| `VITE_INSTAGRAM_URL` | Instagram profile URL | `#` |
| `VITE_FACEBOOK_URL` | Facebook page URL | `#` |

---

## Running Locally

```bash
npm run dev
```

The site will be available at: `http://localhost:5173`

The admin dashboard is accessible at: `http://localhost:5173/admin`

---

## Building for Production

```bash
npm run build
```

This generates two output directories:

- `dist/client` — Static frontend assets
- `dist/server` — Node.js server bundle

Deploy both to any Node-compatible hosting platform (e.g. Railway, Render, Fly.io, VPS) along with the configured environment variables.

---

## Database Schema

The Supabase schema is defined in `docs/schema.sql`. Apply it once during initial setup via the Supabase SQL Editor.

Tables created by the schema:

| Table | Purpose |
|---|---|
| `admin_users` | Admin access credentials |
| `services` | Service listings |
| `gallery` | Portfolio images |
| `testimonials` | Client reviews |
| `offers` | Promotions and deals |
| `advertisements` | Banner ads and promos |
| `bookings` | Appointment requests |
| `contact_messages` | Inquiry form submissions |
| `pricing_packages` | Service pricing |
| `hero_content` | Homepage hero text and images |
| `about_content` | About page content |
| `contact_settings` | Business contact details |
| `social_links` | Social media URLs |
| `seo_settings` | Per-page SEO metadata |
| `service_areas` | Coverage area listings |
| `blog_posts` | Blog articles |
| `blog_categories` | Blog categories |
| `blog_authors` | Blog author profiles |
| `rate_limits` | Anti-abuse rate limiting |
| `audit_logs` | Admin activity log |
| `notifications` | Admin notification queue |
| `customer_preferences` | Optional CRM data |
| `email_templates` | Customisable email templates |

The schema also includes row-level security (RLS) policies, database views, and helper functions.

---

## Code Quality

```bash
# Lint
npm run lint

# Format
npm run format
```

No automated test runner is configured. Manual testing is recommended before each production deployment.

---

## Troubleshooting

**Admin login not working**
Check that `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SESSION_SECRET`, and `JWT_SECRET` are all set correctly in `.env`.

**Booking or contact form submissions failing**
Confirm that Supabase credentials are valid and that `docs/schema.sql` has been applied in full. If Turnstile keys are set, verify they match your Cloudflare dashboard. Leaving them empty disables Turnstile — this is safe for initial setup.

**Media uploads failing from the admin panel**
Ensure the bucket named in `SUPABASE_MEDIA_BUCKET` exists in your Supabase Storage dashboard and that `SUPABASE_SERVICE_ROLE_KEY` is correct.

**Site URL appearing incorrectly in SEO tags**
Set `VITE_SITE_URL` to your full production domain (e.g. `https://elegancemakeover.in`) so canonical URLs and Open Graph tags resolve correctly.

---

## Handover Notes

- All site content is managed through the admin dashboard at `/admin` — no code changes are required for routine updates
- The admin login credentials are configured via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the environment variables
- To add a new gallery image, blog post, service, or offer: log in to the admin panel and use the corresponding section
- For domain setup, SSL, or hosting questions, please reach out to your developer
- A backup of the Supabase database is recommended before any major content changes

---

## License

This project was built as a custom client engagement. All code and assets are proprietary to the client. Redistribution or reuse without permission is not permitted.

---

*Built by Santanu Barik*
