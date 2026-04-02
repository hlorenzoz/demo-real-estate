/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Property } from "../types/property";
import { Dictionary } from "../get-dictionary";

interface PropertiesCarouselProps {
  properties: Property[];
  lang: "en" | "es";
  dict: Dictionary["home"];
}

export default function PropertiesCarousel({ properties, lang, dict }: PropertiesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current as any;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
      
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      checkScroll();
    });
    const timer = setTimeout(checkScroll, 100);
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).window.addEventListener("resize", checkScroll);
    }
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      if (typeof (globalThis as any).window !== "undefined") {
        (globalThis as any).window.removeEventListener("resize", checkScroll);
      }
    };
  }, [properties]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Scroll by one card width (roughly)
      const el = scrollRef.current as any;
      const cardWidth = el.clientWidth / (typeof (globalThis as any).window !== "undefined" && (globalThis as any).window.innerWidth < 768 ? 1 : 3);
      el.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  if (properties.length === 0) return null;
  if (!mounted) return null;

  return (
    <div className="relative group/carousel pt-16 -mx-4 px-4 overflow-visible">
      {/* Navigation Arrows (Absolute to top right) */}
      <div className="absolute top-0 right-4 flex gap-3 z-30">
        <button
          onClick={() => scroll("left")}
          className={`w-12 h-12 rounded-2xl bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center text-primary shadow-sm transition-all hover:bg-primary hover:text-white active:scale-95 ${
            !canScrollLeft ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:scale-105"
          }`}
          disabled={!canScrollLeft}
          aria-label={dict.prev_properties || "Previous properties"}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scroll("right")}
          className={`w-12 h-12 rounded-2xl bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center text-primary shadow-sm transition-all hover:bg-primary hover:text-white active:scale-95 ${
            !canScrollRight ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:scale-105"
          }`}
          disabled={!canScrollRight}
          aria-label={dict.next_properties || "Next properties"}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Carousel Viewport (Native Scroll for Touch, Buttons for Click) */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] snap-start"
          >
            <PropertyCard property={property} lang={lang} dict={dict} />
          </motion.div>
        ))}
        {/* Buffer element to ensure the last card can snap properly on scroll-padding environments */}
        <div className="flex-shrink-0 w-1" />
      </div>

      {/* 3. Modern Scroll Indicator (Google Reviews Style) */}
      <div className="mt-8 flex items-center justify-center">
        <div className="w-48 h-[2px] bg-slate-100 rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#FACC15] shadow-[0_0_10px_rgba(250,204,21,1)]"
            style={{
              width: "30%",
            }}
            animate={{
              left: `${scrollProgress * 70}%`
            }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          />
        </div>
      </div>
    </div>
  );
}
