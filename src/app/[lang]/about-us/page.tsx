import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import { getDictionary, Locale } from "../../../get-dictionary";

export default async function aboutusPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-primary tracking-tight italic">
              {lang === 'es' ? 'Sobre Nosotros' : 'About Us'}
            </h1>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
              {lang === 'es' 
                ? 'Confianza y Calidad en el Corazón de Tu Ciudad.' 
                : 'Trust and Quality in the Heart of Your City.'}
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <MotionWrapper delay={0.2} className="relative aspect-[4/5] overflow-hidden rounded-[64px]">
               <Image 
                  src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team.webp" 
                  alt="Modern Office" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
               />
             </MotionWrapper>

             <MotionWrapper delay={0.4} className="space-y-10">
               <div className="space-y-6">
                 <h2 className="text-4xl font-serif text-primary italic">
                   {lang === 'es' ? 'Nuestra Historia' : 'Our Story'}
                 </h2>
                 <p className="text-lg text-text-muted leading-relaxed font-bold">
                   {lang === 'es'
                     ? 'Establecidos con una visión de redefinir la experiencia inmobiliaria, nos hemos convertido en una de las agencias más respetadas de la región. Nuestro enfoque combina el lujo con un toque personal, asegurando que cada cliente encuentre su refugio perfecto.'
                     : 'Established with a vision to redefine the real estate experience, we have grown into one of the most respected agencies in the region. Our approach combines luxury with a personal touch, ensuring every client finds their perfect sanctuary.'}
                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm">
                   <h3 className="text-xl font-serif text-primary mb-2 italic">{lang === 'es' ? 'Misión' : 'Mission'}</h3>
                   <p className="text-text-muted text-sm font-bold">
                     {lang === 'es' ? 'Proporcionar transparencia y excelencia en cada transacción.' : 'Providing transparency and excellence in every transaction.'}
                   </p>
                 </div>
                 <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm">
                   <h3 className="text-xl font-serif text-primary mb-2 italic">{lang === 'es' ? 'Visión' : 'Vision'}</h3>
                   <p className="text-text-muted text-sm font-bold">
                     {lang === 'es' ? 'Ser el líder indiscutible en propiedades de alta gama.' : 'Being the undisputed leader in high-end properties.'}
                   </p>
                 </div>
               </div>
             </MotionWrapper>
          </div>
        </div>
      </section>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
