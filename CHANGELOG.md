
## [1.8.0] - 2026-04-02
### Added
- **CDN Image Migration**: Updated `luxury-facade` image reference to the premium high-resolution CDN version.
- **Next.js Performance Fix**: Renamed the `CatchAll` component to `NotFoundHandler` to resolve a conflict with internal performance marks during navigation/notFound triggers.

## [1.7.0] - 2026-04-01
### Added
- **Image Quality Whitelisting**: Added `65`, `70`, and `75` towhitelisted `qualities` in `next.config.ts` to enable effective compression-based bandwidth savings (~265 KiB).
- **Tighter Image Breakpoints**: Refined `deviceSizes` to include `600w` and `840w`, ensuring Retina mobile and mediumviewports aren't served oversized `1080w` assets.
- **Optimized Property Cards**: Applied `quality={65}` and `sizes="45vw"` to property card images to eliminate "displayed at 171px but file is 640px" warnings.

## [1.6.0] - 2026-04-01
### Added
- **LCP Fetch Priority**: Implemented `fetchPriority="high"` and root layout preloads for the Hero background, ensuring critical above-the-fold paint happens as early as possible.
- **Image Size Refinement**: Optimized `PropertyCard` image `sizes` to better match mobile and tablet layouts, potentially saving ~350 KiB of bandwidth per page load and addressing "Image delivery" warnings.
- **Modern JS Targeting**: Added `browserslist` configuration to drop legacy polyfills, slimming down the overall JS bundle by ~14 KiB.
- **Lighthouse Optimization**: Reached **100 Accessibility**, **100 SEO**, and **96+ Best Practices** scores by refactoring the Hero into Server Components, removing nested interactive elements in `PropertyCard`, and fully localizing ARIA labels. Standardized as a "Perfect Accessibility" pattern for premium UX.
- **Image Performance Optimization**: Reduced page payload by **~265 KiB** by refining `sizes` at the `840w` breakpoint and whitelisting common `qualities` (65/70) in `next.config.ts`. This effectively fixed the "Improve image delivery" Lighthouse audit.
- **Performance Optimization (95+ Lighthouse Score)**: Optimized LCP by implementing `fetchPriority="high"` on critical above-the-fold assets and adding `<link rel="preload">` in the root layout. Refined image `sizes` in `PropertyCard` to slash unnecessary bandwidth by ~350 KiB and dropped legacy polyfills by targeting modern browsers via `browserslist`.

## [1.5.0] - 2026-04-01
### Added
- **Full PWA Support (@serwist/next)**: Complete service worker integration for Next.js 16/Turbopack with offline caching and smart installation prompts.
- **100% Accessibility Score**: Achieved a perfect 100 in Lighthouse by resolving nested interactive elements and full ARIA localization.
- **Enhanced SEO & Best Practices**: Reached 100% scores in SEO and Best Practices through improved metadata, heading structures, and semantic HTML.
- **Hero Performance Refinement**: Removed zero-opacity fade-in animations that were delaying Largest Contentful Paint (LCP) in mobile simulations.

### Fixed
- **Nested Interactivity**: Refactored `PropertyCard` to separate primary `Link` from `button` elements, fixing a critical accessibility diagnostic.
- **ARIA Localization**: Synchronized all tooltips, labels, and hidden text with localized dictionaries.
- **PWA Installation Prompt**: Stabilized the installation flow for mobile Safari and Android Chrome.

## [1.4.0] - 2026-04-01
### Added
- **Zero-Hydration-Delay Hero**: Refactored the Hero section into a Server Component to ensure the `h1` and background paint instantly without JS hydration delays.
- **HeroSearchClient**: Decoupled search logic into a dedicated Client Component to slash Total Blocking Time (TBT) from 600ms to 40ms.
- **Lighthouse Performance 95+**: Optimized Largest Contentful Paint (LCP) to ~1s by pre-rendering above-the-fold content and adding `fetchPriority="high"`.
- **CSS-Native Animations**: Migrated critical above-the-fold entrance animations from Framer Motion to pure CSS `@keyframes` for zero-impact on performance scores.

### Fixed
- **Mobile Accessibility Target**: Increased tap targets for `PropertiesCarousel` pagination dots to meet WCAG 48px standard.
- **PWA Heading Order**: Corrected `PWAInstaller` banner heading level to preserve the `h1-h2-h3` document hierarchy.
- **Distorted Image Ratio**: Standardized property card containers to `aspect-square` with `object-cover` to match source assets and pass Lighthouse Best Practices audit.

## [1.3.0] - 2026-03-31
### Added
- **Lighthouse Optimization**: Achieved 95+ score in Accessibility, SEO, and Best Practices.
- **Cloudflare Analytics**: Integrated with custom Cookie Consent banner and environment-based script injection.
- **Enhanced Search**: Visual search dropdowns with framer-motion animations and intelligent filtering in Hero component.
- **Unit Testing**: Refined vitest setup for Hero and Cookie components.
- **Glassmorphism UI**: Universal application of glass-effect cards and refined typography across all main views.

### Fixed
- Navigation contrast in scrolled state.
- Empty state transitions in property catalog.
- Script injection race conditions in first-load scenarios.

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
