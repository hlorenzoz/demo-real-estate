import { MetadataRoute } from 'next';
import baseContent from '../../base-content.json';
import { Property } from '@/types/property';
import { getLocalizedPath, InternalRoute } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://demo-realestate.com';
  
  const langs = ['en', 'es'];
  
  const staticPaths: InternalRoute[] = [
    'propiedades',
    'contact',
    'vender',
    'about-us',
    'faq',
    'alquiler',
    'listings',
    'blog'
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate for homepages
  langs.forEach((lang) => {
    sitemap.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Generate for static paths
  langs.forEach((lang) => {
    staticPaths.forEach((path) => {
      sitemap.push({
        url: `${baseUrl}${getLocalizedPath(lang, path)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Generate dynamic pages (props)
  const propsPath = 'propiedades';
  langs.forEach((lang) => {
    (baseContent.properties as Property[]).forEach((prop) => {
      sitemap.push({
        url: `${baseUrl}${getLocalizedPath(lang, propsPath)}/${prop.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  return sitemap;
}
