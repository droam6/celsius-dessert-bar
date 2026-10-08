import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (SIL Open Font Licence, see src/fonts). No third-party font request.
const bodoni = localFont({
  src: [
    { path: "../fonts/bodoni-moda-latin-opsz-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../fonts/bodoni-moda-latin-opsz-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

const hanken = localFont({
  src: "../fonts/hanken-grotesk-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
});

const siteUrl = "https://www.celsiusdessertbar.com.au";

export const metadata: Metadata = {
  title: "Celsius Dessert Bar | Live Liquid Nitrogen Gelato Sydney",
  description:
    "Liquid nitrogen gelato, frozen live at your event at \u2212196\u00b0C. Dessert catering for corporate events, brand launches and weddings across Sydney.",
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
      "Liquid nitrogen gelato, frozen live at your event. Dessert catering for corporate events, brand launches and weddings across Sydney.",
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Celsius Dessert Bar",
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
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
      "Liquid nitrogen gelato, frozen live at your event. Dessert catering for corporate events, brand launches and weddings across Sydney.",
    images: [`${siteUrl}/images/og-default.jpg`],
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
  image: `${siteUrl}/images/og-default.jpg`,
  description:
    "Liquid nitrogen gelato, frozen live at events across Sydney. Dessert catering for corporate events, brand activations, launches and weddings.",
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
    <html lang="en-AU" className={`${bodoni.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that script is running, so scroll entrances only hide content when they can also show it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js='1'" }} />
        {/* AWAITING_GTM_ID — Google Tag Manager snippet goes here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* AWAITING_GTM_ID — Google Tag Manager noscript goes here */}
        {children}
      </body>
    </html>
  );
}
