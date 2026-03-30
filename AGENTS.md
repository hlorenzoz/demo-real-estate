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

## Task Overview
This project is a standardized boilerplate for high-converting real estate websites.

## Decisions
- **Properties Catalog**: Implemented a dynamic hub with filterable property listings and detail pages. Uses `base-content.json` as the local property database.
- **Asset Management**: High-resolution property images are generated in PNG and served locally from `public/images/` for immediate availability. Existing heritage assets are hosted on Cloudflare R2.
- **Localized Routing**: Implemented `getLocalizedPath(lang, slug)` pattern to translate internal Spanish slugs to English (e.g., `/properties`) in a type-safe way.
- **SEO Strategy**: Implemented JSON-LD structured data for every property detail page to improve indexability.

## Maintainers
- Antigravity AI (Primary Developer)
- Agency Owner (Quality Reviewer)
