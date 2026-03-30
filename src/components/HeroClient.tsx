"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Dictionary, Locale } from "../get-dictionary";
import { getLocalizedPath } from "../lib/routes";

interface HeroProps {
  dict: Dictionary["hero"];
  lang: Locale;
}


export default function HeroClient({ dict, lang }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 shadow-[inset_0_-200px_400px_-100px_rgba(0,0,0,0.8)]" />
        <Image 
          src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp" 
          alt="Luxury Interior in your City" 
          fill 
          sizes="100vw"
          className="object-cover scale-105"
          priority
          // @ts-ignore
          fetchPriority="high"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-[-5vh]">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <span className="bg-primary-accent text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl mb-8 inline-block shadow-2xl">
            {dict.badge}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tighter">
            {dict.title} <span className="gold-gradient italic">{dict.title_accent}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200/90 mb-12 leading-relaxed font-light max-w-xl">
            {dict.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href={getLocalizedPath(lang, 'propiedades')} 
              className="bg-primary-accent text-primary px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all group shadow-2xl"
            >
              {dict.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Search (Floating Glass) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 hidden lg:block"
      >
        <div className="glass p-3 rounded-[32px] flex items-center gap-4 shadow-2xl border border-white/20 backdrop-blur-3xl">
          <div className="flex-1 flex items-center gap-5 px-6">
            <Search className="text-primary/20 w-6 h-6" />
            <input 
              type="text" 
              placeholder={dict.search_placeholder} 
              className="bg-transparent border-none focus:ring-0 w-full text-primary outline-none font-bold text-lg placeholder:text-primary/30" 
            />
          </div>
          <div className="w-px h-12 bg-black/5" />
          <div className="px-6 flex items-center gap-3 cursor-pointer hover:bg-black/5 rounded-2xl py-4 transition-all text-primary">
            <MapPin className="text-primary-accent w-6 h-6" />
            <span className="text-base font-bold tracking-tight">{dict.location_label}</span>
          </div>
          <button className="bg-primary text-white px-12 py-5 rounded-2xl hover:bg-primary-accent hover:text-primary transition-all font-black uppercase text-sm tracking-widest shadow-xl">
            {dict.search_button}
          </button>

        </div>
      </motion.div>
    </section>
  );
}
