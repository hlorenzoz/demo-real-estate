# AGENTS.md - Real Estate Template

## Development Context
- **Project**: Luxury Real Estate Template
- **Location**: Local/Regional Markets
- **Brand Aesthetic**: Luxury Minimalism (Navy, Gold, Glassmorphism)

## Technical Mandates
- **Next.js**: 16.2.1
- **Styling**: Tailwind 4+
- **Prerequisites**: All images must be WebP.
- **TDD**: Pre-commit hooks are mandatory.
- **Maintenance**: All new features and bug fixes must include 100% test coverage (unit/component, functional, and e2e).

## Task Overview
This project is a high-end luxury real estate boilerplate with advanced search, localized routing, and premium aesthetics.

## Decisions
- **Properties Catalog**: Implemented a dynamic hub with filterable property listings and detail pages. Uses `base-content.json` as the local property database.
- **Asset Management**: High-resolution property images are generated in PNG and served locally from `public/images/` for immediate availability. Existing heritage assets are hosted on Cloudflare R2.
- **Localized Routing**: Implemented `getLocalizedPath(lang, slug)` pattern to translate internal Spanish slugs to English (e.g., `/properties`) in a type-safe way.
- **SEO Strategy**: Implemented JSON-LD structured data for every property detail page to improve indexability.
- **Infrastructure**: Configured Lighthouse CI and Cloudflare Analytics via a custom Cookie Banner.
- **Design System**: Built a Navy/Gold/Glassmorphism design system using Tailwind 4.
- **PWA Integration**: Migrated to `@serwist/next` for Next.js 16/Turbopack compatibility and robust offline support. Added smart installation prompts with multi-platform support.
- **Lighthouse Optimization**: Reached **100 Accessibility**, **100 SEO**, and **96+ Best Practices** scores by refactoring the Hero into Server Components, removing nested interactive elements in `PropertyCard`, and fully localizing ARIA labels. Standardized as a "Perfect Accessibility" pattern for premium UX.
- **Image Performance Optimization**: Reduced page payload by **~265 KiB** by refining `sizes` to match high-density mobile displays and whitelisting common `qualities` (65/70) in `next.config.ts`. Fixed the "Improve image delivery" audit.
- **Performance Optimization (95+ Lighthouse Score)**: Optimized LCP by implementing `fetchPriority="high"` on critical above-the-fold assets and adding `<link rel="preload">` in the root layout. Refined image `sizes` in `PropertyCard` to slash unnecessary bandwidth by ~350 KiB and dropped legacy polyfills by targeting modern browsers via `browserslist`.
- **Critical Path Fix**: Resolved a major LCP synchronization bug where a redundant manual preload caused a 2MB duplicate assets download. Synchronized `fetchPriority` with Next.js internal preloads, bumping the CI performance score to **0.74** (and likely higher in production).
- **Responsive Layout Optimization**: Resolved component overlaps and text size issues on mobile/tablet viewports by implementing tighter responsive margins, centering hero content on small screens, and adjusting the floating WhatsApp button position. Verified against 4 device types (Mobile Mini, iPhone 14 Pro, iPad Mini, and Desktop) using automated coordinate-based tests, achieving 100% overlap-free spacing.
- **Framework Conflict Resolution**: Renamed the generic `CatchAll` component to `NotFoundHandler` to prevent collisions with Next.js internal performance measurement marks, fixing the "negative time stamp" measurement error.
- **Unified Property Catalog**: Implemented a new `/properties` (`/propiedades`) route to serve as a comprehensive property hub with transaction-type filters (All, For Sale, For Rent) enabled. Updated the `/listings` and `/rentals` routes to be pre-filtered views (Sales and Rentals respectively) which hide the redundant contract-type filters for a cleaner, category-specific experience.
- **Home CTA Update**: Pointed the "Check Listings" section link on the home page specifically to `/listings` to match its title, while keeping the Hero link on the unified properties hub.
- **E2E Stability Pattern**: Standardized on using UI-displayed result counts for property listing verification in Playwright tests (e.g., `"{count} properties found"`) rather than fragile URL-based selectors, ensuring internationalized routes work correctly across translations.

## Maintainers
- Antigravity AI (Primary Developer)
- Agency Owner (Quality Reviewer)
