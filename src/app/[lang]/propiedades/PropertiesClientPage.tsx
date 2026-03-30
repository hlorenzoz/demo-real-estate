"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Square, ArrowRight, SlidersHorizontal, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dictionary } from "../../../get-dictionary";
import { Property } from "../../../types/property";

interface PropertiesClientPageProps {
  properties: Property[];
  lang: "en" | "es";
  dict: Dictionary;
}

export default function PropertiesClientPage({ properties, lang, dict }: PropertiesClientPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeSort, setActiveSort] = useState<string>("default");

  const d = dict.properties_page;

  const types = useMemo(() => {
    const t = Array.from(new Set(properties.map((p) => p.type)));
    return t;
  }, [properties]);

  const filtered = useMemo(() => {
    let list = [...properties];

    if (activeFilter === "featured") {
      list = list.filter((p) => p.featured);
    } else if (activeFilter !== "all") {
      list = list.filter((p) => p.type === activeFilter);
    }

    if (activeSort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (activeSort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (activeSort === "area") list.sort((a, b) => b.area - a.area);

    return list;
  }, [properties, activeFilter, activeSort]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(p);

  const typeLabel = (type: string) =>
    (dict.home.property_types as Record<string, string>)[type] || type;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Filters & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {["all", "featured", ...types].map((f) => {
              const label =
                f === "all"
                  ? d.filter_all
                  : f === "featured"
                  ? d.filter_featured
                  : typeLabel(f);
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                    activeFilter === f
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-text-muted border-slate-100 hover:border-primary hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sort + Count */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-text-muted uppercase tracking-widest">
              {filtered.length} {d.results}
            </span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 text-xs font-black text-primary uppercase tracking-widest focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="default">— Sort —</option>
              <option value="price_asc">{d.sort_price_asc}</option>
              <option value="price_desc">{d.sort_price_desc}</option>
              <option value="area">{d.sort_area}</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-text-muted font-bold py-24 text-xl"
            >
              {d.no_results}
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filtered.map((property, i) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <Link
                    href={`/${lang}/propiedades/${property.id}`}
                    className="bg-white rounded-[40px] overflow-hidden border border-slate-50 group shadow-sm hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full block"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.location}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        priority={i < 4}
                      />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg border border-white/20">
                          {typeLabel(property.type)}
                        </span>
                        <span className={`backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20 ${
                          property.contractType === "rent" 
                            ? "bg-secondary-accent/90 text-white" 
                            : "bg-primary-accent/90 text-primary"
                        }`}>
                          {property.contractType === "rent" 
                            ? dict.home.for_rent
                            : dict.home.for_sale
                          }
                        </span>
                        {property.featured && (
                          <span className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                            ★
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow">
                      <div className="mb-4">
                        {property.city && (
                          <div className="flex items-center gap-1 text-xs text-text-muted font-bold mb-2">
                            <MapPin size={10} />
                            {property.city}
                          </div>
                        )}
                        <h2 className="text-2xl font-serif text-primary leading-tight mb-2 tracking-tight">
                          {property.location}
                        </h2>
                        <div className="text-2xl font-black text-primary-accent italic">
                          {formatPrice(property.price)}
                        </div>
                      </div>

                      {((lang === "es" ? property.description_es : property.description_en)) && (
                        <p className="text-sm text-text-muted leading-relaxed mb-6 line-clamp-2">
                          {lang === "es" ? property.description_es : property.description_en}
                        </p>
                      )}

                      <div className="flex items-center justify-between py-5 border-y border-slate-50 mb-6">
                        <div className="flex flex-col items-center gap-1">
                          <BedDouble size={18} className="text-text-muted opacity-40" />
                          <span className="text-xs font-black text-text-muted">
                            {property.bedrooms} {dict.home.beds}
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-50" />
                        <div className="flex flex-col items-center gap-1">
                          <Bath size={18} className="text-text-muted opacity-40" />
                          <span className="text-xs font-black text-text-muted">
                            {property.bathrooms} {dict.home.baths}
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-50" />
                        <div className="flex flex-col items-center gap-1">
                          <Square size={16} className="text-text-muted opacity-40" />
                          <span className="text-xs font-black text-text-muted">
                            {property.area} m²
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto w-full py-4 rounded-2xl border-2 border-slate-50 text-text-muted flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        {d.view_detail}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Contact Banner */}
        <div className="mt-24 bg-primary rounded-[48px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
          <div className="text-white max-w-lg">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-4 leading-tight">
              {d.contact_cta}
            </h2>
            <p className="text-white/70 text-lg font-bold">{d.contact_desc}</p>
          </div>
          <Link
            href={`/${lang}/contactar`}
            className="bg-primary-accent text-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl whitespace-nowrap flex items-center gap-3"
          >
            {d.contact_cta} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
