"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import MotionWrapper from "./MotionWrapper";
import FAQSchema from "./FAQSchema";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  dict: {
    title: string;
    subtitle: string;
    cta_all: string;
    items: FAQItem[];
  };
  lang: string;
  limit?: number;
}

export default function FAQSection({ dict, lang, limit }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = limit ? dict.items.slice(0, limit) : dict.items;

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-primary tracking-tight">
            {dict.title}
          </h2>
          <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
            {dict.subtitle}
          </p>
        </MotionWrapper>

        <div className="space-y-4">
          {items.map((item, i) => (
            <MotionWrapper key={i} delay={i * 0.05}>
              <div 
                className={`group border border-slate-100 rounded-[32px] overflow-hidden transition-all duration-500 bg-white ${
                  openIndex === i ? "shadow-[0_20px_50px_rgba(0,0,0,0.06)] scale-[1.01]" : "hover:shadow-lg"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-8 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      openIndex === i ? "bg-primary text-white rotate-[360deg]" : "bg-slate-50 text-primary-accent-dark group-hover:bg-primary-accent group-hover:text-white"
                    }`}>
                      <HelpCircle size={24} />
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${
                      openIndex === i ? "text-primary" : "text-slate-600"
                    }`}>
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`text-slate-300 transition-transform duration-500 ease-in-out ${
                      openIndex === i ? "rotate-180 text-primary-accent-dark" : ""
                    }`} 
                    size={24} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 pt-0 ml-[72px]">
                    <p className="text-lg text-text-muted leading-relaxed font-bold border-l-2 border-primary-accent/20 pl-6 py-2">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {limit && (
          <MotionWrapper className="mt-16 text-center" delay={0.4}>
            <Link 
              href={`/${lang}/faq`} 
              className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl border border-slate-100 group"
            >
              {dict.cta_all} 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MotionWrapper>
        )}
      </div>

      {/* Structured Data for SEO */}
      <FAQSchema items={items} />
    </section>
  );
}
