import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Dictionary, Locale } from "../get-dictionary";
import { getLocalizedPath } from "../lib/routes";
import { Property } from "../types/property";
import HeroSearchClient from "./HeroSearchClient";

interface HeroProps {
  dict: Dictionary["hero"];
  lang: Locale;
  properties: Property[];
}

export default function Hero({ dict, lang, properties }: HeroProps) {
  return (
    <section className="relative min-h-[850px] lg:h-screen flex items-center pt-32 lg:pt-20 overflow-hidden bg-primary">
      {/* Background Image - Priority and fetchPriority High */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 shadow-[inset_0_-200px_400px_-100px_rgba(0,0,0,0.8)]" />
        <Image 
          src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp" 
          alt={dict.title} 
          fill 
          sizes="100vw"
          className="object-cover"
          priority={true}
          fetchPriority="high"
          quality={70}
        />
      </div>
      
      {/* Hero Content - Server Rendered for LCP */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-0 lg:mt-[-10vh] pb-24 sm:pb-32 lg:pb-0 text-center lg:text-left">
        <div className="max-w-2xl text-white mx-auto lg:mx-0">
          <span className="bg-primary-accent text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl mb-2 lg:mb-8 inline-block shadow-2xl animate-fade-in">
            {dict.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-2 lg:mb-8 leading-[1.1] tracking-tighter">
            {dict.title} <span className="gold-gradient italic">{dict.title_accent}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 lg:mb-12 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
            {dict.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link 
              href={getLocalizedPath(lang, 'propiedades')} 
              className="bg-primary-accent text-primary px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all group shadow-2xl"
            >
              {dict.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Search - Client Component for interaction */}
      <HeroSearchClient dict={dict} lang={lang} properties={properties} />
    </section>
  );
}
