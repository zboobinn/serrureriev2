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
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Zoom utilisateur désactivé (`maximumScale: 1, userScalable: false`) : le
 * design (CTA plein écran, bouton flottant) est pensé pour une largeur fixe
 * device-width — un pinch-zoom laisse voir du vide au-delà du contenu rendu.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
