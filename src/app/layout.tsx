import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { SITE_CONFIG } from "@/data/siteConfig";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: "ATHANG IMPEX | Indian Dehydrated Food Ingredients Exporter",
    template: "%s | ATHANG IMPEX",
  },
  description:
    "Explore ATHANG IMPEX, an Indian merchant exporter of dehydrated onion powder, onion flakes, tomato powder, and ginger powder for international food manufacturers.",
  keywords: [
    "Dehydrated onion powder exporter India",
    "Dehydrated onion flakes supplier India",
    "Dehydrated tomato powder exporter",
    "Dehydrated ginger powder exporter",
    "Indian food ingredients exporter",
    "Dehydrated food products supplier",
    "Indian merchant exporter",
    "Bulk dehydrated food ingredients",
    "ATHANG IMPEX",
  ],
  authors: [{ name: "ATHANG IMPEX" }],
  creator: "ATHANG IMPEX",
  publisher: "ATHANG IMPEX",
  formatDetection: {
    email: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_CONFIG.baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.baseUrl,
    siteName: SITE_CONFIG.name,
    title: "ATHANG IMPEX | Indian Dehydrated Food Ingredients Exporter",
    description:
      "Explore ATHANG IMPEX, an Indian merchant exporter of dehydrated onion powder, onion flakes, tomato powder, and ginger powder.",
    images: [
      {
        url: "/images/hero/hero-ingredients.svg",
        width: 1600,
        height: 1000,
        alt: "ATHANG IMPEX - Quality Indian Dehydrated Food Ingredients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATHANG IMPEX | Indian Dehydrated Food Ingredients Exporter",
    description:
      "Explore ATHANG IMPEX, an Indian merchant exporter of dehydrated onion powder, onion flakes, tomato powder, and ginger powder.",
    images: ["/images/hero/hero-ingredients.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/images/logo.svg`,
    description: SITE_CONFIG.seoDescription,
    telephone: SITE_CONFIG.salesWhatsApp.number,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.salesWhatsApp.number,
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.chatbotWhatsApp.number,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-ivory text-charcoal selection:bg-gold selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
