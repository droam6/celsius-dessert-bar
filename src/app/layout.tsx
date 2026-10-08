import type { Metadata } from "next";
import localFont from "next/font/local";
import agencyData from "@data/agency.json";
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
const business = agencyData.business;

const title = "Liquid Nitrogen Gelato Catering Sydney | Celsius Dessert Bar";
const description =
  "Liquid nitrogen gelato, frozen live at your event at \u2212196\u00b0C. Dessert catering for corporate events, brand launches and weddings across Sydney.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: business.name,
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Celsius Dessert Bar: liquid nitrogen gelato catering in Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/images/og-default.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

// Structured data is built from data/agency.json so it can never drift from the page.
// IceCreamShop is the schema.org type for the kiosk; the event packages are listed as services.
const dayCodes: Record<string, string[]> = {
  "Mon – Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "Sat – Sun": ["Saturday", "Sunday"],
};

function to24h(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return t;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  "@id": `${siteUrl}/#business`,
  name: business.name,
  legalName: business.legal_name,
  url: siteUrl,
  logo: `${siteUrl}/images/celsius-logo.png`,
  image: `${siteUrl}/images/og-default.jpg`,
  description:
    "Liquid nitrogen gelato, frozen live at events across Sydney. Dessert catering for corporate events, brand activations, launches and weddings.",
  telephone: `+61 ${business.phone.replace(/^0/, "")}`,
  email: business.email,
  servesCuisine: "Gelato",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: "AU",
  },
  hasMap: business.google_maps_url,
  openingHoursSpecification: business.hours
    .filter((slot) => dayCodes[slot.days])
    .map((slot) => {
      const [opens, closes] = slot.hours.split("–").map(to24h);
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayCodes[slot.days],
        opens,
        closes,
      };
    }),
  sameAs: [business.social.instagram].filter(Boolean),
  areaServed: { "@type": "City", name: "Sydney" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Liquid nitrogen gelato catering packages",
    itemListElement: agencyData.packages.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: "Dessert catering",
        name: `${p.name} package`,
        description: `${p.guests} guests. ${p.flavours}. ${p.service}. Includes ${agencyData.packages_included
          .join(", ")
          .toLowerCase()}.`,
      },
    })),
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
        <link rel="preconnect" href="https://i.ytimg.com" />
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
