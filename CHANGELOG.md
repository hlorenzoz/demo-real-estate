# CHANGELOG.md - Real Estate Template

## [1.2.0] - 2026-03-29
### Added
- English Localization: Fully translated routes (/properties, /rentals, /contact, etc.).
- `getLocalizedPath` utility for type-safe route translations.
- "Featured Rentals" section on Home page with scrollable carousel.
- Local property assets (property-10.png to property-13.png) in `public/images/`.
- 2 additional Sales properties for better carousel navigation.

### Fixed
- Carousel navigation arrows visibility and positioning (Top Right).
- Property detail breadcrumbs and "Back to catalog" links for English users.
- Home page Sales Carousel content threshold (requires > 3 items).

## [0.2.0] - 2026-03-29
### Added
- Initial project scaffolding with Next.js 16+ and Tailwind 4+.
- High-converting Home Page with 7-element framework.
- Luxury Design System (Midnight Navy & Gold).
- JSON-LD `RealEstateAgent` schema for local SEO optimization.
- PWA manifest and standardized `favicon.svg`.
- Playwright E2E tests for responsive and conversion paths.
- Project-specific `.pre-commit-config.yaml` for TDD enforcement.

## [0.2.0] - 2026-03-29
### Added
- **Properties Catalog Hub**: Dynamic filtering by type and featured status.
- **Dynamic Property Detail Pages**: SEO-optimized with JSON-LD and structured content.
- **Hyper-Realistic Assets**: 6 high-quality real estate properties generated via Nano Banana Pro and hosted on Cloudflare R2.
- **Global Navigation**: Integrated "Propiedades" catalog into Navbar and Home page CTAs.
- **Type Safety**: Full TypeScript coverage for property data and localized dictionaries.
