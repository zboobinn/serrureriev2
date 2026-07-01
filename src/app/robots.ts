import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/json-ld";

/**
 * robots.txt généré par code.
 *
 * - Autorise le crawl de tout le site indexable.
 * - Bloque uniquement /api/ (routes techniques, non indexables — ex. le
 *   handler du formulaire de contact). Aucune page de contenu n'est bloquée.
 * - Déclare le sitemap sur le domaine canonique (serrurerie-roland.com).
 *
 * Note : le noindex du blog est géré page par page via l'API `metadata`
 * (robots meta), pas ici — on évite de bloquer le crawl de pages qu'on
 * voudra faire indexer plus tard.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
