import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getDictionary, Locale } from "../../get-dictionary";
import { PWAInstaller } from "../../components/PWAInstaller";
import { CookieBanner } from "../../components/CookieBanner";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: "Demo Website | Real Estate",
    description: dict.metadata.description,
    keywords: dict.metadata.keywords.split(",").map((k: string) => k.trim()),
    openGraph: {
      title: "Demo Website | Real Estate",
      description: dict.metadata.description,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/favicon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
        <PWAInstaller />
        <CookieBanner />
      </body>
    </html>
  );
}

