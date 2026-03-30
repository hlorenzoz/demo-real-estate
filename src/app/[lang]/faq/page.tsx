import React from "react";
import { getDictionary, Locale } from "../../../get-dictionary";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FAQSection from "../../../components/FAQSection";
import MotionWrapper from "../../../components/MotionWrapper";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.faq.title} | Real Estate`,
    description: dict.faq.subtitle,
  };
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen pt-24">
      <Navbar lang={locale} dict={dict.navbar} />
      
      <div className="bg-primary text-white py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-primary z-10" />
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] rounded-[100%] bg-primary-accent opacity-10 blur-[150px] animate-pulse" />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <MotionWrapper>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tighter italic gold-gradient">
              {dict.faq.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              {dict.faq.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </div>

      <FAQSection dict={dict.faq} lang={lang} />
      
      <Footer dict={dict.footer} lang={lang as Locale} />
    </main>
  );
}
