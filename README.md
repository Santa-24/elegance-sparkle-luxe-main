# Elegance Makeover & Academy

Premium bridal makeup, beauty parlour, and academy website for Elegance Makeover & Academy in Jajpur Road, Odisha.

## Overview

This project includes:

- A public marketing site
- A booking and contact flow
- A private admin dashboard
- Supabase-backed content management
- SEO metadata, sitemap, and structured data
- A Render-ready Node server wrapper for production deployment

## Tech Stack

- TanStack Start
- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Supabase

## Features

- Home, about, services, gallery, pricing, booking, contact, FAQ, blog, offers, testimonials, and service areas pages
- Admin dashboard for services, gallery, bookings, offers, pricing, blog content, SEO, and settings
- Honeypot-based spam protection on forms
- Server-side admin authentication using environment variables

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npm run format
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill in the values.

3. Apply `docs/schema.sql` to your Supabase project.

4. Start the dev server:

```bash
npm run dev
```

## Environment Variables

Required:

- `ADMIN_SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `JWT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:

- `SUPABASE_MEDIA_BUCKET`
- `VITE_SITE_URL`
- `VITE_SITE_NAME`
- `VITE_CONTACT_PHONE`
- `VITE_CONTACT_EMAIL`
- `VITE_CONTACT_ADDRESS`
- `VITE_CONTACT_HOURS`
- `VITE_WHATSAPP_NUMBER`
- `VITE_ADMIN_EMAIL`
- `VITE_GA4_ID`
- `VITE_CLARITY_ID`
- `VITE_INSTAGRAM_URL`
- `VITE_FACEBOOK_URL`

## Production Build

```bash
npm install && npm run build
```

Build output:

- `dist/client`
- `dist/server/server.js`

## Render Deployment

Use a Render Web Service with:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Root Directory: leave blank
- Branch: `main`

`npm start` runs `server.mjs`, which opens an HTTP server on `process.env.PORT || 3000`, serves static assets from `dist/client`, and forwards SSR requests to TanStack Start.

## Database

The schema lives in `docs/schema.sql` and includes tables for:

- `admin_users`
- `services`
- `gallery`
- `testimonials`
- `offers`
- `advertisements`
- `bookings`
- `contact_messages`
- `pricing_packages`
- `hero_content`
- `about_content`
- `contact_settings`
- `social_links`
- `seo_settings`
- `service_areas`
- `blog_posts`
- `blog_categories`
- `blog_authors`
- `rate_limits`
- `audit_logs`
- `notifications`
- `customer_preferences`
- `email_templates`

## Troubleshooting

### App exits early on Render

Use `npm start` as the Start Command. Do not start the app with `node dist/server/server.js` directly on Render, because that file is a fetch handler and not a listening HTTP server.

### Admin login fails

Check `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SESSION_SECRET`, and `JWT_SECRET`.

### Booking or contact forms fail

Check the Supabase environment variables and ensure `docs/schema.sql` has been applied.

### Media uploads fail

Check `SUPABASE_MEDIA_BUCKET` and `SUPABASE_SERVICE_ROLE_KEY`.

## License

This project was built as a custom client engagement.
