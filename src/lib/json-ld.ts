/**
 * Générateurs d'objets JSON-LD (schema.org) — centralisés et typés.
 *
 * Tout le balisage structuré du site est produit ici, à partir de la source
 * unique du NAP (`@/data/site`). Le rendu se fait via le composant
 * `<JsonLd>` (voir `@/components/seo/JsonLd`), en Server Component, pour rester
 * 100 % dans le HTML initial (aucun JSON-LD côté client).
 */

import { SITE, addressInline, socialLinks } from "@/data/site";
import { zones } from "@/data/zones";

/** Objet JSON-LD générique. */
export type JsonLdObject = Record<string, unknown>;

/** URL absolue à partir d'un chemin relatif, basée sur SITE.url. */
export const absoluteUrl = (path = "/"): string =>
  new URL(path, SITE.url).toString();

/**
 * Bloc `PostalAddress` réutilisable.
 */
const postalAddress = (): JsonLdObject => ({
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  postalCode: SITE.address.postalCode,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
});

/**
 * `openingHoursSpecification` couvrant 24h/24, 7j/7.
 */
const openingHours = (): JsonLdObject => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: SITE.openingHours.days,
  opens: SITE.openingHours.opens,
  closes: SITE.openingHours.closes,
});

/**
 * Zones desservies (`areaServed`), dérivées des données de zones.
 * Utilisé pour le LocalBusiness global ; les pages zone peuvent cibler une
 * seule zone via l'argument `areaServed`.
 */
const defaultAreaServed = (): JsonLdObject[] =>
  zones.map((z) => ({
    "@type": "City",
    name: z.nomComplet,
  }));

/**
 * Schéma `LocalBusiness` / `Locksmith` — carte d'identité de l'entreprise.
 *
 * @param options.areaServed  Restreint la zone desservie (pages zone). Par
 *                            défaut : toutes les zones connues.
 * @param options.id          `@id` stable (ancrage entre schémas). Par défaut
 *                            l'URL du site + #locksmith.
 */
export function localBusinessSchema(options?: {
  areaServed?: JsonLdObject[];
  url?: string;
}): JsonLdObject {
  const geoAvailable =
    SITE.geo.latitude !== null && SITE.geo.longitude !== null;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Locksmith"],
    "@id": absoluteUrl("/#locksmith"),
    name: SITE.name,
    url: options?.url ? absoluteUrl(options.url) : SITE.url,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: postalAddress(),
    ...(geoAvailable
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: SITE.geo.latitude,
            longitude: SITE.geo.longitude,
          },
        }
      : {}),
    areaServed: options?.areaServed ?? defaultAreaServed(),
    openingHoursSpecification: [openingHours()],
    priceRange: SITE.priceRange,
    foundingDate: String(SITE.foundingYear),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
    description: `Serrurier à Lyon et dans le Grand Lyon depuis ${SITE.foundingYear}. Dépannage d'urgence 24h/24 7j/7, portes blindées, serrures haute sécurité. ${addressInline}.`,
  };
}
