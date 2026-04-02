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
        {/* LCP Optimization: Use a gradient instead of expensive shadow-inset for the background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
        <Image 
          src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp" 
          alt={dict.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
          priority={true}
          fetchPriority="high"
          quality={70}
        />
      </div>
      
      {/* Hero Content - Server Rendered for LCP */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-0 lg:mt-[-10vh] pb-24 sm:pb-32 lg:pb-0 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start max-w-4xl mx-auto lg:mx-0">
          {/* LCP Optimization: Removed backdrop-blur for faster paint on mobile */}
          <span className="bg-primary-accent text-black border border-primary-accent/20 px-6 py-2 rounded-xl mb-4 lg:mb-8 inline-block shadow-2xl animate-fade-in text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] leading-none">
            {dict.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-4 lg:mb-8 leading-[1.1] tracking-tighter text-white [text-rendering:optimizeLegibility] [transform:translateZ(0)]">
            {dict.title} <br/> 
            <span className="gold-gradient italic">{dict.title_accent}</span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-white/90 font-medium max-w-2xl mx-auto lg:mx-0 mb-10 lg:mb-12 animate-fade-in [animation-delay:200ms] leading-relaxed italic">
            {dict.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center lg:items-start gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link 
              href={getLocalizedPath(lang, 'properties')} 
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
