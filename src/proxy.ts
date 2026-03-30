import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routeMappings } from './lib/routes';

const locales = ['en', 'es'];
const defaultLocale = 'es';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Simple parser: check for 'en' or 'es' priority
  const preferredLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
  
  for (const locale of preferredLocales) {
    if (locales.includes(locale)) return locale;
    // Check for short versions like 'en' in 'en-US'
    const short = locale.split('-')[0];
    if (locales.includes(short)) return short;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/"); 
  const localeFromPath = segments[1]; 
  const slugFromPath = segments[2]; 


  // 1. Language detection and redirection if pathname HAS NO locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Ignore static assets and internally generated next paths
    if (
      pathname.includes('.') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api')
    ) return;

    // Redirect to default or detected locale
    const locale = getLocale(request);
    const newPath = `/${locale}${pathname === '/' ? '' : pathname}`;
    const url = new URL(newPath, request.url);
    return NextResponse.redirect(url);
  }

  // 2. Path localized rewriting (Virtual Slugs)
  // Example: /en/properties -> /en/propiedades
  // We handle requests like /[locale]/[slug]
  if (localeFromPath && slugFromPath && routeMappings[localeFromPath]) {
    const internalSlug = routeMappings[localeFromPath][slugFromPath];
    
    if (internalSlug) {
      if (internalSlug === slugFromPath) {
        return NextResponse.next();
      }

      const remainingPath = segments.slice(3).join('/');
      const destination = `/${localeFromPath}/${internalSlug}${remainingPath ? `/${remainingPath}` : ''}`;
      
      return NextResponse.rewrite(new URL(destination, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|.*\\..*).*)',
  ],
};
