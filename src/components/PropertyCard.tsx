"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Square, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Dictionary } from "../get-dictionary";
import { Property } from "../types/property";

interface PropertyCardProps {
  property: Property;
  lang: "en" | "es";
  dict: Dictionary["home"];
  priority?: boolean;
}

import { getLocalizedPath } from "../lib/routes";

export default function PropertyCard({ property, lang, dict, priority }: PropertyCardProps) {
  const propertyPath = getLocalizedPath(lang, 'propiedades');
  
  const formattedPrice = new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <Link
      href={`${propertyPath}/${property.id}`}
      className="bg-white rounded-[40px] overflow-hidden border border-slate-50 group shadow-sm hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full block"
    >
      <div className="relative h-72 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.location} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={priority}
        />
        <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg border border-white/20">
              {dict.property_types[property.type as keyof typeof dict.property_types] || property.type}
            </span>
            <span className={`backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20 ${
              property.contractType === "rent" 
                ? "bg-secondary-accent/90 text-white" 
                : "bg-primary-accent/90 text-primary"
            }`}>
              {property.contractType === "rent" 
                ? dict.for_rent
                : dict.for_sale
              }
            </span>
        </div>
        <button 
          className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center text-primary-accent shadow-lg border border-white/20 hover:bg-primary-accent hover:text-white transition-all"
          onClick={(e) => e.preventDefault()}
          aria-label="Save property"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="text-3xl font-serif text-primary leading-tight mb-2 tracking-tight truncate">{property.location}</h3>
          <div className="text-2xl font-black text-primary-accent italic">{formattedPrice}</div>
        </div>

        <div className="flex items-center justify-between py-6 border-y border-slate-50 mb-8">
          <div className="flex flex-col items-center gap-1">
            <BedDouble size={20} className="text-text-muted opacity-40" />
            <span className="text-xs font-black text-text-muted">{property.bedrooms} {dict.beds}</span>
          </div>
          <div className="w-px h-8 bg-slate-50" />
          <div className="flex flex-col items-center gap-1">
            <Bath size={20} className="text-text-muted opacity-40" />
            <span className="text-xs font-black text-text-muted">{property.bathrooms} {dict.baths}</span>
          </div>
          <div className="w-px h-8 bg-slate-50" />
          <div className="flex flex-col items-center gap-1">
            <Square size={18} className="text-text-muted opacity-40" />
            <span className="text-xs font-black text-text-muted">{property.area} m²</span>
          </div>
        </div>

        <div className="mt-auto w-full py-5 rounded-2xl border-2 border-slate-50 text-text-muted flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
          {dict.view_property} 
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
