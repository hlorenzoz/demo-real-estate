export const routeMappings: Record<string, Record<string, string>> = {
  en: {
    'properties': 'propiedades',
    'contact': 'contact',
    'sell': 'vender',
    'about-us': 'about-us',
    'faq': 'faq',
    'rentals': 'alquiler',
    'blog': 'blog'
  },
  es: {
    'propiedades': 'propiedades',
    'contactar': 'contact',
    'vender': 'vender',
    'nosotros': 'about-us',
    'faq': 'faq',
    'alquiler': 'alquiler',
    'blog': 'blog'
  }
};

export const reverseMappings: Record<string, Record<string, string>> = {
  en: Object.fromEntries(Object.entries(routeMappings.en).map(([k, v]) => [v, k])),
  es: Object.fromEntries(Object.entries(routeMappings.es).map(([k, v]) => [v, k]))
};

export type InternalRoute = 'propiedades' | 'contact' | 'vender' | 'about-us' | 'blog' | 'faq' | 'page' | 'alquiler';

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
