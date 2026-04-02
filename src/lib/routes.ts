export type InternalRoute = 'properties' | 'listings' | 'rentals' | 'services' | 'blog' | 'contact' | 'faq' | 'about-us' | 'meet-the-team' | 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'gdpr' | 'sitemap';

/**
 * Maps user-facing SLUGS to internal route names.
 * - 'properties' / 'propiedades' -> unified page (sale + rent)
 * - 'listings'   / 'listados'    -> sales-only page
 * - 'rentals'    / 'alquiler'    -> rentals-only page
 */
export const routeMappings: Record<string, Record<string, InternalRoute>> = {
  en: {
    'properties': 'properties',
    'listings': 'listings',
    'rentals': 'rentals',
    'services': 'services',
    'blog': 'blog',
    'contact': 'contact',
    'faq': 'faq',
    'about-us': 'about-us',
    'meet-the-team': 'meet-the-team',
    'privacy-policy': 'privacy-policy',
    'terms-of-service': 'terms-of-service',
    'cookie-policy': 'cookie-policy',
    'gdpr': 'gdpr',
    'sitemap': 'sitemap'
  },
  es: {
    'propiedades': 'properties',
    'listados': 'listings',
    'alquiler': 'rentals',
    'servicios': 'services',
    'blog': 'blog',
    'contacto': 'contact',
    'faq': 'faq',
    'sobre-nosotros': 'about-us',
    'equipo': 'meet-the-team',
    'politica-privacidad': 'privacy-policy',
    'terminos-servicio': 'terms-of-service',
    'politica-cookies': 'cookie-policy',
    'rgpd': 'gdpr',
    'mapa-sitio': 'sitemap'
  }
};

/**
 * Maps internal route names to user-facing SLUGS
 */
export const reverseMappings: Record<string, Record<string, string>> = {
  en: {
    'properties': 'properties',
    'listings': 'listings',
    'rentals': 'rentals',
    'services': 'services',
    'blog': 'blog',
    'contact': 'contact',
    'faq': 'faq',
    'about-us': 'about-us',
    'meet-the-team': 'meet-the-team',
    'privacy-policy': 'privacy-policy',
    'terms-of-service': 'terms-of-service',
    'cookie-policy': 'cookie-policy',
    'gdpr': 'gdpr',
    'sitemap': 'sitemap'
  },
  es: {
    'properties': 'propiedades',
    'listings': 'listados',
    'rentals': 'alquiler',
    'services': 'servicios',
    'blog': 'blog',
    'contact': 'contacto',
    'faq': 'faq',
    'about-us': 'sobre-nosotros',
    'meet-the-team': 'equipo',
    'privacy-policy': 'politica-privacidad',
    'terms-of-service': 'terminos-servicio',
    'cookie-policy': 'politica-cookies',
    'gdpr': 'rgpd',
    'sitemap': 'mapa-sitio'
  }
};

/**
 * Returns the localized path prefix and slug for a given internal route.
 * @param lang Current language
 * @param internalPath The internal name (Spanish folder name)
 * @returns The localized URL path (e.g. /en/properties)
 */
export function getLocalizedPath(lang: string, internalPath: string): string {
  if (internalPath === '/' || internalPath === '') return `/${lang}`;
  
  // Strip leading slash if present
  const cleanPath = internalPath.startsWith('/') ? internalPath.slice(1) : internalPath;
  
  // Find the mapped localized slug
  const localizedSlug = reverseMappings[lang]?.[cleanPath] || cleanPath;
  
  return `/${lang}/${localizedSlug}`;
}
