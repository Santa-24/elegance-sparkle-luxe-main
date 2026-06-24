<div align="center">

# 📦 Elegance Makeover & Academy

> A premium bridal makeup, beauty parlour, and academy website built for Elegance Makeover & Academy in Jajpur Road, Odisha.
> It includes a polished public-facing site, a Supabase-backed content system, and a secure admin dashboard for managing services, gallery, bookings, and more.

![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Build](#build)
- [Deployment](#deployment)
- [Database](#database)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🔍 Overview

Elegance Makeover & Academy is a modern salon and academy website designed to showcase bridal makeup, parlour services, gallery work, offers, testimonials, and academy content in one polished experience. The public site is optimized for discovery, branded search, and local visibility around Jajpur Road, Odisha.

The app also includes an admin dashboard for managing bookings, services, gallery entries, offers, testimonials, advertisements, SEO content, and other site data stored in Supabase. It is built as a route-driven React application with server-side functions for content access, authentication, and form submissions.

---

## ✨ Features

- ✅ Public home page with luxury branding, hero content, service highlights, gallery previews, offers, testimonials, and local coverage
- ✅ Dedicated pages for services, gallery, pricing, booking, contact, FAQ, blog, about, and service areas
- ✅ Admin dashboard for managing bookings, services, gallery items, testimonials, offers, pricing packages, ads, about content, contact settings, SEO, and more
- ✅ Supabase-backed CMS and database layer for live content updates
- ✅ Booking and contact forms with honeypot spam protection
- ✅ SEO-friendly metadata, canonical URLs, structured data, sitemap route, and social sharing tags
- ✅ Server-side session-based admin authentication using environment-configured credentials
- ✅ Responsive UI built with modern React components and Tailwind CSS

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript 5.x |
| Framework | TanStack Start + React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Primitives | Radix UI |
| Forms / Validation | React Hook Form, Zod |
| Data / CMS | Supabase |
| Analytics | Google Analytics 4, Microsoft Clarity |
| Spam Protection | Honeypot + rate limiting |
| Icons | Lucide React |
| Testing | No test runner is configured in the repository |

---

## 🏗️ Architecture

The project uses a route-based React architecture powered by TanStack Start. Public pages live under `src/routes`, while reusable UI, SEO helpers, security utilities, content loaders, and API/server functions are split into dedicated folders under `src/components`, `src/lib`, and `src/admin`.

The frontend renders a public website and an admin dashboard from the same codebase. Server functions handle bookings, contact submissions, admin authentication, and content CRUD operations, while Supabase stores the persistent content and operational data. SEO metadata and structured data are assembled at the route level so each page can present strong search and social sharing signals.

---

## 📁 Project Structure

```text
elegance-sparkle-luxe-main/
├── docs/
│   └── schema.sql
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── src/
│   ├── admin/
│   │   ├── AdminPage.tsx
│   │   ├── api/
│   │   ├── data.ts
│   │   ├── types.ts
│   │   └── validators.ts
│   ├── components/
│   │   ├── seo/
│   │   ├── security/
│   │   ├── site/
│   │   └── ui/
│   ├── lib/
│   │   ├── api/
│   │   ├── config/
│   │   ├── content/
│   │   ├── data/
│   │   ├── security/
│   │   ├── seo.ts
│   │   └── supabase.server.ts
│   └── routes/
│       ├── about.tsx
│       ├── admin.tsx
│       ├── blog.tsx
│       ├── blog.$slug.tsx
│       ├── booking.tsx
│       ├── contact.tsx
│       ├── faq.tsx
│       ├── gallery.tsx
│       ├── index.tsx
│       ├── offers.tsx
│       ├── pricing.tsx
│       ├── service-areas.tsx
│       ├── services.tsx
│       ├── sitemap[.]xml.ts
│       └── testimonials.tsx
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✅ Prerequisites

- Node.js 18+ or 20+
- npm
- A Supabase project with the schema from `docs/schema.sql`

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd elegance-sparkle-luxe-main

# 2. Install dependencies
npm install

# 3. Configure environment variables
copy .env.example .env
# Edit .env with your own values

# 4. Set up the database
# Apply docs/schema.sql to your Supabase database
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ADMIN_SESSION_SECRET` | Secret used to sign the admin session cookie | ✅ Yes | None |
| `ADMIN_EMAIL` | Email used for admin panel login | ✅ Yes | None |
| `ADMIN_PASSWORD` | Password used for admin panel login | ✅ Yes | None |
| `SESSION_SECRET` | Session encryption/signing secret | ✅ Yes | None |
| `JWT_SECRET` | Additional server security secret used by the app | ✅ Yes | None |
| `SUPABASE_URL` | Supabase project URL | ✅ Yes | None |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ Yes | None |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server-side access | ✅ Yes | None |
| `SUPABASE_MEDIA_BUCKET` | Storage bucket used for admin media uploads | ⚪ No | `cms-media` |
| `VITE_CONTACT_PHONE` | Public contact phone shown on the site | ⚪ No | `+91 92652 00523` |
| `VITE_CONTACT_EMAIL` | Public contact email shown on the site | ⚪ No | `hello@example.com` |
| `VITE_CONTACT_ADDRESS` | Public business address | ⚪ No | `Jajpur Road, Odisha, India` |
| `VITE_CONTACT_HOURS` | Public opening hours | ⚪ No | `Mon - Sun | 10:00 AM - 8:00 PM` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number used in the public UI | ⚪ No | Derived from contact phone |
| `VITE_SITE_URL` | Canonical site URL used for SEO links | ⚪ No | Empty |
| `VITE_SITE_NAME` | Public site / brand name | ⚪ No | `Elegance Makeover & Academy` |
| `VITE_ADMIN_EMAIL` | Prefilled admin email in the login form | ⚪ No | `elegancemakeover.2021@gmail.com` |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID | ⚪ No | Empty |
| `VITE_CLARITY_ID` | Microsoft Clarity project ID | ⚪ No | Empty |
| `VITE_INSTAGRAM_URL` | Instagram profile URL | ⚪ No | `#` |
| `VITE_FACEBOOK_URL` | Facebook page URL | ⚪ No | `#` |

---

## 💻 Running Locally

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 📦 Build

```bash
npm run build
```

Output directories:
- `dist/client`
- `dist/server`

---

## 🌐 Deployment

This project builds as a TanStack Start app with separate client and server outputs. Deploy it to a Node-compatible hosting platform that can serve the generated server bundle and static client assets.

Typical deployment flow:

```bash
npm run build
```

Then deploy the generated `dist/` output along with the required environment variables.

---

## 🗃️ Database

**Database:** Supabase PostgreSQL

Main tables and objects defined in `docs/schema.sql` include:

- `admin_users`
- `services`
- `gallery`
- `testimonials`
- `offers`
- `advertisements`
- `bookings`
- `contact_messages`
- `rate_limits`
- `audit_logs`
- `notifications`
- `customer_preferences`
- `email_templates`
- `hero_content`
- `about_content`
- `contact_settings`
- `social_links`
- `seo_settings`
- `pricing_packages`
- `service_areas`
- `blog_categories`
- `blog_authors`
- `blog_posts`

The schema also includes helper functions, views, and row-level security policies for admin access and operational data management.

---

## 🧪 Testing

No automated test runner is configured in `package.json`.

Available quality commands:

```bash
# Lint the codebase
npm run lint

# Format the codebase
npm run format
```

---

## 🔧 Troubleshooting

**Issue: Admin login fails**
```bash
# Check these values in .env
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_SESSION_SECRET
SESSION_SECRET
JWT_SECRET
```

**Issue: Booking or contact forms fail to submit**
> Confirm that your Supabase credentials are valid and that the schema from `docs/schema.sql` has been applied. Booking and contact submissions now rely on honeypot checks and rate limiting rather than CAPTCHA keys.

**Issue: Media upload errors from the admin panel**
> Verify that `SUPABASE_MEDIA_BUCKET` exists in Supabase Storage and that your `SUPABASE_SERVICE_ROLE_KEY` is valid.

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and include tests for new features where practical.

---

## 📄 License

This repository does not currently include a license file. If you plan to publish or share this project, add an appropriate `LICENSE` file first.

---

## 👤 Author

**Rasmirekha Swain**

---

<div align="center">
⭐ Star this repo if you found it helpful!
</div>
