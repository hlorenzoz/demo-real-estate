import React, { Suspense } from "react";
import { getDictionary, Locale } from "@/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertiesClientPage from "./PropertiesClientPage";
import { getBaseContent } from "@/lib/content";

export default async function listingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseContent = getBaseContent();
  
  // Filter for sale
  const properties = baseContent.properties.filter(p => p.contractType === 'sale');

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
        <PropertiesClientPage 
          properties={properties} 
          lang={lang as Locale} 
          dict={dict} 
        />
      </Suspense>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
