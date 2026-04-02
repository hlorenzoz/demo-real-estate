import { MetadataRoute } from 'next';
import baseContent from '../../base-content.json';
import { Property } from '@/types/property';
import { getLocalizedPath, InternalRoute } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://demo-realestate.com';
  const languages = ['en', 'es'] as const;
  
  const staticPaths: InternalRoute[] = [
    'listings',
    'contact',
    'services',
    'about-us',
    'faq',
    'rentals',
    'blog'
  ];

  const routes: MetadataRoute.Sitemap = [];

  // 1. Home routes
  languages.forEach((lang) => {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`
        }
      }
    });
  });

  // 2. Static Routes
  staticPaths.forEach((path) => {
    languages.forEach((lang) => {
      const url = `${baseUrl}${getLocalizedPath(lang, path)}`;
      
      const alternatesMapping: Record<string, string> = {
        en: `${baseUrl}${getLocalizedPath('en', path)}`,
        es: `${baseUrl}${getLocalizedPath('es', path)}`,
      };

      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: alternatesMapping
        }
      });
    });
  });

  // 3. Dynamic Property Routes
  languages.forEach((lang) => {
    (baseContent.properties as Property[]).forEach((prop: Property) => {
      const propsPath: InternalRoute = 'listings';
      const url = `${baseUrl}${getLocalizedPath(lang, propsPath)}/${prop.id}`;
      
      const alternatesMapping: Record<string, string> = {
        en: `${baseUrl}${getLocalizedPath('en', propsPath)}/${prop.id}`,
        es: `${baseUrl}${getLocalizedPath('es', propsPath)}/${prop.id}`,
      };

      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: alternatesMapping
        }
      });
    });
  });

  return routes;
}
