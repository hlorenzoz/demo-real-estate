import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, MessageCircle, Calculator, Megaphone, Users, Scale, Check } from "lucide-react";
import { getLocalizedPath, reverseMappings } from "../../lib/routes";
import { getDictionary } from "../../get-dictionary";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

// Lazy load off-screen components
const PropertiesCarousel = dynamic(() => import("../../components/PropertiesCarousel"), { 
  loading: () => <div className="h-[400px] bg-slate-50 animate-pulse rounded-[48px]" />
});
const ReviewsCarousel = dynamic(() => import("../../components/ReviewsCarousel"));
const FAQSection = dynamic(() => import("../../components/FAQSection"));
const MotionWrapper = dynamic(() => import("../../components/MotionWrapper"));

// Data from JSON in root dir
import { Property } from "../../types/property";
import baseContentRaw from "../../../base-content.json";

const baseContent = baseContentRaw as {
  properties: Property[];
  reviews: {
    author: string;
    date: string;
    rating: number;
    content: string;
  }[];
  stats: {
    average: number;
    count: number;
    label: string;
    platform: string;
  };
};

interface ServiceDictionary {
  title: string;
  description: string;
  tasacion: string;
  tasacion_desc: string;
  tasacion_detail: string;
  venta: string;
  venta_desc: string;
  alquiler: string;
  alquiler_desc: string;
  alquiler_pillars: string[];
  asesoria: string;
  asesoria_desc: string;
  legal: string;
  legal_desc: string;
  legal_expertise: string;
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dict = await getDictionary(locale) as Record<string, any>;
  const services = dict.services as ServiceDictionary;
  const { reviews, stats } = baseContent;

  const featuredProperties = baseContent.properties.filter(p => p.featured && p.contractType === 'sale');
  const rentalProperties = baseContent.properties.filter(p => p.contractType === 'rent');

