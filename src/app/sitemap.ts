import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/json-ld";
import { allZoneSlugs, ZONE_URL_PREFIX }  from "@/data/zones"; 
import { services, serviceHref } from "@/data/services";

/**
 * Sitemap dynamique — généré par code, basé sur les sources uniques de données.
 *
 * ⚠️ Invariant SEO : ce sitemap ne doit contenir QUE des URL indexables
 * (cohérence sitemap ↔ balise robots des pages). Toute page passée en
 * `robots: { index: false }` doit être EXCLUE ici.
 *   → Le blog (`/blog` + articles) est volontairement absent tant qu'il est en
 *     noindex (thin content). Il sera ajouté quand il repassera en index.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Pages principales + hubs (toutes indexables).
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/zones"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/a-propos"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/mentions-legales"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/politique-de-confidentialite"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  // 6 pages services — URL dérivées de la source unique (@/data/services).
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(serviceHref(service)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 22 pages zones — URL dérivées de la source unique (allZoneSlugs),
  // jamais écrites en dur. Chemin = /zones/serrurier-{slug}.
  const zonePages: MetadataRoute.Sitemap = allZoneSlugs.map((slug) => ({
    url: absoluteUrl(`${ZONE_URL_PREFIX}${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...zonePages];
}
