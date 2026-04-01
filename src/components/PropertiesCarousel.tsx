/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof (globalThis as any).window !== "undefined") {
        const width = (globalThis as any).window.innerWidth;
        if (width < 768) {
          setItemsToDisplay(1);
        } else if (width < 1024) {
          setItemsToDisplay(2);
        } else {
          setItemsToDisplay(3);
        }
      }
    };

    handleResize();
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof (globalThis as any).window !== "undefined") {
        (globalThis as any).window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const totalItems = properties.length;
  const maxIndex = Math.max(0, totalItems - itemsToDisplay);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (properties.length === 0) return null;

  return (
    <div className="relative group pt-16">
      {/* Navigation Arrows */}
      {totalItems > itemsToDisplay && (
        <div className="absolute top-0 right-0 flex gap-4 z-30">
          <button
            onClick={prev}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-95"
            aria-label="Previous properties"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-95"
            aria-label="Next properties"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden px-4 -mx-4 py-8">
        <motion.div
          className="flex gap-8"
          animate={{
            x: `calc(-${currentIndex * (100 / itemsToDisplay)}% - ${currentIndex * (32 / itemsToDisplay)}px)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / itemsToDisplay}% - ${(32 * (itemsToDisplay - 1)) / itemsToDisplay}px)`,
              }}
            >
              <PropertyCard property={property} lang={lang} dict={dict} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination dots (mobile only) */}
      <div className="mt-8 flex justify-center gap-4 md:hidden">
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="group relative w-12 h-12 flex items-center justify-center"
            aria-label={`Property slide ${i + 1}`}
          >
            <div className={`transition-all rounded-full ${
              currentIndex === i ? "bg-primary w-8 h-2.5" : "bg-slate-300 w-2.5 h-2.5"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}
