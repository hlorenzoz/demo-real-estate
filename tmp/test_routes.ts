import { getLocalizedPath } from '../src/lib/routes';

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

console.log('--- LOCALIZED PATHS VERIFICATION ---');
langs.forEach(lang => {
  console.log(`\nLanguage: ${lang}`);
  staticPaths.forEach(path => {
    console.log(`${path} -> ${getLocalizedPath(lang, path)}`);
  });
});
