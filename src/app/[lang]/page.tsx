import React from "react";
// Forced update to clear Turbopack cache - 2026-03-30T14:36:30
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  Heart, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Key, 
  ShieldCheck, 
  TrendingUp,
  Mail,
  Phone,
  Instagram,
  Facebook,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { getLocalizedPath } from "../../lib/routes";
import { getDictionary } from "../../get-dictionary";
import Navbar from "../../components/Navbar";
import HeroClient from "../../components/HeroClient";
import PropertyCard from "../../components/PropertyCard";
import PropertiesCarousel from "../../components/PropertiesCarousel";
import ReviewsCarousel from "../../components/ReviewsCarousel";
import Footer from "../../components/Footer";
import FAQSection from "../../components/FAQSection";
import MotionWrapper from "../../components/MotionWrapper";

// Data from JSON in root dir
import { Property } from "../../types/property";
import baseContentRaw from "../../../base-content.json";

const baseContent = baseContentRaw as {
  properties: Property[];
  reviews: any[];
  stats: any;
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang;
  const dict = await getDictionary(locale);
  const { reviews, stats } = baseContent;

  const featuredProperties = baseContent.properties.filter(p => p.featured && p.contractType === 'sale');
  const rentalProperties = baseContent.properties.filter(p => p.contractType === 'rent');

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
      <HeroClient dict={dict.hero} lang={locale} />

      {/* Featured Properties (Sale) */}
      <section id="propiedades" className="py-32 px-6 bg-white overflow-hidden">
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
            <Link href={getLocalizedPath(locale, 'listings')} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary-accent border-b-2 border-primary-accent pb-2 hover:opacity-70 transition-all">
              {dict.home.cta_catalog} <ArrowRight size={18} />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={featuredProperties} lang={locale} dict={dict.home} />
        </div>
      </section>

      {/* Featured Rentals */}
      <section id="alquiler" className="py-32 px-6 bg-[#F8F9FB] overflow-hidden">
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
            <Link href={getLocalizedPath(locale, 'alquiler')} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-accent border-b-2 border-secondary-accent pb-2 hover:opacity-70 transition-all">
              {dict.home.cta_rentals} <ArrowRight size={18} />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={rentalProperties} lang={locale} dict={dict.home} />
        </div>
      </section>

      {/* 2. Services Section */}
      <section id="vender" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-primary tracking-tight">
              {dict.services.title}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
              {dict.services.description}
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Sparkles className="w-8 h-8" />, 
                title: dict.services.tasacion, 
                desc: dict.services.tasacion_desc 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: dict.services.gestion, 
                desc: dict.services.gestion_desc 
              },
              { 
                icon: <TrendingUp className="w-8 h-8" />, 
                title: dict.services.inversion, 
                desc: dict.services.inversion_desc 
              }
            ].map((service, i) => (
              <MotionWrapper key={i} delay={i * 0.1}>
                <div className="bg-white p-12 rounded-[48px] border border-slate-50 transition-all hover:shadow-[0_32px_80px_rgba(0,0,0,0.06)] hover:translate-y-[-8px] group h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary-accent mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-primary">{service.title}</h3>
                  <p className="text-text-muted leading-relaxed font-bold text-base">{service.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto h-[600px] relative rounded-[64px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
          <Image 
            src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero.webp" 
            alt="Villas exclusivas" 
            fill 
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover group-hover:scale-110 transition-transform duration-1000" 
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
      <section id="nosotros" className="py-32 bg-white overflow-hidden relative">
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
                <span className="text-primary-accent">{dict.home.about_transparency}</span>
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
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-primary px-6 py-3 rounded-2xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-black/5 uppercase tracking-widest">
          {dict.home.whatsapp_prompt}
        </span>

      </Link>
    </main>
  );
}
