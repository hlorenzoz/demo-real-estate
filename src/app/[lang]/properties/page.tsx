import React, { Suspense } from "react";
import { getDictionary, Locale } from "@/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertiesClientPage from "../listings/PropertiesClientPage";
import { getBaseContent } from "@/lib/content";

/**
 * Unified Properties Page — shows ALL properties (for sale + for rent).
 * The contract-type filter pills (All / For Sale / For Rent) are visible so
 * visitors can narrow down by transaction type.
 */
export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseContent = getBaseContent();

  // Show every property — no pre-filtering
  const properties = baseContent.properties;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />

      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
        <PropertiesClientPage
          properties={properties}
          lang={lang as Locale}
          dict={dict}
          showContractFilters={true}
        />
      </Suspense>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
