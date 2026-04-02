import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BedDouble, Bath, Square, MapPin, ArrowLeft, ArrowRight,
  Calendar, Car, Waves, TreePine, Building2, Check, Share2, Phone
} from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { Property } from "@/types/property";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/MotionWrapper";
import PropertyCard from "@/components/PropertyCard";
import { getLocalizedPath } from "@/lib/routes";
import { getBaseContent } from "@/lib/content";

interface Props {
  params: Promise<{ lang: "en" | "es"; id: string }>;
}

export async function generateStaticParams() {
  const baseContent = getBaseContent();
  const paths: { lang: "en" | "es"; id: string }[] = [];
  
  (baseContent.properties as Property[]).forEach((p: Property) => {
    paths.push({ lang: "en", id: p.id });
    paths.push({ lang: "es", id: p.id });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const baseContent = getBaseContent();
  const property = (baseContent.properties as Property[]).find((p: Property) => p.id === id);

  if (!property) return { title: "Property Not Found" };

  const priceStr = new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedPrice = property.contractType === "rent" 
    ? `${priceStr} / ${lang === "es" ? "mes" : "month"}`
    : priceStr;

  return {
    title: `${property.location} — ${formattedPrice} | ${dict.metadata.title}`,
    description: (lang === "es" ? property.description_es || property.description_en : property.description_en || property.description_es) || dict.properties_page.detail_meta_desc,
    openGraph: {
      images: [property.image],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const baseContent = getBaseContent();
  const property = (baseContent.properties as Property[]).find((p: Property) => p.id === id);

  if (!property) notFound();

  const d = dict.properties_page;

  const formattedPrice = (value: number) => {
    const priceStr = new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
    
    return property.contractType === "rent" 
      ? `${priceStr} / ${lang === "es" ? "mes" : "month"}`
      : priceStr;
  };

  const typeLabel =
    (dict.home.property_types as Record<string, string>)[property.type] ||
    property.type;

  // Similar properties: same type or featured, excluding current and matching contract
  const similar = (baseContent.properties as Property[])
    .filter((p: Property) => p.id !== property!.id && p.contractType === property!.contractType && (p.type === property!.type || p.featured))
    .slice(0, 3);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.location,
    description: lang === "es" ? (property.description_es || property.description_en) : (property.description_en || property.description_es),
    url: `https://demo-realestate.com${getLocalizedPath(lang, 'listings')}/${property.id}`,
    image: property.image,
    price: property.price,
    priceCurrency: "EUR",
    numberOfRooms: property.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "MTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city || property.location,
      addressCountry: "ES",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
        <Navbar lang={lang} dict={dict.navbar} />

        {/* Hero Image */}
        <div className="relative h-[60vh] md:h-[75vh] w-full">
          <Image
            src={property.image}
            alt={property.location}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Back nav */}
          <div className="absolute top-32 left-6 md:left-12 z-10">
            <Link
              href={getLocalizedPath(lang, 'listings')}
              className="flex items-center gap-2 bg-white/90 backdrop-blur text-primary px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg border border-white/20"
            >
              <ArrowLeft size={14} />
              {d.back_to_catalog}
            </Link>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg mb-4">
                {typeLabel}
              </span>
              <h1 className="text-4xl md:text-7xl font-serif text-white italic leading-none mb-2 tracking-tight">
                {property.location}
              </h1>
              {property.city && (
                <div className="flex items-center gap-2 text-white/70 text-base font-bold">
                  <MapPin size={14} />
                  {property.city}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Description + Features */}
            <div className="lg:col-span-2">
              {/* Stats bar */}
              <MotionWrapper className="flex flex-wrap gap-6 mb-12 p-8 bg-white rounded-[32px] border border-slate-50 shadow-sm">
                <div className="flex flex-col items-center gap-1 px-6 border-r border-slate-50 last:border-0">
                  <BedDouble size={20} className="text-primary-accent-dark" />
                  <span className="text-2xl font-black text-primary">{property.bedrooms}</span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{d.beds_label}</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-6 border-r border-slate-50 last:border-0">
                  <Bath size={20} className="text-primary-accent-dark" />
                  <span className="text-2xl font-black text-primary">{property.bathrooms}</span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{d.baths_label}</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-6 border-r border-slate-50 last:border-0">
                  <Square size={20} className="text-primary-accent-dark" />
                  <span className="text-2xl font-black text-primary">{property.area}</span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{d.area_label}</span>
                </div>
                {property.year_built && (
                  <div className="flex flex-col items-center gap-1 px-6 border-r border-slate-50 last:border-0">
                    <Calendar size={20} className="text-primary-accent-dark" />
                    <span className="text-2xl font-black text-primary">{property.year_built}</span>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{d.year_built}</span>
                  </div>
                )}
              </MotionWrapper>

              {/* Description */}
              {(property.description_en || property.description_es) && (
                <MotionWrapper className="mb-12">
                  <p className="text-xl text-text-muted leading-relaxed font-bold">
                    {lang === "es" ? (property.description_es || property.description_en) : (property.description_en || property.description_es)}
                  </p>
                </MotionWrapper>
              )}

              {/* Amenities */}
              <MotionWrapper delay={0.1} className="mb-12">
                <h2 className="text-xs font-black uppercase tracking-widest text-text-muted mb-6">
                  {d.features}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: "pool", icon: <Waves size={18} />, label: d.pool, value: !!property.pool },
                    { key: "garden", icon: <TreePine size={18} />, label: d.garden, value: !!property.garden },
                    { key: "elevator", icon: <Building2 size={18} />, label: d.elevator, value: !!property.elevator },
                    { key: "garage", icon: <Car size={18} />, label: d.garage, value: (property.garage ?? 0) > 0 },
                  ].map(({ key, icon, label, value }) => (
                    <div
                      key={key}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-sm font-black ${
                        value
                          ? "border-primary/10 bg-primary/5 text-primary"
                          : "border-slate-100 text-slate-300"
                      }`}
                    >
                      {icon}
                      {label}
                      {value && <Check size={14} className="ml-auto text-primary-accent-dark" />}
                    </div>
                  ))}
                </div>

                {/* Feature list */}
                {property.features && property.features.length > 0 && (
                  <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-bold text-text-muted">
                        <span className="w-5 h-5 rounded-full bg-primary-accent/10 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-primary-accent-dark" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </MotionWrapper>
            </div>

            {/* Right: Price Card + CTA */}
            <div className="lg:col-span-1">
              <MotionWrapper delay={0.15} className="sticky top-32">
                <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-[0_32px_80_rgba(0,0,0,0.06)]">
                  <div className="mb-8">
                    <div className="text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                      {typeLabel}
                    </div>
                    <div className="text-4xl font-black text-primary-accent-dark italic mb-1">
                      {formattedPrice(property.price)}
                    </div>
                    {property.city && (
                      <div className="flex items-center gap-1 text-xs text-text-muted font-bold">
                        <MapPin size={10} />
                        {property.city}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Link
                      href={getLocalizedPath(lang, 'contact')}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
                    >
                      <Phone size={14} />
                      {d.request_info}
                    </Link>
                    <Link
                      href={getLocalizedPath(lang, 'contact')}
                      className="w-full bg-primary-accent text-primary py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-md"
                    >
                      {d.schedule_visit}
                      <ArrowRight size={14} />
                    </Link>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(property.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border-2 border-slate-100 text-text-muted py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-3"
                    >
                      <Share2 size={14} />
                      {d.share}
                    </a>
                  </div>

                  {/* Contact helper */}
                  <div className="mt-8 pt-8 border-t border-slate-50 text-xs text-text-muted font-bold leading-relaxed text-center">
                    {d.contact_desc}
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>

          {/* Similar Properties */}
          {similar.length > 0 && (
            <section className="mt-24">
              <MotionWrapper className="mb-12 flex items-end justify-between">
                <h2 className="text-3xl md:text-5xl font-serif text-primary italic tracking-tight">
                  {d.similar_properties}
                </h2>
                <Link
                  href={getLocalizedPath(lang, 'listings')}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-accent-dark border-b-2 border-primary-accent-dark pb-1 hover:opacity-70 transition-all"
                >
                  {d.filter_all} <ArrowRight size={14} />
                </Link>
              </MotionWrapper>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {similar.map((p, i) => (
                  <MotionWrapper key={p.id} delay={i * 0.1}>
                    <PropertyCard property={p} lang={lang} dict={dict.home} />
                  </MotionWrapper>
                ))}
              </div>
            </section>
          )}
        </div>

        <Footer dict={dict.footer} lang={lang} />
      </main>
    </>
  );
}
