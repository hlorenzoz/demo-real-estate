"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Globe } from "lucide-react";

import { Dictionary } from "../get-dictionary";
import { getLocalizedPath, routeMappings, reverseMappings } from "../lib/routes";

interface NavbarProps {
  lang: "en" | "es";
  dict: Dictionary["navbar"];
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();

  const redirectedPathname = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    
    const segments = pathname.split("/");
    // Segments example: ['', 'en', 'properties']
    const currentLocale = segments[1];
    const currentSlug = segments[2];

    if (currentLocale && currentSlug && routeMappings[currentLocale]) {
      // Find internal ID for current slug (e.g. 'properties' -> 'propiedades')
      const internalSlug = routeMappings[currentLocale][currentSlug];
      
      if (internalSlug) {
        // Get user-facing slug for target language (e.g. 'propiedades' -> 'properties' or stays 'propiedades')
        const targetSlug = reverseMappings[targetLocale]?.[internalSlug] || internalSlug;
        const newSegments = [...segments];
        newSegments[1] = targetLocale;
        newSegments[2] = targetSlug;
        return newSegments.join("/");
      }
    }
    
    const newSegments = [...segments];
    newSegments[1] = targetLocale;
    return newSegments.join("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-3xl px-8 py-5 border border-white/40 shadow-2xl backdrop-blur-3xl">
        <Link href={`/${lang}`} className="flex flex-col">
          <span className="text-3xl font-serif text-primary tracking-tighter leading-none">Real Estate</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-text-muted mt-1 opacity-60">Real Estate</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href={getLocalizedPath(lang, 'propiedades')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.propiedades}</Link>
          <Link href={getLocalizedPath(lang, 'alquiler')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.rentals}</Link>
          <Link href={`/${lang}/#vender`} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.vender}</Link>
          <Link href={`/${lang}/#nosotros`} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.nosotros}</Link>
          <Link href={getLocalizedPath(lang, 'blog')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.blog}</Link>
          <Link href={getLocalizedPath(lang, 'faq')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.faq}</Link>
          
          <div className="flex items-center gap-4 pl-4 border-l border-black/5">
            <Link 
              href={redirectedPathname("en")}
              className={`text-xs font-black p-2 rounded-lg transition-all ${lang === "en" ? "bg-primary text-white" : "hover:bg-black/5"}`}
            >
              EN
            </Link>
            <Link 
              href={redirectedPathname("es")}
              className={`text-xs font-black p-2 rounded-lg transition-all ${lang === "es" ? "bg-primary text-white" : "hover:bg-black/5"}`}
            >
              ES
            </Link>
          </div>
        </div>
        <Link 
          href={getLocalizedPath(lang, 'contactar')}
          className="bg-primary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-accent hover:text-primary transition-all group shadow-xl"
        >
          <span className="flex items-center gap-2">
            {dict.contactar} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
