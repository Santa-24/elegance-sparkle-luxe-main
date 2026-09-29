# 💎 Elegance Makeover & Academy — Complete Technical & Functional Architecture

> **Comprehensive Bit-by-Bit Project Summary & System Documentation**  
> **Brand:** Elegance Makeover & Academy (Founder: Rasmirekha Swain)  
> **Location:** Jajpur Road, Odisha, India  
> **Production Domain:** `https://elegancemakeover.makeup`  
> **Repository:** `elegance-sparkle-luxe-main`

---

## 📑 Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Complete Technology Stack Matrix](#2-complete-technology-stack-matrix)
3. [End-to-End Directory & File Architecture](#3-end-to-end-directory--file-architecture)
4. [Design System & Visual Aesthetics (Maison de Beauté v2)](#4-design-system--visual-aesthetics-maison-de-beaut%C3%A9-v2)
5. [Public Site Functionalities — Bit-by-Bit](#5-public-site-functionalities--bit-by-bit)
   - [5.1 Root Shell & Application Layout](#51-root-shell--application-layout)
   - [5.2 Home Page (`/`)](#52-home-page-)
   - [5.3 Multi-Step Interactive Booking Engine (`/booking`)](#53-multi-step-interactive-booking-engine-booking)
   - [5.4 Contact & Studio Location (`/contact`)](#54-contact--studio-location-contact)
   - [5.5 Beauty Services Menu (`/services`)](#55-beauty-services-menu-services)
   - [5.6 Bridal & Transformation Gallery (`/gallery`)](#56-bridal--transformation-gallery-gallery)
   - [5.7 Transparent Packages & Pricing Matrix (`/pricing`)](#57-transparent-packages--pricing-matrix-pricing)
   - [5.8 Promotional Offers & Countdown Engine (`/offers`)](#58-promotional-offers--countdown-engine-offers)
   - [5.9 Verified Client Reviews (`/testimonials`)](#59-verified-client-reviews-testimonials)
   - [5.10 Studio Heritage & Founder Story (`/about`)](#510-studio-heritage--founder-story-about)
   - [5.11 Categorized Knowledge FAQ (`/faq`)](#511-categorized-knowledge-faq-faq)
   - [5.12 Blog Hub & Deep-Dive Articles (`/blog`, `/blog/$slug`)](#512-blog-hub--deep-dive-articles-blog-blogslug)
   - [5.13 Local Regional SEO Hub (`/service-areas`)](#513-local-regional-seo-hub-service-areas)
   - [5.14 Dynamic XML Sitemap (`/sitemap.xml`)](#514-dynamic-xml-sitemap-sitemapxml)
6. [Admin Management Dashboard & CMS (Bit-by-Bit)](#6-admin-management-dashboard--cms-bit-by-bit)
   - [6.1 The 15 Core Admin Management Modules](#61-the-15-core-admin-management-modules)
   - [6.2 Reusable Admin UI Components](#62-reusable-admin-ui-components)
   - [6.3 Media Asset Upload System](#63-media-asset-upload-system)
7. [Database Schema & PostgREST Architecture](#7-database-schema--postgrest-architecture)
8. [Security, Authentication & Abuse Prevention](#8-security-authentication--abuse-prevention)
9. [SEO, Structured Data & Analytics Engine](#9-seo-structured-data--analytics-engine)
10. [Server Architecture & Production Deployment](#10-server-architecture--production-deployment)
11. [Environment Variables Dictionary](#11-environment-variables-dictionary)

---

## 1. Executive Overview

**Elegance Makeover & Academy** is a high-performance, full-stack web application designed for a luxury bridal makeover studio, beauty parlour, and certified makeup academy situated in Jajpur Road, Odisha. 

The application serves two synchronized ecosystems:
1. **A Public-Facing Luxury Web Application:** Engineered with an ultra-premium editorial design ("Maison de Beauté"), featuring full-bleed looping video backgrounds, an interactive 5-step bridal appointment booking engine with automatic WhatsApp confirmation bridges, live countdown promotions, category-filtered portfolio galleries with accessible lightboxes, transparent bridal package comparison matrices, and local SEO regional hubs.
2. **A Protected Full-Spectrum CMS & Admin Suite:** Providing complete operational control over client bookings, service menus, gallery portfolios, testimonials, promotional offers, advertisements, pricing tiers, website copy (Hero/About), contact settings, social channels, FAQ accordions, local service areas, and search engine metadata.

---

## 2. Complete Technology Stack Matrix

| Layer | Technology | Version | Purpose & Implementation Details |
|---|---|---|---|
| **Core Framework** | TanStack Start (`@tanstack/react-start`) | `^1.167.50` | Full-stack React SSR/SSG framework with route-driven server functions. |
| **Frontend Library** | React | `^19.2.0` | Latest React 19 rendering engine with enhanced concurrency. |
| **Routing** | TanStack Router (`@tanstack/react-router`) | `^1.168.25` | Type-safe filesystem routing, nested loaders, and route contexts. |
| **State & Data Fetching** | TanStack Query (`@tanstack/react-query`) | `^5.83.0` | Asynchronous cache, background revalidation, and server-state sync. |
| **Styling Engine** | Tailwind CSS 4 (`tailwindcss`, `@tailwindcss/vite`) | `^4.2.1` | Modern engine with CSS custom property bindings and theme utilities. |
| **Design Primitives** | Radix UI | Latest | Unstyled, accessible UI components (Dialog, Tabs, Accordion, Popover, Dropdown, Checkbox, Slider, etc.). |
| **Micro-Animations** | `tw-animate-css` | `^1.3.4` | Smooth transitions, keyframe animations, shimmer effects, and reveals. |
| **Form Handling** | React Hook Form | `^7.71.2` | High-performance uncontrolled form state management. |
| **Validation** | Zod | `^3.24.2` | Runtime type validation for forms, API payloads, and query parameters. |
| **Icons** | Lucide React | `^0.575.0` | Clean, customizable vector icons across client and admin panels. |
| **Database & CMS** | Supabase (PostgreSQL) | Remote REST | Managed PostgreSQL database, PostgREST API, and storage buckets. |
| **Charts** | Recharts | `^2.15.4` | Visual data representation for admin dashboard statistics. |
| **Notifications** | Sonner | `^2.0.7` | Rich toast notifications for user and admin feedback. |
| **Date Utilities** | `date-fns` & `react-day-picker` | `^4.1.0` / `^9.14.0` | Date manipulation, slot calculations, and interactive calendar pickers. |
| **Analytics & Telemetry** | Google Analytics 4 & Microsoft Clarity | Integrated | Page views, user journeys, click events, heatmaps, and session replays. |
| **Production Server** | Node.js HTTP Server (`server.mjs`) | Custom Native | Zero-dependency static file streamer with reverse-proxy SSR adapter. |

---

## 3. End-to-End Directory & File Architecture

```
elegance-sparkle-luxe-main/
├── .env / .env.example          # Environment variables template & configuration
├── bunfig.toml                  # Bun runtime package manager configurations
├── components.json              # UI component system metadata
├── design_system_audit.md       # Visual design and accessibility audit logs
├── eslint.config.js             # ESLint 9 flat configuration
├── package.json                 # Dependencies, scripts, and package metadata
├── server.mjs                   # High-efficiency native Node.js production server
├── tsconfig.json                # TypeScript compiler configuration with @ path aliases
├── vite.config.ts               # Vite 7 build configuration with TanStack Start plugin
│
├── docs/
│   └── schema.sql               # 1,290-line PostgreSQL database schema & initial seed
│
├── public/                      # Static assets served at the root
│   ├── assets/
│   │   ├── bridal-1.webp .. 11  # Real portfolio and bridal makeover imagery
│   │   ├── hero-bride.webp      # High-definition bridal hero image
│   │   ├── interior1.webp .. 4  # Salon interior and studio architecture photos
│   │   ├── logo.webp            # Brand insignia
│   │   ├── owner.webp           # Founder portrait (Rasmirekha Swain)
│   │   └── video/               # Cinematic luxury salon video (MP4)
│   ├── favicon.ico, .png, .svg  # Multi-platform favicons and app icons
│   ├── manifest.json            # Progressive Web App (PWA) manifest
│   ├── robots.txt               # Web crawler rules and sitemap pointer
│   └── browserconfig.xml        # Windows Metro tile definitions
│
└── src/
    ├── routeTree.gen.ts         # Automatically generated TanStack route tree
    ├── router.tsx               # Client router instantiation
    ├── server.ts                # TanStack Start SSR entry with security headers & error recovery
    ├── start.ts                 # Server middleware (CSRF protection & error wrappers)
    ├── styles.css               # Global design tokens, OKLCH colors, animations, & utilities
    │
    ├── admin/                   # Secure Admin Portal
    │   ├── admin.css            # Admin-specific styling and layout rules
    │   ├── AdminPage.tsx        # Master Admin Dashboard (2,000+ lines, 15 modules)
    │   ├── data.ts              # Appointment slots, default working hours & mock fallbacks
    │   ├── types.ts             # Admin TypeScript interfaces and data models
    │   ├── validators.ts        # Zod schemas for all admin forms and mutations
    │   ├── api/                 # Admin Server Functions (CRUD)
    │   │   ├── admin-audit.functions.ts         # Audit trail retrieval
    │   │   ├── admin-auth.functions.ts          # Admin authentication endpoints
    │   │   ├── admin-contacts.functions.ts      # Contact messages management
    │   │   ├── admin-content.functions.ts       # Core CMS content CRUD (1,000+ lines)
    │   │   ├── admin-customers.functions.ts     # Customer records & CRM preferences
    │   │   ├── admin-emails.functions.ts        # Email notification templates
    │   │   ├── admin-media.functions.ts         # Storage asset upload functions
    │   │   ├── admin-notifications.functions.ts # Admin system alerts
    │   │   ├── admin-session.ts                 # Session requirement wrapper
    │   │   └── admin-users.functions.ts         # Multi-role user administration
    │   └── components/          # Reusable Admin UI Components
    │       ├── BulkActionBar.tsx    # Multi-record selection and bulk actions
    │       ├── ModalDrawer.tsx      # Slide-out drawer & dialog editor
    │       ├── RecordTable.tsx      # Searchable, filterable, paginated data grid
    │       ├── SidebarNav.tsx       # Collapsible navigation drawer with live counts
    │       ├── StatCard.tsx         # Analytical KPI display cards
    │       └── StatusBadge.tsx      # Color-coded operational status chips
    │
    ├── components/              # Shared Application Components
    │   ├── seo/
    │   │   └── StructuredData.tsx   # JSON-LD Schema.org injector
    │   ├── site/
    │   │   ├── BrandLogo.tsx        # Animated brand mark with floating particles
    │   │   ├── CookieBanner.tsx     # GDPR/Privacy compliance banner
    │   │   ├── CountdownTimer.tsx   # Dynamic time-remaining ticker
    │   │   ├── FloatingActions.tsx  # Sticky WhatsApp and phone dialer quick buttons
    │   │   ├── Footer.tsx           # Luxury footer with quick links, legal, & socials
    │   │   ├── Navbar.tsx           # Responsive navigation bar with mobile drawer
    │   │   ├── SiteLayout.tsx       # Common site wrapper & PageHero component
    │   │   └── SkipLink.tsx         # Accessibility skip-to-content navigation
    │   └── ui/                  # Radix-powered accessible primitives
    │       ├── button.tsx           # Button with variant styling
    │       ├── input.tsx            # Form input field
    │       └── label.tsx            # Form label
    │
    ├── lib/                     # Core Business Logic & Infrastructure
    │   ├── analytics.ts         # Google Analytics 4 & Microsoft Clarity integration
    │   ├── error-capture.ts     # Global server error interception
    │   ├── error-page.ts        # Luxury 500 error page fallback HTML template
    │   ├── error-reporting.ts   # Client and server error logger
    │   ├── seo.ts               # Schema.org builders (LocalBusiness, Organization, etc.)
    │   ├── site-config.ts       # Public environment variable accessor
    │   ├── supabase.server.ts   # Direct PostgREST fetch client with service role
    │   ├── utils.ts             # Tailwind class merging utility (`cn`)
    │   ├── api/
    │   │   ├── bookings.functions.ts # Client booking submission server function
    │   │   └── contact.functions.ts  # Client contact submission server function
    │   ├── config/              # Server configuration loaders
    │   ├── content/             # CMS content providers & fallback datasets
    │   │   ├── blog.ts              # Curated blog articles
    │   │   ├── faq.ts               # Frequently asked questions catalog
    │   │   ├── live.functions.ts    # Server functions for public live content
    │   │   ├── live.server.ts       # Database fetchers with static fallback logic
    │   │   ├── service-areas.ts     # Regional service area definitions
    │   │   └── site-content.tsx     # Site content React Context provider
    │   ├── data/                # Static fallback business data
    │   │   ├── gallery.ts           # Fallback gallery photos
    │   │   ├── offers.ts            # Fallback promotional deals
    │   │   ├── services.ts          # Fallback service catalog
    │   │   └── testimonials.ts      # Fallback client testimonials
    │   ├── errors/              # Custom error capture & handlers
    │   ├── security/            # Application security utilities
    │   │   ├── abuse.ts             # Honeypot checks & local rate limiting
    │   │   ├── admin-auth.server.ts # Admin session management (SHA-256 HMAC)
    │   │   ├── audit.server.ts      # Operational audit logging to PostgreSQL
    │   │   └── rate-limit.server.ts # Distributed PostgreSQL-backed rate limiter
    │   └── utils/               # Formatting, string, array, & toast utilities
    │
    └── routes/                  # Route Definitions (TanStack Start)
        ├── __root.tsx           # HTML document root, Head tags, JSON-LD, Analytics
        ├── index.tsx            # Home Page (Hero video, Ads, Services, Gallery, etc.)
        ├── about.tsx            # Studio Story & Academy Page
        ├── admin.tsx            # Admin Portal Route
        ├── blog.tsx             # Blog Listing Page
        ├── blog.$slug.tsx       # Dynamic Blog Article Reader
        ├── booking.tsx          # 5-Step Online Booking Engine
        ├── contact.tsx          # Contact, Studio Map, & Inquiries Page
        ├── faq.tsx              # Frequently Asked Questions Page
        ├── gallery.tsx          # Filterable Portfolio Gallery & Lightbox
        ├── offers.tsx           # Active Discounts & Festive Deals Page
        ├── pricing.tsx          # Transparent Bridal Package Comparison Matrix
        ├── service-areas.tsx    # Local SEO Coverage Hub (Odisha districts)
        ├── services.tsx         # Complete Beauty & Academy Menu
        ├── sitemap[.]xml.ts     # Dynamic XML Sitemap Endpoint
        └── testimonials.tsx     # Client Reviews & Transformation Stories
```

---

## 4. Design System & Visual Aesthetics (Maison de Beauté v2)

The user interface follows a custom luxury aesthetic tailored for high-end bridal salons:

### 4.1 Color Architecture (OKLCH & Curated Tokens)
- **Deep Luxe Background:** `#0d0a07` (Warm luxury obsidian)
- **Card & Surface Background:** `#161009` (Warm antique bronze-black)
- **Primary Brand Gold:** `#c9a96e` (Refined metallic champagne gold)
- **Soft Gold Highlight:** `#d9c49e` (Pale gilded accent)
- **Accessible Text Gold:** `#c9a96e` (Meets WCAG AA 4.5:1 contrast ratio)
- **Marble White Foreground:** `#f9f5ef` / `#f5e6d0` (Soft alabaster text)
- **Muted Borders & Dividers:** `rgba(201, 169, 110, 0.2)` (Subtle hairline gold borders)
- **Editorial Flat Silhouette:** `--radius: 0rem` (Sharp, high-fashion magazine layout)

### 4.2 Typography Hierarchy
- **Display & Headings:** `Playfair Display` (Serif font expressing elegance, heritage, and luxury)
- **Body & Technical Text:** `Inter` (Sans-serif font optimized for legibility, form input, and micro-copy)

### 4.3 Custom CSS Micro-Interactions & Classes
- `.btn-luxe`: Shimmer button effect where an oblique light reflection sweeps across on hover with subtle vertical translation.
- `.gold-border`: Two-layer pseudo-element creating a gradient gold border stroke around featured package cards.
- `.tilt-card`: Hardware-accelerated 3D perspective tilt on hover (`perspective(1000px) rotateX(4deg)`).
- `.img-zoom`: Smooth 800ms image expansion (`scale(1.08)`) within masked boundaries.
- `.reveal` & `.img-reveal`: IntersectionObserver-driven scroll reveal animations that gracefully glide into view.
- `.brand-logo-shell`: Animated brand mark featuring orbital glow pulses (`pulse-glow`) and drifting star sparkles (`sparkle-drift`).

---

## 5. Public Site Functionalities — Bit-by-Bit

### 5.1 Root Shell & Application Layout (`src/routes/__root.tsx`)
- **Metadata Management:** Comprehensive OpenGraph, Twitter Card, and Google-compliant meta tags.
- **Dynamic Canonical URLs:** Automatic canonical link computation preventing duplicate URL penalties.
- **Embedded JSON-LD Schema:** Injects `Organization`, `WebSite`, and `LocalBusiness` structured data into every page header.
- **Analytics & Heatmap Scripting:** Conditional injection of Google Analytics 4 (`gtag.js`) and Microsoft Clarity tracking scripts.
- **Accessibility:** Built-in `SkipLink` component allowing keyboard/screen-reader users to skip straight to `#main-content`.
- **Fail-Safe Fallback:** Full-page 404 handler and catastrophic SSR error boundaries with router invalidation triggers.

### 5.2 Home Page (`src/routes/index.tsx`)
1. **Cinematic Hero Section:**
   - Full-viewport ambient video loop (`Cinematic_luxury_bridal_salon.mp4`).
   - Custom floating Play/Pause and Mute/Unmute audio control toggles.
   - Dual vertical gold rules framing the viewport.
   - Promotional alert chip (`"Now booking 2026 wedding season"`).
   - Trust statistics bar highlighting: **10+ Years Experience**, **500+ Happy Brides**, and **50+ Certified Students**.
2. **Dynamic Live Advertisement Showcase:**
   - Highlights active marketing campaigns, posters, and seasonal deals.
   - Interactive Lightbox with keyboard navigation (Esc, Arrow Left, Arrow Right).
3. **About Preview:** Founder portrait, credentials, and brand values.
4. **Curated Services Grid:** Quick-access cards for Bridal, Parlour, Facials, Hair, and Academy training with direct booking query params.
5. **Bridal Portfolio Showcase:** Curated transformation gallery.
6. **"Why Choose Us" Value Pillars:** Focus on international product lines, certified artistry, strict hygiene protocols, and transparent pricing.
7. **Offer Banner with Live Countdown:** Real-time day/hour/minute countdown ticker for current seasonal promotions.
8. **Testimonial Slider:** Authentic bride reviews and wedding experiences.
9. **Instagram Feed Grid:** Curated social showcase.
10. **Knowledge Hub:** Highlights top blog entries on bridal makeup and skincare routines.
11. **Local Coverage Strip:** Direct links to local service areas across Odisha.
12. **Contact & Booking Call-to-Action:** Direct quick-action buttons.

### 5.3 Multi-Step Interactive Booking Engine (`src/routes/booking.tsx`)
A guided 5-step wizard allowing clients to book appointments:
- **Step 1: Contact Details:** Full Name, Email, and Phone Number (enforced with Indian 10-digit mobile regex `^[6-9]\d{9}$`).
- **Step 2: Service Selection:** Dynamic dropdown populated from live CMS services (Bridal Makeup, Party Makeup, Facials, Hair Styling, Academy, etc.) with preselection via URL query parameter `?service=...`.
- **Step 3: Appointment Date & Time:**
  - Date picker restricted from today up to 6 months into the future.
  - Interactive time slots (10:00 AM, 11:30 AM, 1:00 PM, 2:30 PM, 4:00 PM, 5:30 PM, 7:00 PM).
  - Intelligent real-time filtering: Automatically disables time slots that have already elapsed today.
- **Step 4: Review & Special Requests:** Review card displaying entered data with an optional notes/requests text area.
- **Step 5: Automated Confirmation & WhatsApp Bridge:**
  - Submits to `createBookingRequest` server function.
  - Automatically generates a unique booking code (`EM-YYYYMMDD-XXXX` or fallback temporary code).
  - Launches a prefilled WhatsApp message to the studio's verified number (`+91 92652 00523`) with full booking specifics, allowing instant confirmation.
  - Security: Protected by a hidden anti-bot honeypot field.
  - SEO: Injects `FAQPage` JSON-LD schema into the page.

### 5.4 Contact & Studio Location (`src/routes/contact.tsx`)
- Direct contact details: Phone dialer, WhatsApp chat link, email link, and physical studio address.
- Interactive embedded Google Maps iframe centered on the studio in Jajpur Road.
- Inquiries Form with full validation and anti-bot honeypot (`website` field).
- Live Client-Side Rate Limit Countdown: Shows a live seconds ticker if rate limit is reached, preventing repeated submissions.
- Live CMS Fallback: Pulls real-time address and hours from Supabase or static fallbacks.

### 5.5 Beauty Services Menu (`src/routes/services.tsx`)
- Tabbed category filter: **All**, **Bridal**, **Parlour**, and **Academy**.
- Each service card presents: Title, Category badge, Price specification, Duration estimate, Detailed description, and a `"Book This Service"` deep-link button routing directly into the booking engine.
- Structured Data: Dynamic `ItemList` / `Service` schema for search engines.

### 5.6 Bridal & Transformation Gallery (`src/routes/gallery.tsx`)
- Filter categories: **All**, **Bridal**, **Parlour**, **Before & After**, and **Academy**.
- Responsive masonry grid with lazy loading and hover zoom transitions.
- Fullscreen Lightbox viewer featuring:
  - High-resolution modal image rendering.
  - Next / Previous navigation buttons.
  - Keyboard listeners (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate).
  - Accessible focus trap keeping navigation within the active modal.

### 5.7 Transparent Packages & Pricing Matrix (`src/routes/pricing.tsx`)
- Side-by-side bridal package cards (e.g., HD Bridal, Airbrush Deluxe, Royal Bridal Suite).
- Highlighted "Most Popular" card with a glowing gold border.
- Comprehensive Feature Comparison Matrix mapping features across all tiers (Pre-bridal facial, Hair styling, Draping, HD Airbrush, Lashes, Touch-up kit).
- Direct booking action buttons prefilling the selected package.
- Structured Data: Injects `ItemList` / `UnitPriceSpecification` schemas.

### 5.8 Promotional Offers & Countdown Engine (`src/routes/offers.tsx`)
- Displays live seasonal deals (e.g., Wedding Early Bird, Festival Combos).
- Integrated `CountdownTimer` calculating remaining days, hours, and minutes until offer expiration.
- Offer code badges, discount tags, validity terms, and terms of use.
- Structured Data: `OfferCatalog` schema for Google Rich Snippets.

### 5.9 Verified Client Reviews (`src/routes/testimonials.tsx`)
- Verified customer testimonials with 5-star ratings.
- Service tags specifying which makeover was performed.
- Wedding date badges (Month/Year) verifying authentic bridal experiences.

### 5.10 Studio Heritage & Founder Story (`src/routes/about.tsx`)
- Founder profile of **Rasmirekha Swain**, 10+ years of bridal artistry, certifications, and academy training philosophy.
- Studio Interior Gallery featuring four high-resolution photos of the salon.
- Certified Academy information: Placement assistance, hands-on practice, and international curriculum.
- Editorial "Marble White" background layout (`.marble-bg`).

### 5.11 Categorized Knowledge FAQ (`src/routes/faq.tsx`)
- Expandable Radix Accordion grouped into logical categories:
  - **Bridal Makeups & Trials** (Advance booking periods, trial sessions, skin prep).
  - **Parlour & Skin Treatments** (Hydra facials, hair smoothening, organic products).
  - **Academy Courses** (Duration, certification, syllabus, kits provided).
  - **Payments & Policies** (Advance deposits, cancellation terms, travel policies).

### 5.12 Blog Hub & Deep-Dive Articles (`src/routes/blog.tsx`, `src/routes/blog.$slug.tsx`)
- Searchable blog feed with category filters (**Bridal Tips**, **Skincare**, **Academy**, **Trending**).
- Article metadata: Read time estimates, publication dates, author attribution, and tag taxonomy.
- Individual article reader (`blog.$slug.tsx`) with formatted typography, breadcrumbs, social sharing triggers, and related articles.
- Structured Data: Complete `Article` schema with author and publisher credentials.

### 5.13 Local Regional SEO Hub (`src/routes/service-areas.tsx`)
- Dedicated local landing hub specifically targeting search traffic across Odisha:
  - **Jajpur Road (Vyasanagar)**
  - **Danagadi & Kalinganagar**
  - **Panikoili & Kuakhia**
  - **Jajpur Town**
  - **Bhadrak, Cuttack & Bhubaneswar**
- Local geo-coordinates, distance from studio, specialized service availability, and `LocalBusiness` / `Place` schema markup.

### 5.14 Dynamic XML Sitemap (`src/routes/sitemap[.]xml.ts`)
- Server-side XML generator dynamically queried on request.
- Combines static paths (`/`, `/about`, `/services`, `/pricing`, `/gallery`, `/offers`, `/testimonials`, `/contact`, `/booking`, `/blog`, `/faq`, `/service-areas`) with all live published blog post URLs (`/blog/:slug`).
- Sets `<changefreq>weekly</changefreq>` and prioritized indexing weights (`1.0` for home, `0.8` for inner pages).

---

## 6. Admin Management Dashboard & CMS (Bit-by-Bit)

Accessible at `/admin`, the administrative suite gives the business owner full control over the website without touching code.

### 6.1 The 15 Core Admin Management Modules

1. **Bookings Management:**
   - Filter by status (**Pending**, **Approved**, **Rejected**, **Rescheduled**, **Completed**, **Cancelled**).
   - Search by customer name, phone number, or booking code.
   - Status transitions with automated audit logging.
   - View customer notes, requested date, time, and service.
   - Bulk status updates and deletion capabilities.
2. **Services Catalog:**
   - Full CRUD (Create, Read, Update, Delete) for beauty treatments and packages.
   - Title, Category (Bridal, Parlour, Academy), Price Label, Duration, Featured flag, and Active toggle.
3. **Gallery Portfolio:**
   - Upload new makeover photographs directly into Supabase Storage.
   - Assign categories (Bridal, Parlour, Before & After, Academy), alt text, and sort order.
4. **Testimonials CMS:**
   - Manage client reviews, ratings (1 to 5 stars), service tags, and display status (Visible vs Draft).
5. **Promotional Offers:**
   - Create discount campaigns, validity date ranges, banner copy, and activation statuses (Scheduled, Active, Expired).
6. **Pricing Packages:**
   - Configure tiered packages, price points, feature lists, and the "Popular" visual highlight badge.
7. **Advertisements & Seasonal Campaigns:**
   - Manage digital posters and banners, date ranges, and homepage modal triggers.
8. **Hero Content Editor:**
   - Live copy updates for the primary homepage headline, subheadings, and CTA button destinations.
9. **About Content Editor:**
   - Update founder story, biography, studio photos, and mission bullet points.
10. **Contact Settings:**
    - Live updates for phone numbers, WhatsApp lines, email addresses, studio opening hours, and Google Maps embed URL.
11. **Social Links Manager:**
    - Update Instagram, Facebook, YouTube, and other brand social profiles.
12. **FAQ Sections Manager:**
    - Add, edit, reorder, or delete questions and answers across all categories.
13. **Service Areas Manager:**
    - Manage regional landing page copy, target towns, and local SEO keywords.
14. **SEO & Metadata Settings:**
    - Update global page titles, meta descriptions, OpenGraph social preview images, and canonical defaults.
15. **Customer Preferences & CRM:**
    - View client history, frequent services, contact details, and custom notes.

### 6.2 Reusable Admin UI Components
- **`SidebarNav.tsx`:** Collapsible navigation sidebar displaying all 15 sections with live pending badge indicators.
- **`StatCard.tsx`:** Dashboard metrics showing total bookings, pending approvals, active services, and live campaigns.
- **`RecordTable.tsx`:** High-performance data table with client-side search, multi-column sorting, pagination, and action menus.
- **`ModalDrawer.tsx`:** Slide-over modal drawer providing responsive form editing without page reloads.
- **`StatusBadge.tsx`:** Uniform color-coded badges for booking and record statuses.
- **`BulkActionBar.tsx`:** Action toolbar appearing when multiple rows are checked, enabling batch operations.

### 6.3 Media Asset Upload System (`src/admin/api/admin-media.functions.ts`)
- Direct integration with Supabase Storage bucket (`cms-media`).
- Validates file signatures, file sizes, and MIME types.
- Auto-generates clean, timestamped filenames and returns CDN public URLs ready for instant use across gallery and service records.

---

## 7. Database Schema & PostgREST Architecture

Defined in `docs/schema.sql`, the PostgreSQL database is organized into 23 core tables:

### Core Tables & Purposes
- `admin_users`: Stores administrator profiles, auth IDs, emails, and roles (`super_admin`, `admin`, `editor`).
- `users`: Staff and system user directory.
- `services`: Complete menu of beauty services, pricing, duration, and categories.
- `gallery`: Portfolio images, alt text, categories, and display order.
- `testimonials`: Client feedback, star ratings, and publication status.
- `offers`: Promotional discount banners and validity timestamps.
- `advertisements`: Marketing creatives, posters, formats, and schedules.
- `bookings`: Operational client bookings, requested slots, statuses, and contact numbers.
- `contact_messages`: Inquiries submitted via the public contact form.
- `rate_limits`: Distributed tracking table recording hashed IP addresses and expiration timestamps.
- `audit_logs`: Immutable security audit trail recording every administrative mutation.
- `notifications`: Internal admin alert messages.
- `customer_preferences`: Client CRM notes and beauty preferences.
- `email_templates`: Transactional email templates.
- `hero_content`: Homepage hero headlines and CTA copy.
- `about_content`: Studio heritage, founder biography, and bullet points.
- `contact_settings`: Phone, email, address, working hours, and map embeds.
- `social_links`: Social media URLs.
- `seo_settings`: Search engine metadata and OpenGraph defaults.
- `pricing_packages`: Tiered pricing bundles and feature lists.
- `service_areas`: Regional towns, local summaries, and target locations.
- `blog_categories`, `blog_authors`, `blog_posts`: Complete publishing CMS for beauty articles.

### Architectural Highlights
- **PostgREST Direct Client:** The server uses direct REST requests (`/rest/v1/`) with the Supabase Service Role key, eliminating heavy SDK overhead and ensuring instant execution.
- **Triggers & Indexes:** Automated `touch_updated_at()` PL/pgSQL triggers maintain accurate timestamps across all tables. Indexes cover foreign keys, lookup slugs, active flags, and auth IDs.
- **Row Level Security (RLS):** Strict policies ensure public clients can only read published content, while writes require service-role or verified admin credentials.

---

## 8. Security, Authentication & Abuse Prevention

### 8.1 HTTP Security Headers (`src/server.ts`)
Every response is wrapped with production-grade headers:
- `Content-Security-Policy`: Restricts script, style, image, font, and frame sources.
- `X-Frame-Options: DENY`: Prevents clickjacking attacks.
- `X-Content-Type-Options: nosniff`: Prevents MIME-type confusion attacks.
- `Referrer-Policy: strict-origin-when-cross-origin`: Protects referrer information.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`: Disables unneeded hardware APIs.
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`: Forces HTTPS in production.

### 8.2 CSRF Protection (`src/start.ts`)
- Automated CSRF middleware validates all server function calls (`createServerFn`).

### 8.3 Role-Based Admin Authentication (`src/lib/security/admin-auth.server.ts`)
- **Credentials Validation:** Verified against server environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
- **Encrypted Session Cookies:** Session token signed with an HMAC SHA-256 hash using a composite of three separate secrets: `SESSION_SECRET`, `ADMIN_SESSION_SECRET`, and `JWT_SECRET`.
- **Cookie Security:** `HttpOnly`, `SameSite=Strict`, `Secure` in production, path `/`.
- **Role Hierarchy:** Enforces permission levels: `super_admin` > `admin` > `editor`.

### 8.4 Distributed Rate Limiting (`src/lib/security/rate-limit.server.ts`)
- Public endpoints (bookings, contact submissions) are rate-limited.
- Client IP addresses are hashed using SHA-256 (`hashIp`) before database lookup, preserving client privacy while preventing abuse.
- Automatically clears expired rate limit records on each check.

### 8.5 Anti-Bot Honeypot Protection (`src/lib/security/abuse.ts`)
- Contact and booking forms include hidden fields (`website`, `honeypot`) that are invisible to real users.
- Automated bot submissions that populate these fields are instantly rejected on the server.

### 8.6 Audit Logging (`src/lib/security/audit.server.ts`)
- Every administrative action (login, logout, create, update, delete, publish, status change) writes an immutable record to the `audit_logs` table with user ID, resource type, resource ID, and mutation metadata.

---

## 9. SEO, Structured Data & Analytics Engine

### 9.1 Comprehensive Schema.org JSON-LD Types
- `Organization`: Brand identity, logo, and canonical site links.
- `WebSite`: Search engine discovery metadata.
- `BeautySalon` / `LocalBusiness`: Studio geo-coordinates (`20.9507° N, 86.1378° E`), address (`755019`), opening hours (`Mo-Sa 09:00-19:00, Su 10:00-17:00`), price range (`₹₹`), and phone.
- `OfferCatalog` & `Offer`: Individual bridal and salon service prices in INR.
- `FAQPage`: Questions and answers on booking and beauty services.
- `Article`: Full blog post metadata with author attribution.
- `BreadcrumbList`: Hierarchical navigational trails on inner pages.

### 9.2 Analytics Integration (`src/lib/analytics.ts`)
- **Google Analytics 4 (GA4):** Automatic pageview tracking on route changes (`trackPageView`) and custom conversion events (`booking_submit`, `booking_cta_click`, `service_cta_click`).
- **Microsoft Clarity:** Visual heatmaps and session recordings for UX optimization.

---

## 10. Server Architecture & Production Deployment

### 10.1 Build Outputs
When running `npm run build`, Vite produces two specialized bundles:
- `dist/client/`: Optimized static assets (HTML, CSS, JS bundles, images).
- `dist/server/`: Server-side rendering bundle (`server.js`) containing compiled TanStack Start handlers.

### 10.2 Production Server (`server.mjs`)
A lightweight, high-performance Node.js HTTP server:
- **Zero-Dependency Static Asset Streaming:** Efficiently serves client assets with `Cache-Control: public, max-age=31536000, immutable`.
- **Web Standard Request Translation:** Converts incoming Node `http.IncomingMessage` requests into standard Web `Request` objects and streams back the Web `Response`.
- **Resilient Error Recovery:** Traps uncaught exceptions and unhandled rejections, rendering a branded luxury 500 error page if an unhandled failure occurs.
- **Graceful Shutdown:** Listens for `SIGTERM` and `SIGINT` signals, ensuring active client connections finish cleanly before terminating.

---

## 11. Environment Variables Dictionary

| Variable Name | Required | Default / Example | Purpose |
|---|---|---|---|
| `ADMIN_EMAIL` | **Yes** | `elegancemakeover.2021@gmail.com` | Verified administrator email for dashboard login. |
| `ADMIN_PASSWORD` | **Yes** | `[Secure Password]` | Password for admin dashboard authentication. |
| `ADMIN_ROLE` | No | `super_admin` | Default role assigned upon login (`super_admin`, `admin`, `editor`). |
| `ADMIN_SESSION_SECRET` | **Yes** | `[Random 64-char string]` | Secret used to sign admin session cookies. |
| `SESSION_SECRET` | **Yes** | `[Random 64-char string]` | Secondary salt for session encryption. |
| `JWT_SECRET` | **Yes** | `[Random 64-char string]` | Server-side security token signing key. |
| `SUPABASE_URL` | **Yes** | `https://xxxx.supabase.co` | Supabase project REST API endpoint. |
| `SUPABASE_ANON_KEY` | **Yes** | `eyJhbGci...` | Supabase public anonymous API key. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | `eyJhbGci...` | Supabase privileged server key for backend operations. |
| `SUPABASE_MEDIA_BUCKET` | No | `cms-media` | Storage bucket name for admin media uploads. |
| `VITE_SITE_URL` | No | `https://elegancemakeover.makeup` | Canonical base URL used for SEO tags and sitemaps. |
| `VITE_SITE_NAME` | No | `Elegance Makeover & Academy` | Public brand name. |
| `VITE_CONTACT_PHONE` | No | `+91 92652 00523` | Public business telephone number. |
| `VITE_WHATSAPP_NUMBER` | No | `919265200523` | WhatsApp number for direct booking redirects. |
| `VITE_CONTACT_EMAIL` | No | `elegancemakeover.2021@gmail.com` | Public contact email address. |
| `VITE_CONTACT_ADDRESS` | No | `Jajpur Road, Odisha, India` | Physical studio address displayed in footer and schema. |
| `VITE_CONTACT_HOURS` | No | `Mon - Sat: 9AM - 7PM, Sun: 10AM - 5PM` | Business opening hours. |
| `VITE_GA4_ID` | No | `G-XXXXXXXXXX` | Google Analytics 4 Measurement ID. |
| `VITE_CLARITY_ID` | No | `[Clarity Project ID]` | Microsoft Clarity project identifier. |
| `VITE_INSTAGRAM_URL` | No | `https://www.instagram.com/rasmirekha2011` | Official Instagram profile link. |
| `VITE_FACEBOOK_URL` | No | `https://www.facebook.com/share/1FhWXcqbUY/` | Official Facebook page link. |

---

## 🏁 Summary

The **Elegance Makeover & Academy** codebase represents a state-of-the-art implementation of modern web engineering:
- Built with **React 19**, **TanStack Start**, and **Tailwind CSS 4**.
- Delivers an unforgettable luxury aesthetic ("Maison de Beauté v2") with hardware-accelerated video heroes, 3D perspective tilts, and champagne gold palettes.
- Features a full **5-Step Booking Engine** integrated directly with **WhatsApp**.
- Backed by an all-inclusive **15-module Admin CMS** powered by **Supabase PostgreSQL**.
- Fortified by **distributed rate limiting**, **honeypot spam guards**, **role-based authentication**, **audit trails**, and **CSP security headers**.
- Optimized for **local Odisha search visibility** with structured Schema.org markup and dynamic XML sitemaps.
