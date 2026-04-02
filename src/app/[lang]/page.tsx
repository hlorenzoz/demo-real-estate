import React from "react";
import { ArrowRight, Star, Mail, Phone, MapPin, Building, ShieldCheck, TrendingUp, Handshake, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/MotionWrapper";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import FAQSection from "@/components/FAQSection";
import { Property } from "@/types/property";
import { getLocalizedPath } from "@/lib/routes";
import { getBaseContent } from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseContent = getBaseContent();

  const featuredProperties = (baseContent.properties as Property[]).filter(p => p.featured).slice(0, 6);
  const rentalProperties = (baseContent.properties as Property[]).filter(p => p.contractType === 'rent').slice(0, 6);
  const reviews = baseContent.reviews.slice(0, 8);

  const servicesList = [
    {
      title: dict.services.tasacion,
      desc: dict.services.tasacion_desc,
      detail: dict.services.tasacion_detail,
      icon: <Building className="w-6 h-6 text-primary-accent" />
    },
    {
      title: dict.services.venta,
      desc: dict.services.venta_desc,
      icon: <TrendingUp className="w-6 h-6 text-primary-accent" />
    },
    {
      title: dict.services.alquiler,
      desc: dict.services.alquiler_desc,
      detail: dict.services.alquiler_pillars ? dict.services.alquiler_pillars.join(" • ") : undefined,
      icon: <ShieldCheck className="w-6 h-6 text-primary-accent" />
    },
    {
      title: dict.services.asesoria,
      desc: dict.services.asesoria_desc,
      icon: <Handshake className="w-6 h-6 text-primary-accent" />
    },
    {
      title: dict.services.legal,
      desc: dict.services.legal_desc,
      detail: dict.services.legal_expertise,
      icon: <Users className="w-6 h-6 text-primary-accent" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <section id="hero">
        <Hero lang={lang as Locale} dict={dict.hero} properties={baseContent.properties} />
      </section>

      {/* Featured Properties Section */}
      <section id="featured-properties" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-accent-dark mb-4 block">
                {dict.home.property_title}
              </span>
              <h2 className="text-4xl md:text-7xl font-serif text-primary italic leading-[0.9] tracking-tighter">
                {dict.home.property_subtitle}
              </h2>
            </div>
            <Link 
              href={getLocalizedPath(lang, 'listings')}
              className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-primary-accent transition-all group border-b-2 border-primary/10 pb-2"
            >
              {dict.home.cta_catalog}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={featuredProperties} lang={lang as Locale} dict={dict.home} />
        </div>
      </section>

      {/* Rentals Section */}
      <section id="rentals" className="py-32 px-6 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-accent-dark mb-4 block">
                {dict.navbar.rentals}
              </span>
              <h2 className="text-4xl md:text-7xl font-serif text-primary italic leading-[0.9] tracking-tighter">
                {dict.home.for_rent}
              </h2>
            </div>
            <Link 
              href={getLocalizedPath(lang, 'rentals')}
              className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-primary-accent transition-all group border-b-2 border-primary/10 pb-2"
            >
              {dict.home.cta_rentals || 'Check Rentals'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MotionWrapper>

          <PropertiesCarousel properties={rentalProperties} lang={lang as Locale} dict={dict.home} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-serif text-primary italic leading-[1.1] tracking-tighter mb-8">
               {dict.services.title}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
               {dict.services.description}
            </p>
          </MotionWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, i) => (
              <MotionWrapper key={i} delay={i * 0.1} className="bg-[#FAFAFA] border border-slate-100 p-10 rounded-[40px] flex flex-col items-start gap-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-3 leading-tight tracking-tight">{service.title}</h3>
                  <p className="text-text-muted font-light text-sm leading-relaxed mb-4">{service.desc}</p>
                  {service.detail && (
                    <div className="text-[10px] uppercase font-black tracking-widest text-primary-accent-dark border-t border-slate-200 pt-4 mt-auto">
                      {service.detail}
                    </div>
                  )}
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Minimalist & Geometric */}
      <section id="about-us" className="py-32 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <MotionWrapper className="relative">
            <div className="aspect-[4/5] relative rounded-[64px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
                <Image 
                  src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/luxury-facade.webp" 
                  alt="Luxury Modern Architecture" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                  priority={true}
                />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-[40px] text-white shadow-2xl hidden md:block border border-white/10 backdrop-blur-xl">
               <div className="text-5xl font-serif italic gold-gradient mb-1">15+</div>
               <div className="text-[10px] uppercase font-black tracking-widest text-primary-accent opacity-80">{dict.home.years_exp}</div>
            </div>
          </MotionWrapper>
          
          <MotionWrapper delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-[1.1] italic">
               {dict.home.about_title}
               <span className="block h-1 w-24 bg-primary-accent mt-6 opacity-50" />
            </h2>
            <p className="text-xl text-text-muted leading-relaxed font-bold mb-12 italic">
               {dict.home.about_desc}
            </p>
            <div className="grid grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-[32px] border border-slate-50">
                    <div className="text-3xl font-serif gold-gradient mb-2">98%</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-text-muted">{dict.home.success_rate}</div>
                </div>
                <div className="p-8 bg-white rounded-[32px] border border-slate-50">
                    <div className="text-3xl font-serif gold-gradient mb-2">100%</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-text-muted">{dict.home.about_transparency}</div>
                </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-24">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-accent/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-accent-dark mb-6">
                <Star size={12} fill="currentColor" /> {dict.reviews.stats_label}
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-primary italic leading-none tracking-tight mb-8">
               {dict.reviews.title}
            </h2>
            <p className="text-xl text-text-muted font-light max-w-xl mx-auto italic">
               {dict.reviews.description}
            </p>
          </MotionWrapper>

          <ReviewsCarousel reviews={reviews} stats={baseContent.stats} dict={dict.reviews} />

          <MotionWrapper delay={0.4} className="mt-20 text-center">
            <a 
              href={baseContent.agency.gmb_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 hover:bg-primary-accent hover:text-primary transition-all shadow-xl"
            >
               {dict.reviews.view_all}
               <ArrowRight size={16} />
            </a>
          </MotionWrapper>
        </div>
      </section>

      <div id="faq">
        <FAQSection dict={dict.faq} lang={lang} limit={4} />
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <MotionWrapper>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-accent-dark mb-4 block">
                        {dict.contact_page.badge}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-serif text-primary mb-8 leading-[0.9] tracking-tighter italic">
                        {dict.contact_page.title}
                    </h2>
                    <p className="text-xl text-text-muted font-bold mb-12 italic">
                        {dict.contact_page.subtitle}
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-[24px] bg-white shadow-lg flex items-center justify-center text-primary-accent transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                                <Phone size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-text-muted mb-1">{dict.contact_page.phone_label}</div>
                                <div className="text-xl font-serif italic text-primary">+34 912 345 678</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-[24px] bg-white shadow-lg flex items-center justify-center text-primary-accent transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                                <Mail size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-text-muted mb-1">{dict.contact_page.email_label}</div>
                                <div className="text-xl font-serif italic text-primary">info@luxuryrealestate.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-[24px] bg-white shadow-lg flex items-center justify-center text-primary-accent transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-text-muted mb-1">{dict.contact_page.address_label}</div>
                                <div className="text-xl font-serif italic text-primary">{baseContent.agency.location}</div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="mt-12 p-8 bg-white rounded-[32px] border border-slate-50 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-primary-accent-dark mb-6 tracking-[0.2em]">{dict.contact_page.working_hours}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                    <span className="text-sm font-bold text-slate-500">{dict.contact_page.mon_fri_label}</span>
                                    <span className="text-sm font-black text-primary">{dict.contact_page.mon_fri}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                    <span className="text-sm font-bold text-slate-500">{dict.contact_page.sat_label}</span>
                                    <span className="text-sm font-black text-primary">{dict.contact_page.sat}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2">
                                    <span className="text-sm font-bold text-slate-500">{dict.contact_page.sun_label}</span>
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest bg-slate-50 px-3 py-1 rounded-full">{dict.contact_page.closed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.2} className="bg-white p-12 md:p-16 rounded-[64px] border border-slate-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                    <ContactForm dict={dict.contact_page} lang={lang} />
                </MotionWrapper>
            </div>
        </div>
      </section>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
