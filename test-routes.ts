import { getLocalizedPath } from './src/lib/routes';

const baseUrl = 'https://demo-realestate.com';
const langs = ['en', 'es'];
const staticPaths = [
  'propiedades',
  'contact',
  'vender',
  'about-us',
  'faq',
  'alquiler',
  'listings',
  'blog'
];

console.log('--- Static Paths ---');
langs.forEach((lang) => {
  staticPaths.forEach((path) => {
    console.log(`${lang} - ${path}: ${baseUrl}${getLocalizedPath(lang, path)}`);
  });
});

console.log('--- Property Pages ---');
const propsPath = 'propiedades';
langs.forEach((lang) => {
  console.log(`${lang} - ${propsPath} base: ${baseUrl}${getLocalizedPath(lang, propsPath)}`);
});
