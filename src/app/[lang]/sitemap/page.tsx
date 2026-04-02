import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/MotionWrapper";
import { getDictionary, Locale } from "@/get-dictionary";
import baseContentRaw from "../../../../base-content.json";
import { Property } from "@/types/property";
import Link from "next/link";
import { getLocalizedPath, InternalRoute } from "@/lib/routes";

const baseContent = baseContentRaw as { properties: Property[] };

export default async function sitemapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const mainPages = [
    { name: lang === 'es' ? 'Inicio' : 'Home', path: 'home' },
    { name: lang === 'es' ? 'Propiedades' : 'Properties', path: 'listings' },
    { name: lang === 'es' ? 'Alquileres' : 'Rentals', path: 'rentals' },
    { name: lang === 'es' ? 'Sobre Nosotros' : 'About Us', path: 'about-us' },
    { name: lang === 'es' ? 'Blog' : 'Blog', path: 'blog' },
    { name: lang === 'es' ? 'Contacto' : 'Contact', path: 'contact' },
  ];

  const legalPages = [
    { name: lang === 'es' ? 'Aviso Legal' : 'Terms of Service', path: 'terms-of-service' },
    { name: lang === 'es' ? 'Privacidad' : 'Privacy Policy', path: 'privacy-policy' },
    { name: lang === 'es' ? 'Cookies' : 'Cookie Policy', path: 'cookie-policy' },
    { name: lang === 'es' ? 'GDPR' : 'GDPR', path: 'gdpr' },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-primary tracking-tight italic">
              {lang === 'es' ? 'Mapa del Sitio' : 'Sitemap'}
            </h1>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Main Sections */}
            <div className="space-y-8">
               <h2 className="text-2xl font-serif text-primary border-b border-primary-accent/20 pb-4 italic">
                 {lang === 'es' ? 'Navegación Principal' : 'Main Navigation'}
               </h2>
               <ul className="space-y-4">
                 {mainPages.map((page) => (
                   <li key={page.path}>
                     <Link 
                        href={getLocalizedPath(lang, page.path as InternalRoute)} 
                        className="text-text-muted hover:text-primary-accent transition-colors font-bold"
                     >
                       {page.name}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Properties */}
            <div className="space-y-8">
               <h2 className="text-2xl font-serif text-primary border-b border-primary-accent/20 pb-4 italic">
                 {lang === 'es' ? 'Nuestras Propiedades' : 'Our Properties'}
               </h2>
               <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary-accent/20">
                 {baseContent.properties.map((prop) => (
                   <li key={prop.id}>
                     <Link 
                        href={`${getLocalizedPath(lang, 'listings')}/${prop.id}`} 
                        className="text-text-muted hover:text-primary-accent transition-colors text-sm font-bold"
                     >
                       {prop.location} - {prop.city}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Legal */}
            <div className="space-y-8">
               <h2 className="text-2xl font-serif text-primary border-b border-primary-accent/20 pb-4 italic">
                 {lang === 'es' ? 'Legal' : 'Legal'}
               </h2>
               <ul className="space-y-4">
                 {legalPages.map((page) => (
                   <li key={page.path}>
                     <Link 
                        href={getLocalizedPath(lang, page.path as InternalRoute)} 
                        className="text-text-muted hover:text-primary-accent transition-colors font-bold"
                     >
                       {page.name}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
