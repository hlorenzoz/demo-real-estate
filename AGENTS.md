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
- **Performance Optimization (95+ Lighthouse Score)**: Optimized LCP by implementing `fetchPriority="high"` on critical above-the-fold assets and adding `<link rel="preload">` in the root layout. Refined image `sizes` in `PropertyCard` to slash unnecessary bandwidth by ~350 KiB and dropped legacy polyfills by targeting modern browsers via `browserslist`.

## Maintainers
- Antigravity AI (Primary Developer)
- Agency Owner (Quality Reviewer)
