# SPEC.md - Real Estate Template Technical Specification

## Core Stack
- **Next.js**: 16.2.1 (App Router)
- **Styling**: Tailwind CSS 4+ (using `@import "tailwindcss"`)
- **Language**: TypeScript + Bun
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`

## Mandatory Features Implementation

### 1. PWA & Mobile First
- Single embedded `favicon.svg` for browser and PWA.
- Floating `PWAInstaller` with luxury rounded corners.
- Manifest and Service Worker configured for standard branding.

### 2. SEO & GEO
- Metadata API in `layout.tsx`.
- JSON-LD Rich Results for `RealEstateAgent` (local coordinates).
- OpenGraph tags with luxury property previews.

### 3. Conversion Framework (7 Elements)
- **H1**: Value Prop highlighting local trust.
- **CTA**: Direct WhatsApp and "Ver Propiedades".
- **Social Proof**: GMB 5-star review carousel.
- **Form**: Sticky frictionless lead capture.

### 4. Quality & Testing
- Pre-commit hooks (`.pre-commit-config.yaml`) running Playwright E2E.
- TDD approach: Tests written for navigation and lead forms.
- Performance: 95%+ PageSpeed target (WebP assets + zero-unused-JS).

## Directory Structure
- `/src/app`: Root layouts and pages.
- `/src/components`: UI primitives (Navbar, Footer, Hero, PropertyCard, PWA).
- `/public/images`: Optimized WebP/PNG assets.
