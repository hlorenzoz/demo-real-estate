"use client";
// Forced update to clear Turbopack cache - 2026-03-30T14:49:00
/**
 * NAVBAR COMPONENT
 * -----------------
 * This component is now fully refactored to be hydration-safe.
 * It uses a "mounted" state logic to handle client-only pathname data.
 * All links are rendered as Link components (anchor tags) from the start.
 * The server and initial client renders are identical at the tag level.
 * 
 * Version: 2.1 (Performance & Hydration Refactor)
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Dictionary } from "../get-dictionary";
import { getLocalizedPath, routeMappings, reverseMappings } from "../lib/routes";

interface NavbarProps {
  lang: "en" | "es";
  dict: Dictionary["navbar"];
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Avoid synchronous setState in effect for React 19 hydration safety
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMenuOpen(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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
    <nav className="fixed top-0 w-full z-[9999] px-6 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-3xl px-6 lg:px-8 py-5 border border-white/40 shadow-2xl backdrop-blur-3xl relative">
        <Link href={`/${lang}`} className="flex flex-col shrink-0">
          <span className="text-2xl lg:text-3xl font-serif text-primary tracking-tighter leading-none">Real Estate</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-text-muted mt-1 opacity-60">Real Estate</span>
        </Link>
        <div className="hidden min-[1100px]:flex items-center gap-8 xl:gap-10">
          <Link href={getLocalizedPath(lang, 'listings')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.listings}</Link>
          <Link href={getLocalizedPath(lang, 'alquiler')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.rentals}</Link>
          <Link href={`/${lang}/#${reverseMappings[lang]?.['vender'] || 'vender'}`} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.vender}</Link>
          <Link href={getLocalizedPath(lang, 'blog')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.blog}</Link>
          <Link href={getLocalizedPath(lang, 'faq')} className="text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">{dict.faq}</Link>
          
          <div className="flex items-center gap-4 pl-4 border-l border-black/5">
            <Link 
              href={mounted ? redirectedPathname("en") : "/en"}
              className={`text-xs font-black p-2 rounded-lg transition-all ${lang === "en" ? "bg-primary text-white" : "hover:bg-black/5"}`}
            >
              EN
            </Link>
            <Link 
              href={mounted ? redirectedPathname("es") : "/es"}
              className={`text-xs font-black p-2 rounded-lg transition-all ${lang === "es" ? "bg-primary text-white" : "hover:bg-black/5"}`}
            >
              ES
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="min-[1100px]:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-primary/5 rounded-2xl text-primary hover:bg-primary/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <Link 
            href={getLocalizedPath(lang, 'contact')}
            className="hidden sm:flex bg-primary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-accent hover:text-primary transition-all group shadow-xl shrink-0"
          >
            <span className="flex items-center gap-2">
              {dict.contactar} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile/Tablet Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 min-[1100px]:hidden z-[10000]"
            >
              <div className="flex flex-col gap-4">
                <Link href={getLocalizedPath(lang, 'listings')} className="p-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest border-b border-black/5">{dict.listings}</Link>
                <Link href={getLocalizedPath(lang, 'alquiler')} className="p-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest border-b border-black/5">{dict.rentals}</Link>
                <Link href={`/${lang}/#${reverseMappings[lang]?.['vender'] || 'vender'}`} className="p-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest border-b border-black/5">{dict.vender}</Link>
                <Link href={getLocalizedPath(lang, 'blog')} className="p-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest border-b border-black/5">{dict.blog}</Link>
                <Link href={getLocalizedPath(lang, 'faq')} className="p-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest">{dict.faq}</Link>
                
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl mt-2">
                  <div className="text-xs font-black uppercase tracking-widest text-text-muted">Language</div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={mounted ? redirectedPathname("en") : "/en"}
                      className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${lang === "en" ? "bg-primary text-white" : "hover:bg-black/5"}`}
                    >
                      EN
                    </Link>
                    <Link 
                      href={mounted ? redirectedPathname("es") : "/es"}
                      className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${lang === "es" ? "bg-primary text-white" : "hover:bg-black/5"}`}
                    >
                      ES
                    </Link>
                  </div>
                </div>

                <Link 
                  href={getLocalizedPath(lang, 'contact')}
                  className="sm:hidden bg-primary text-white text-center py-5 rounded-2xl font-black uppercase text-xs tracking-widest mt-2"
                >
                  {dict.contactar}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
