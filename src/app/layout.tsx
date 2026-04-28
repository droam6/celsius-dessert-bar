import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.celsiusdessertbar.com.au";

export const metadata: Metadata = {
  title: "Celsius Dessert Bar | Live Liquid Nitrogen Gelato Sydney",
  description:
    "Sydney's premier liquid nitrogen gelato experience. Live theatre dessert catering for weddings, corporate events, and private parties. Crafted fresh at -196°C.",
  keywords: [
    "liquid nitrogen gelato Sydney",
    "dessert catering Sydney",
    "wedding dessert Sydney",
    "corporate event catering",
    "live gelato show",
    "Celsius Dessert Bar",
    "Chatswood gelato",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-AU": siteUrl,
    },
  },
  openGraph: {
    title: "Celsius Dessert Bar | Live Liquid Nitrogen Gelato Sydney",
    description:
      "Sydney's premier liquid nitrogen gelato experience. Live theatre dessert catering for weddings, corporate events, and private parties.",
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Celsius Dessert Bar",
    images: [
      {
        url: `${siteUrl}/images/celsius-logo.png`,
        width: 1200,
        height: 630,
        alt: "Celsius Dessert Bar — Live Liquid Nitrogen Gelato Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celsius Dessert Bar | Live Liquid Nitrogen Gelato Sydney",
    description:
      "Sydney's premier liquid nitrogen gelato experience. Live theatre dessert catering for weddings, corporate events, and private parties.",
    images: [`${siteUrl}/images/celsius-logo.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  additionalType: "https://schema.org/CateringService",
  name: "Celsius Dessert Bar",
  legalName: "Celsius Dessert Bar",
  url: siteUrl,
  logo: `${siteUrl}/images/celsius-logo.png`,
  image: `${siteUrl}/images/celsius-logo.png`,
  description:
    "Sydney's premier liquid nitrogen gelato experience — live dessert catering for weddings, corporate events, brand activations, and private celebrations.",
  telephone: "+61 451 073 136",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kiosk 4, Chatswood Bus Interchange, 436 Victoria Avenue",
    addressLocality: "Chatswood",
    addressRegion: "NSW",
    postalCode: "2067",
    addressCountry: "AU",
  },
  openingHours: ["Mo-Fr 07:00-17:00", "Sa-Su 12:00-17:00"],
  sameAs: ["https://www.instagram.com/celsiusdessertbar/"],
  areaServed: {
    "@type": "City",
    name: "Sydney",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Liquid Nitrogen Gelato Catering Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Classic Package",
          description:
            "Up to 100 guests · 2 signature flavours · 2 chefs · 1 hour live nitrogen show · full equipment, setup and pack-down.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Signature Package",
          description:
            "Up to 150 guests · 2 signature flavours · 2 chefs · 1 hour live nitrogen show · full equipment, setup and pack-down.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Premium Package",
          description:
            "150+ guests · 2 signature flavours plus a custom flavour designed for your event · 2 chefs · 1.5 hour live nitrogen show · full equipment, setup and pack-down.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AWAITING_GTM_ID — Google Tag Manager snippet goes here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSerif.variable} ${dmSans.variable}`}>
        {/* AWAITING_GTM_ID — Google Tag Manager noscript goes here */}
        {children}
      </body>
    </html>
  );
}
