import fs from 'node:fs';
import path from 'node:path';

export type Locale = 'en' | 'es';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary = Record<string, any>;

const VALID_LOCALES: Locale[] = ['en', 'es'];

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Validate locale to prevent errors when Next.js dynamic routes match assets (like favicon.ico)
  const safeLocale = VALID_LOCALES.includes(locale) ? locale : 'es';

  try {
    // We use fs.readFileSync to ensure we always get the LATEST version from disk
    // and bypass any module caching artifacts (especially with Turbopack)
    const filePath = path.join(process.cwd(), 'src', 'dictionaries', `${safeLocale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading dictionary for ${safeLocale}:`, error);
    
    // Final fallback to es
    try {
      const fallbackPath = path.join(process.cwd(), 'src', 'dictionaries', `es.json`);
      const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8');
      return JSON.parse(fallbackContent);
    } catch (fallbackError) {
      console.error('CRITICAL: Dictionary fallback failed.', fallbackError);
      return {};
    }
  }
};
