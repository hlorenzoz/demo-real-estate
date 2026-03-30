import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import PropertiesClientPage from "../propiedades/PropertiesClientPage";
import { Home } from "lucide-react";
import { getLocalizedPath } from "../../../lib/routes";

import baseContent from "../../../../base-content.json";
import { Property } from "../../../types/property";

interface Props {
  params: Promise<{ lang: "en" | "es" }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.navbar.listings} | ${dict.metadata.title}`,
    description: dict.properties_page.subtitle,
  };
}

export default async function ListingsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Filter ONLY for sale properties as requested
  const saleProperties = (baseContent.properties as Property[]).filter(
    (p) => p.contractType === "sale"
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang} dict={dict.navbar} />

      {/* Page Hero */}
      <section className="pt-40 pb-20 px-6 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted mb-8">
            <Link href={getLocalizedPath(lang, '/')} className="hover:text-primary-accent transition-colors flex items-center gap-1">
              <Home size={12} />
              {dict.navbar.home}
            </Link>
            <span>/</span>
            <span className="text-primary">{dict.navbar.listings}</span>
          </div>

          <MotionWrapper>
            <h1 className="text-5xl md:text-8xl font-serif text-primary italic mb-6 tracking-tight leading-none">
              {dict.navbar.listings}
            </h1>
            <p className="text-xl text-text-muted font-light italic max-w-2xl">
              {dict.home.property_subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Properties Grid with Client-side Filtering */}
      <PropertiesClientPage
        properties={saleProperties}
        lang={lang}
        dict={dict}
      />

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
