/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, MapPin, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Dictionary, Locale } from "../get-dictionary";
import { getLocalizedPath } from "../lib/routes";
import { Property } from "../types/property";

interface HeroSearchClientProps {
  dict: Dictionary["hero"];
  lang: Locale;
  properties: Property[];
}

export default function HeroSearchClient({ dict, lang, properties }: HeroSearchClientProps) {
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
    <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 lg:px-6 z-[100]">
      <div className="glass p-2 lg:p-3 rounded-[32px] flex flex-col lg:flex-row lg:items-center shadow-2xl border border-white/20 backdrop-blur-md relative z-[100] gap-2 lg:gap-0">
        
        {/* General Search Input */}
        <div className="flex-1 relative" ref={searchRef}>
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
              data-testid="hero-search-input"
              className="bg-transparent border-none focus:ring-0 w-full text-primary outline-none font-bold text-lg placeholder:text-primary/30 py-4" 
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-primary/20 hover:text-primary">
                <X size={16} />
              </button>
            )}
            <div data-testid="debug-count" className="hidden">{filteredSearch.length}</div>
          </div>

          {/* General Search Results Dropdown */}
          {showSearchDropdown && filteredSearch.length > 0 && (
            <div 
              className="absolute bottom-full left-0 w-full mb-4 bg-white backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 overflow-hidden z-[110] animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="p-2">
                {filteredSearch.map((property) => (
                  <Link 
                    key={property.id}
                    href={`${getLocalizedPath(lang, 'propiedades')}/${property.id}`}
                    data-testid="hero-search-result"
                    className="w-full flex items-center gap-4 p-3 hover:bg-primary/5 rounded-2xl transition-all group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      <Image src={property.image} alt={property.location} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-black text-primary truncate tracking-tight">{property.location}</div>
                      <div className="text-[10px] uppercase font-black text-primary-accent-dark tracking-widest">{property.type} • {property.city}</div>
                    </div>
                    <ArrowRight size={14} className="text-primary-accent-dark opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block w-px h-12 bg-black/5" />

        {/* Location Search Input */}
        <div className="flex-[0.6] relative" ref={locationRef}>
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
          {showLocationDropdown && filteredLocations.length > 0 && (
            <div 
              className="absolute bottom-full left-0 w-full mb-4 bg-white backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 overflow-hidden z-[110] animate-in fade-in slide-in-from-bottom-2 duration-300"
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
            </div>
          )}
        </div>

        <button 
          onClick={handleSearch}
          className="bg-primary text-white px-8 lg:px-12 py-4 lg:py-5 rounded-[24px] lg:rounded-2xl hover:bg-primary-accent hover:text-primary transition-all font-black uppercase text-xs lg:text-sm tracking-widest shadow-xl lg:ml-2"
        >
          {dict.search_button}
        </button>

      </div>
    </div>
  );
}
