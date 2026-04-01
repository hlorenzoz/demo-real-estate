/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Square, Heart, ArrowRight } from "lucide-react";

import { Dictionary } from "../get-dictionary";
import { Property } from "../types/property";
import { getLocalizedPath } from "../lib/routes";

interface PropertyCardProps {
  property: Property;
  lang: "en" | "es";
  dict: Dictionary["home"];
  priority?: boolean;
}

export default function PropertyCard({ property, lang, dict, priority }: PropertyCardProps) {
  const propertyPath = getLocalizedPath(lang, 'propiedades');
  
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (typeof (globalThis as any).window !== "undefined") {
        const liked = (globalThis as any).localStorage.getItem(`property-liked-${property.id}`);
        if (liked === "true") setIsLiked(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [property.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isLiked;
    setIsLiked(newState);
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).localStorage.setItem(`property-liked-${property.id}`, String(newState));
    }
  };

  const formattedPrice = new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div
      className="bg-white rounded-[40px] overflow-hidden border border-slate-50 group shadow-sm hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full relative"
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`${propertyPath}/${property.id}`} className="block w-full h-full relative">
          <Image 
            src={property.image} 
            alt={property.location} 
            fill 
            sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 30vw" 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
            priority={priority} 
          />
        </Link>
        <div className="absolute top-6 left-6 flex gap-2 pointer-events-none">
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
          className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center shadow-lg border border-white/20 transition-all z-20 ${
            isLiked 
              ? "text-red-500 bg-white" 
              : "text-primary-accent hover:bg-primary-accent hover:text-white"
          }`}
          onClick={toggleLike}
          aria-label={dict.save_property || "Save property"}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`${propertyPath}/${property.id}`} className="p-10 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="text-3xl font-serif text-primary leading-tight mb-2 tracking-tight truncate">{property.location}</h3>
          <div className="text-2xl font-black text-primary-accent-dark italic">{formattedPrice}</div>
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
      </Link>
    </div>
  );
}
