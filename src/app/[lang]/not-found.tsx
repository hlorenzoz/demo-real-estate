"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Home, Search } from "lucide-react";
import { getLocalizedPath } from "@/lib/routes";

export default function NotFound() {
  const params = useParams();
  const lang = params?.lang as string || "en";

  const dict = {
    en: {
      title: "A Luxurious Mistake?",
      subtitle: "The property or page you are looking for has moved or no longer exists in our exclusive collection.",
      cta: "Return to the Collection",
      home: "Go to Home",
    },
    es: {
      title: "¿Un Desvío Inesperado?",
      subtitle: "La propiedad o página seleccionada no se encuentra disponible actualmente en nuestra colección exclusiva.",
      cta: "Volver a la Colección",
      home: "Ir al Inicio",
    }
  }[lang as "en" | "es"] || {
    title: "A Luxurious Mistake?",
    subtitle: "The property or page you are looking for has moved or no longer exists in our exclusive collection.",
    cta: "Return to the Collection",
    home: "Go to Home",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      
      {/* 1. Perspective Background (Luxury Feel) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-slate-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px]" />
      </div>

      {/* 2. Top Navigation (Logo only) */}
      <header className="relative z-50 px-8 py-10 flex justify-between items-center max-w-7xl mx-auto w-full">
         <Link href={`/${lang}`} className="flex flex-col shrink-0">
          <span className="text-2xl lg:text-3xl font-serif text-primary tracking-tighter leading-none">Real Estate</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-text-muted mt-1 opacity-60">Real Estate</span>
        </Link>
      </header>

      {/* 3. Main Content Grid */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center py-12">
          
          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-slate-100 rounded-[64px] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[48px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.12)] border-8 border-white">
              <Image
                src="/images/luxury_404_illustration.webp"
                alt="Empty luxury villa hallway"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating 404 Badge */}
              <div className="absolute top-10 right-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 text-white text-center shadow-2xl">
                <div className="text-6xl font-serif font-black tracking-tighter">404</div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] mt-1 opacity-80 whitespace-nowrap">Page not found</div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-primary-accent-dark px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
                <Search size={14} strokeWidth={3} />
                Asset Discovery Lost
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-800 leading-[1.1] tracking-tighter mb-8 italic">
                {dict.title}
              </h1>
              
              <p className="text-xl font-bold text-slate-500 leading-relaxed max-w-md mb-12">
                {dict.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link
                  href={getLocalizedPath(lang, 'listings')}
                  className="group relative inline-flex items-center justify-center gap-3 bg-primary-accent-dark text-white px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(30,58,138,0.3)] hover:shadow-[0_25px_60px_rgba(30,58,138,0.4)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {dict.cta}
                  <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href={`/${lang}`}
                  className="inline-flex items-center justify-center gap-3 bg-white text-slate-700 border-2 border-slate-100 px-10 py-5 rounded-full font-black text-lg transition-all hover:bg-slate-50 hover:border-slate-200 active:scale-95"
                >
                  <Home size={20} />
                  {dict.home}
                </Link>
              </div>
            </motion.div>

            {/* Assistance Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-20 pt-12 border-t border-slate-100 w-full"
            >
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Immediate Concierge Assistance</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-sm font-bold text-slate-600 underline underline-offset-4 decoration-slate-200">Help Center</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-sm font-bold text-slate-600 underline underline-offset-4 decoration-slate-200 uppercase tracking-tighter">Report Missing Listing</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* 4. Minimal Decorative Footer */}
      <footer className="p-10 border-t border-slate-50 flex justify-center text-xs font-bold text-slate-300 uppercase tracking-widest">
         © 2026 Luxury Living Estate · High Performance 404 Logic
      </footer>
    </div>
  );
}
