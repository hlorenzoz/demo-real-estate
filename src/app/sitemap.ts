import { MetadataRoute } from 'next';
import baseContent from '../../base-content.json';
import { Property } from '@/types/property';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://demo-realestate.com';
  
  const langs = ['en', 'es'];
  
  const staticPaths = [
    '',
    '/propiedades',
    '/rentals',
    '/about-us',
    '/meet-the-team',
    '/contact',
    '/terms-of-service',
    '/privacy-policy',
    '/cookie-policy',
    '/gdpr',
    '/sitemap',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate for static paths
  langs.forEach((lang) => {
    staticPaths.forEach((path) => {
      sitemap.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
      });
    });
  });

  // Generate dynamic pages (props)
  langs.forEach((lang) => {
    (baseContent.properties as Property[]).forEach((prop) => {
      sitemap.push({
        url: `${baseUrl}/${lang}/propiedades/${prop.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  return sitemap;
}
