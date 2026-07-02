import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { SITE } from "@/data/site";
import { localBusinessSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/layout/StickyCallButton";
import { MotionProvider } from "@/components/motion/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Image de partage par défaut (Open Graph / Twitter). Fichier statique dans
 * `public/`, résolu en URL absolue via `metadataBase`. Design sobre aux
 * couleurs du site (fond sombre, or), sans photo stock.
 */
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — serrurier 24/7 à Lyon et dans le Grand Lyon`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Serrurier à Lyon 24h/24 7j/7`,
    template: `%s | ${SITE.name}`,
  },
  description:
    `Serrurier à Lyon et dans le Grand Lyon depuis ${SITE.foundingYear}. ` +
    "Dépannage d'urgence 24h/24 7j/7, ouverture de porte, portes blindées et " +
    "serrures haute sécurité. Intervention rapide sur les 9 arrondissements et " +
    "le Grand Lyon.",
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    title: `${SITE.name} — Serrurier à Lyon 24h/24 7j/7`,
    description:
      "Dépannage serrurerie d'urgence, portes blindées et serrures haute " +
      "sécurité à Lyon et dans le Grand Lyon.",
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Serrurier à Lyon 24h/24 7j/7`,
    description:
      "Dépannage serrurerie d'urgence, portes blindées et serrures haute " +
      "sécurité à Lyon et dans le Grand Lyon.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* JSON-LD LocalBusiness global, présent sur toutes les pages */}
        <JsonLd schema={localBusinessSchema()} />

        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCallButton />
        </MotionProvider>
      </body>
    </html>
  );
}
