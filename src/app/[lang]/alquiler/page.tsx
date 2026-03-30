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
import { Property } from "../../../types/property";

import baseContentRaw from "../../../../base-content.json";

const baseContent = baseContentRaw as {
  properties: Property[];
};

interface Props {
  params: Promise<{ lang: "en" | "es" }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.navbar.rentals;
  return {
    title: `${title} | ${dict.metadata.title}`,
    description: dict.properties_page.subtitle,
  };
}

export default async function AlquilerPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.navbar.rentals;

  // Filter properties by rent
  const rentalProperties = baseContent.properties.filter(p => p.contractType === "rent");

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
            <span className="text-primary">{title}</span>
          </div>

          <MotionWrapper>
            <h1 className="text-5xl md:text-8xl font-serif text-primary italic mb-6 tracking-tight leading-none">
              {title}
            </h1>
            <p className="text-xl text-text-muted font-light italic max-w-2xl">
              {dict.properties_page.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Properties Grid with Client-side Filtering */}
      <PropertiesClientPage
        properties={rentalProperties}
        lang={lang}
        dict={dict}
      />

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
