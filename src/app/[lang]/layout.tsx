import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import { PWAProvider } from "../../components/PWAProvider";
import { getDictionary, Locale } from "../../get-dictionary";
import { PWAInstaller } from "../../components/PWAInstaller";
import { CookieBanner } from "../../components/CookieBanner";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    metadataBase: new URL("https://demo-realestate.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    title: "Demo Website | Real Estate",
    description: dict.metadata.description,
    keywords: dict.metadata.keywords.split(",").map((k: string) => k.trim()),
    manifest: "/manifest.json",
    openGraph: {
      title: "Demo Website | Real Estate",
      description: dict.metadata.description,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
      url: `https://demo-realestate.com/${lang}`,
      images: [
        {
          url: "https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp",
          width: 1200,
          height: 630,
          alt: "Luxury Real Estate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Demo Website | Real Estate",
      description: dict.metadata.description,
      images: ["https://cdn.hlorenzoz.com/demo-real-estate/real-estate/hero-1.webp"],
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
    other: {
      "preconnect": "https://cdn.hlorenzoz.com",
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

import { UIOverlayProvider } from "../../context/UIOverlayContext";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locales = ["en", "es"];
  
  if (!locales.includes(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to the CDN for faster initial connection */}
        <link rel="preconnect" href="https://cdn.hlorenzoz.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {process.env.NODE_ENV === "production" ? (
          <PWAProvider swUrl="/sw.js" />
        ) : (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (let registration of registrations) {
                      registration.unregister();
                    }
                  });
                }
              `,
            }}
          />
        )}
        <UIOverlayProvider>
          {children}
          <PWAInstaller lang={locale} />
          <CookieBanner dict={dict} />
          <WhatsAppButton prompt={dict.home.whatsapp_prompt} />
        </UIOverlayProvider>
      </body>
    </html>
  );
}


