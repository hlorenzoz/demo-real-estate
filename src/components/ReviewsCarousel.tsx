"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { Dictionary } from "../get-dictionary";

interface Review {
  author: string;
  date: string;
  rating: number;
  content: string;
}

interface Stats {
  average: number;
  count: number;
  label: string;
  platform: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  stats: Stats;
  dict: Dictionary["reviews"];
}

const GoogleLogo = () => (
  <div className="flex items-center gap-[1px] font-bold text-2xl tracking-tighter" aria-label="Google">
    <span className="text-blue-500">G</span>
    <span className="text-red-500">o</span>
    <span className="text-yellow-500">o</span>
    <span className="text-blue-500">g</span>
    <span className="text-green-500">l</span>
    <span className="text-red-500">e</span>
  </div>
);

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={`${
          i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    ))}
  </div>
);

export default function ReviewsCarousel({ reviews, stats, dict }: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mounted, setMounted] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      checkScroll();
    });
    const timer = setTimeout(checkScroll, 500);
    window.addEventListener("resize", checkScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [reviews]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full relative overflow-visible mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        
        {/* 1. Stats Bar (Premium Stacked Design) */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 mb-16 pb-12 border-b border-slate-50">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                {dict.stats_label}
              </h3>
              <div className="h-4 w-[2px] bg-slate-100 hidden md:block" />
              <StarRating rating={5} size={32} />
            </div>
            <p className="text-lg font-bold text-slate-600">
              {dict.based_on} <span className="underline decoration-slate-200 decoration-2 underline-offset-4 text-slate-700">{stats.count} {dict.reviews_count}</span>
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <GoogleLogo />
            <a 
              href="https://maps.google.com" 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors bg-blue-50 px-5 py-2 rounded-full"
            >
              {dict.view_all} <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* 2. Carousel Container */}
        <div className="relative group/carousel">
          
          {/* Viewport */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex-shrink-0 w-[380px] snap-center"
              >
                <div className="h-[400px] bg-white border border-slate-100 rounded-[48px] p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition-all flex flex-col group/card relative">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-primary-accent font-black text-2xl border border-white shadow-sm transition-colors group-hover/card:bg-primary group-hover/card:text-white">
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-lg leading-tight tracking-tight">{review.author}</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{review.date}</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-50 flex items-center justify-center font-black text-xs text-blue-500">
                      G
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6 flex gap-1">
                    <StarRating rating={review.rating} size={22} />
                  </div>

                  {/* Content (Scrollable) */}
                  <div className="flex-grow min-h-0 relative">
                    <div className="h-full overflow-y-auto pr-4 text-slate-600 leading-relaxed font-bold text-base scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                      {review.content || (
                        <span className="italic opacity-30 font-medium">{dict.no_content}</span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between opacity-60 group-hover/card:opacity-100 transition-opacity">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank"
                      className="text-yellow-600 font-black text-sm uppercase tracking-[0.2em] transition-all hover:translate-x-2"
                      aria-label={`${dict.read_more} for review by ${review.author}`}
                    >
                      {dict.read_more}
                    </a>
                    <ExternalLink size={16} className="text-slate-100" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls Box */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex justify-between px-2 md:flex lg:px-4">
             <button
              onClick={() => scroll("left")}
              aria-label="Previous reviews"
              className={`pointer-events-auto w-14 h-14 rounded-full bg-white/95 backdrop-blur shadow-2xl border border-slate-100 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                !canScrollLeft ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              <ChevronLeft size={32} className="text-primary-accent" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next reviews"
              className={`pointer-events-auto w-14 h-14 rounded-full bg-white/95 backdrop-blur shadow-2xl border border-slate-100 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                !canScrollRight ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              <ChevronRight size={32} className="text-primary-accent" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
