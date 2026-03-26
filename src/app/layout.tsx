import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "INMO3 - Inmobiliaria en Xinzo de Limia | Compra, Venta y Alquiler",
  description: "Encuentra tu hogar en Xinzo de Limia con INMO3. Inmobiliaria de confianza con atención personalizada, tasaciones gratuitas y profesionalismo garantizado.",
  keywords: ["inmobiliaria xinzo de limia", "viviendas ourense", "alquiler xinzo de limia", "tasacion propiedades galicia", "inmo3"],
  openGraph: {
    title: "INMO3 - Inmobiliaria de Confianza en Xinzo de Limia",
    description: "Profesionalismo y calidez humana en cada transacción inmobiliaria en la zona de A Limia.",
    url: "https://inmo3.es",
    siteName: "INMO3",
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "INMO3 Inmobiliaria",
    "image": "https://cdn.hlorenzoz.com/images/inmobiliary_inmo3/hero.webp",
    "@id": "https://inmo3.es",
    "url": "https://inmo3.es",
    "telephone": "+34988461585",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rúa Río Sil, 9",
      "addressLocality": "Xinzo de Limia",
      "addressRegion": "Ourense",
      "postalCode": "32630",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.0641,
      "longitude": -7.7225
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:30",
      "closes": "20:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "8"
    }
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
