/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Dictionary, Locale } from "../get-dictionary";
import { getLocalizedPath } from "../lib/routes";
import { Property } from "../types/property";

interface HeroProps {
  dict: Dictionary["hero"];
  lang: Locale;
  properties: Property[];
}

export default function HeroClient({ dict, lang, properties }: HeroProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !(searchRef.current as any).contains(event.target as any)) {
        setShowSearchDropdown(false);
      }
      if (locationRef.current && !(locationRef.current as any).contains(event.target as any)) {
        setShowLocationDropdown(false);
      }
    };
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof (globalThis as any).window !== "undefined") {
        (globalThis as any).document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  // Filter properties for general search
  const filteredSearch = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return properties.filter(p => 
      p.location.toLowerCase().includes(q) || 
      (p.city && p.city.toLowerCase().includes(q)) ||
      p.type.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery, properties]);

  // Filter unique cities/locations for location search
  const filteredLocations = useMemo(() => {
    if (!locationQuery || locationQuery.length < 2) return [];
    const q = locationQuery.toLowerCase();
    
    const uniqueLocs = new Set<string>();
    const results: { city: string; location: string }[] = [];
    
    properties.forEach(p => {
      const city = p.city || "";
      const loc = p.location || "";
      const key = `${city}-${loc}`;
      
      if (!uniqueLocs.has(key) && (city.toLowerCase().includes(q) || loc.toLowerCase().includes(q))) {
        uniqueLocs.add(key);
        results.push({ city, location: loc });
      }
    });
    
    return results.slice(0, 5);
  }, [locationQuery, properties]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    
    router.push(`${getLocalizedPath(lang, 'listings')}?${params.toString()}`);
  };

  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 shadow-[inset_0_-200px_400px_-100px_rgba(0,0,0,0.8)]" />
        <Image 
          src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp" 
          alt="Luxury Interior" 
          fill 
          sizes="100vw"
          className="object-cover scale-105"
          priority={true}
          fetchPriority="high"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-[-10vh]">
        <div className="max-w-2xl text-white">
          <span className="bg-primary-accent text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl mb-8 inline-block shadow-2xl">
            {dict.badge}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tighter">
            {dict.title} <span className="gold-gradient italic">{dict.title_accent}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed font-light max-w-xl">
            {dict.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href={getLocalizedPath(lang, 'listings')} 
              className="bg-primary-accent text-primary px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all group shadow-2xl"
            >
              {dict.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Search (Floating Glass) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 lg:px-6 z-[100]"
      >
        <div className="glass p-2 lg:p-3 rounded-[32px] flex flex-col lg:flex-row lg:items-center shadow-2xl border border-white/20 backdrop-blur-3xl relative z-[100] gap-2 lg:gap-0">
          
          {/* General Search Input */}
          <div className="flex-1 relative" ref={searchRef} data-testid="search-container">
            <div className="flex items-center gap-5 px-6">
              <Search className="text-primary/20 w-6 h-6" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery((e.target as any).value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder={dict.search_placeholder} 
                className="bg-transparent border-none focus:ring-0 w-full text-primary outline-none font-bold text-lg placeholder:text-primary/30 py-4" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-primary/20 hover:text-primary">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* General Search Results Dropdown */}
            <AnimatePresence>
              {showSearchDropdown && filteredSearch.length > 0 && (
                <motion.div 
                  data-testid="search-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 w-full mb-4 bg-white backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 overflow-hidden z-[110]"
                >
                  <div className="p-2">
                    {filteredSearch.map((property) => (
                      <Link 
                        key={property.id}
                        href={`${getLocalizedPath(lang, 'listings')}/${property.id}`}
                        className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-2xl transition-all group"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          <Image src={property.image} alt={property.location} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-black text-primary truncate tracking-tight">{property.location}</div>
                          <div className="text-[10px] uppercase font-black text-primary-accent-dark tracking-widest">{property.type} • {property.city}</div>
                        </div>
                        <ArrowRight size={14} className="text-primary-accent-dark opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:block w-px h-12 bg-black/5" />

          {/* Location Search Input */}
          <div className="flex-[0.6] relative" ref={locationRef} data-testid="location-container">
            <div 
              className="px-6 flex items-center gap-3 cursor-pointer hover:bg-black/5 rounded-2xl py-4 transition-all text-primary"
              onClick={() => setShowLocationDropdown(true)}
            >
              <MapPin className="text-primary-accent-dark w-6 h-6" />
              <input 
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery((e.target as any).value);
                  setShowLocationDropdown(true);
                }}
                onFocus={() => setShowLocationDropdown(true)}
                placeholder={dict.location_label}
                className="bg-transparent border-none focus:ring-0 w-full text-primary outline-none font-bold text-base placeholder:text-primary/40 p-0"
              />
            </div>

            {/* Location Search Results Dropdown */}
            <AnimatePresence>
              {showLocationDropdown && filteredLocations.length > 0 && (
                <motion.div 
                  data-testid="location-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 w-full mb-4 bg-white backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 overflow-hidden z-[110]"
                >
                  <div className="p-2">
                    {filteredLocations.map((loc, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setLocationQuery(loc.city || loc.location);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-primary/5 rounded-2xl transition-all group text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent">
                          <MapPin size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-black text-primary tracking-tight">{loc.city}</div>
                          <div className="text-[10px] uppercase font-black text-text-muted tracking-widest">{loc.location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleSearch}
            className="bg-primary text-white px-8 lg:px-12 py-4 lg:py-5 rounded-[24px] lg:rounded-2xl hover:bg-primary-accent hover:text-primary transition-all font-black uppercase text-xs lg:text-sm tracking-widest shadow-xl lg:ml-2"
          >
            {dict.search_button}
          </button>

        </div>
      </motion.div>
    </section>
  );
}