  const propiedadesId = reverseMappings[locale]?.['propiedades'] || 'propiedades';
  const alquilerId = reverseMappings[locale]?.['alquiler'] || 'alquiler';
  const venderId = reverseMappings[locale]?.['vender'] || 'vender';
  const nosotrosId = reverseMappings[locale]?.['about-us'] || 'about-us';

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Demo Real Estate",
            "image": "https://demo-realestate.com/images/meta.png",
            "url": "https://demo-realestate.com",
            "telephone": "+34 900 000 000",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Main Street, 123",
              "addressLocality": "City",
              "addressRegion": "Region",
              "postalCode": "28001",
              "addressCountry": "ES"
            }
          }),
        }}
      />
      <Navbar lang={locale} dict={dict.navbar} />
      <Hero 
        dict={dict.hero} 
        lang={locale} 
        properties={baseContent.properties} 
      />

      {/* Featured Properties (Sale) */}
      <section id={propiedadesId} className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif text-primary italic mb-6 tracking-tight">
                {dict.home.property_title}
              </h2>
              <p className="text-xl text-text-muted font-light italic">
                {dict.home.property_subtitle}
              </p>
            </div>
            <Link href={getLocalizedPath(locale, 'listings')} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-2 hover:opacity-70 transition-all font-serif italic">
              {dict.home.cta_catalog} <ArrowRight size={18} />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={featuredProperties} lang={locale} dict={dict.home} />
        </div>
      </section>

      {/* Featured Rentals */}
      <section id={alquilerId} className="py-32 px-6 bg-[#F8F9FB] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif text-primary italic mb-6 tracking-tight">
                {dict.navbar.rentals}
              </h2>
              <p className="text-xl text-text-muted font-light italic">
                {dict.home.property_subtitle}
              </p>
            </div>
            <Link href={getLocalizedPath(locale, 'alquiler')} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-2 hover:opacity-70 transition-all font-serif italic">
              {dict.home.cta_rentals} <ArrowRight size={18} />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={rentalProperties} lang={locale} dict={dict.home} />
        </div>
      </section>

      {/* 2. Services Section */}
      <section id={venderId} className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif mb-6 text-primary tracking-tight italic">
              {services.title}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-3xl mx-auto italic">
              {services.description}
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Tasación */}
            <MotionWrapper delay={0.1} className="lg:col-span-1">
              <div className="bg-slate-50 p-12 rounded-[56px] h-full flex flex-col group hover:bg-primary transition-all duration-700 border border-transparent hover:border-white/10 shadow-sm hover:shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-primary-accent mb-10 group-hover:bg-primary-accent group-hover:text-primary transition-all duration-500 transform group-hover:rotate-12">
                  <Calculator size={36} />
                </div>
                <div className="mt-auto">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-accent-dark mb-4 block group-hover:text-primary-accent">
                    {services.tasacion_detail}
                  </span>
                  <h3 className="text-3xl font-serif mb-6 text-primary group-hover:text-white leading-tight italic">
                    {services.tasacion}
                  </h3>
                  <p className="text-text-muted font-bold group-hover:text-gray-300 leading-relaxed italic">
                    {services.tasacion_desc}
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Service 2: Venta */}
            <MotionWrapper delay={0.2} className="lg:col-span-1">
              <div className="bg-white p-12 rounded-[56px] h-full flex flex-col group hover:bg-primary transition-all duration-700 border border-slate-100 hover:border-white/10 shadow-sm hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:bg-primary-accent/10 transition-all" />
                <div className="w-20 h-20 rounded-3xl bg-slate-50 shadow-sm flex items-center justify-center text-primary-accent mb-10 group-hover:bg-primary-accent group-hover:text-primary transition-all duration-500 transform group-hover:scale-110">
                  <Megaphone size={36} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-3xl font-serif mb-6 text-primary group-hover:text-white leading-tight italic">
                    {services.venta}
                  </h3>
                  <p className="text-text-muted font-bold group-hover:text-gray-300 leading-relaxed italic">
                    {services.venta_desc}
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Service 3: Alquiler */}
            <MotionWrapper delay={0.3} className="lg:col-span-1">
              <div className="bg-slate-50 p-12 rounded-[56px] h-full flex flex-col group hover:bg-primary transition-all duration-700 border border-transparent hover:border-white/10 shadow-sm hover:shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-primary-accent mb-10 group-hover:bg-primary-accent group-hover:text-primary transition-all duration-500 transform group-hover:-rotate-12">
                  <ShieldCheck size={36} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-3xl font-serif mb-6 text-primary group-hover:text-white leading-tight italic">
                    {services.alquiler}
                  </h3>
                  <p className="text-text-muted font-bold group-hover:text-gray-300 leading-relaxed italic mb-8">
                    {services.alquiler_desc}
                  </p>
                  <ul className="space-y-3">
                    {services.alquiler_pillars.map((p: string) => (
                      <li key={p} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary-accent-dark group-hover:text-primary-accent">
                        <Check size={16} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionWrapper>

            {/* Service 4: Asesoría (Wide) */}
            <MotionWrapper delay={0.4} className="md:col-span-2 lg:col-span-2">
              <div className="bg-primary p-12 lg:p-16 rounded-[56px] h-full flex flex-col lg:flex-row gap-12 group hover:shadow-2xl transition-all duration-700 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="lg:w-1/3 flex flex-col">
                  <div className="w-24 h-24 rounded-[32px] bg-primary-accent flex items-center justify-center text-primary mb-10 transform -rotate-3 group-hover:rotate-0 transition-transform">
                    <Users size={40} />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-serif text-white leading-tight italic">
                    {services.asesoria}
                  </h3>
                </div>
                <div className="lg:w-2/3 lg:flex lg:items-center">
                  <p className="text-2xl text-gray-300 font-light italic leading-relaxed">
                    {services.asesoria_desc}
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Service 5: Legal */}
            <MotionWrapper delay={0.5} className="md:col-span-1 lg:col-span-1">
              <div className="bg-white p-12 rounded-[56px] h-full flex flex-col group hover:bg-primary transition-all duration-700 border border-slate-100 hover:border-white/10 shadow-sm hover:shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 shadow-sm flex items-center justify-center text-primary-accent mb-10 group-hover:bg-primary-accent group-hover:text-primary transition-all duration-500">
                  <Scale size={36} />
                </div>
                <div className="mt-auto">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-accent-dark mb-4 block group-hover:text-primary-accent">
                    {services.legal_expertise}
                  </span>
                  <h3 className="text-3xl font-serif mb-6 text-primary group-hover:text-white leading-tight italic">
                    {services.legal}
                  </h3>
                  <p className="text-text-muted font-bold group-hover:text-gray-300 leading-relaxed italic">
                    {services.legal_desc}
                  </p>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* 3. Featured CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto h-[600px] relative rounded-[64px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
          <Image 
            src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero.webp" 
            alt={dict.home.cta_banner} 
            fill 
            sizes="100vw"
            className="object-cover group-hover:scale-110 transition-transform duration-1000" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-12 md:p-24">
            <MotionWrapper className="max-w-xl text-white">
              <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">{dict.home.cta_banner} <br/> <span className="gold-gradient italic">{dict.home.cta_banner_accent}</span></h2>
              <p className="text-xl text-gray-200 mb-10 font-bold">{dict.home.cta_banner_desc}</p>
              <Link href={getLocalizedPath(locale, 'listings')} className="bg-primary-accent text-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl inline-block">
                {dict.home.cta_catalog}
              </Link>
            </MotionWrapper>

          </div>
        </div>
      </section>

      {/* 4. Social Proof */}
      <section id={nosotrosId} className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <MotionWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-primary tracking-tight">
              {dict.reviews.title}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-xl mx-auto mb-2 tracking-tight italic">
              {dict.reviews.description}
            </p>
          </MotionWrapper>

          <ReviewsCarousel reviews={reviews} stats={stats} dict={dict.reviews} />

          <div className="mt-8 flex flex-col lg:flex-row items-center gap-12 p-12 glass rounded-[56px] border border-white/40 shadow-2xl">
            <div className="lg:w-1/3 relative h-[450px] w-full rounded-[40px] overflow-hidden shadow-xl">
              <Image src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team.webp" alt="Our Team" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-4xl font-serif mb-6 text-primary tracking-tight italic">{dict.home.about_title}</h3>
              <p className="text-xl text-text-muted mb-8 leading-relaxed font-bold">
                {dict.home.about_desc.split(dict.home.about_transparency)[0]}
                <span className="text-primary-accent-dark">{dict.home.about_transparency}</span>
                {dict.home.about_desc.split(dict.home.about_transparency)[1]}
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-primary tracking-tighter italic">+15</span>
                  <span className="text-xs uppercase font-black text-text-muted tracking-widest mt-1">{dict.home.years_exp}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-primary tracking-tighter italic">100%</span>
                  <span className="text-xs uppercase font-black text-text-muted tracking-widest mt-1">{dict.home.success_rate}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict.faq} lang={locale} limit={5} />

      <Footer dict={dict.footer} lang={locale} />


      {/* Floating Action Button (WhatsApp) */}
      <Link 
        href="https://wa.me/34988461585" 
        className="fixed bottom-12 right-12 z-[100] bg-[#25D366] text-white p-5 rounded-3xl shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-primary px-6 py-3 rounded-2xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-black/5 uppercase tracking-widest">
          {dict.home.whatsapp_prompt}
        </span>

      </Link>
    </main>
  );
}
