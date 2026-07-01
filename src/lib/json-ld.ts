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
import { reviews, averageRating, reviewCount } from "@/data/reviews";

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
 * Ce schéma est répété sur plusieurs pages (accueil, pages zone) mais
 * représente TOUJOURS la même entité : `@id` et `url` restent donc constants
 * (ancrés sur l'accueil) quelle que soit la page qui l'injecte. Ne jamais
 * faire varier `url` avec la page courante — ce serait un signal contradictoire
 * pour Google sur l'URL canonique de l'entité.
 *
 * @param options.areaServed     Restreint la zone desservie (pages zone). Par
 *                               défaut : toutes les zones connues.
 * @param options.includeReviews N'ajoute `aggregateRating`/`review` que sur
 *                               la page où les avis sont réellement affichés
 *                               (l'accueil) — jamais sur une page où ils ne
 *                               sont pas visibles à l'écran.
 */
export function localBusinessSchema(options?: {
  areaServed?: JsonLdObject[];
  includeReviews?: boolean;
}): JsonLdObject {
  const geoAvailable =
    SITE.geo.latitude !== null && SITE.geo.longitude !== null;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Locksmith"],
    "@id": absoluteUrl("/#locksmith"),
    name: SITE.name,
    url: SITE.url,
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
    ...(options?.includeReviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating,
            reviewCount,
            bestRating: 5,
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
            reviewBody: r.text,
          })),
        }
      : {}),
  };
}

/**
 * Schéma `Service` — utilisé sur chaque page service.
 */
export function serviceSchema(service: {
  slug: string;
  nom: string;
  description: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.nom,
    name: service.nom,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": ["LocalBusiness", "Locksmith"],
      "@id": absoluteUrl("/#locksmith"),
      name: SITE.name,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: SITE.areaServedLabel,
    },
  };
}

/**
 * Schéma `FAQPage`.
 *
 * ⚠️ `items` doit correspondre EXACTEMENT aux questions/réponses réellement
 * affichées à l'écran (ne jamais baliser une FAQ non visible : c'est le
 * genre d'écart entre schema et contenu visible qui peut déclencher une
 * pénalité manuelle Google sur les rich results).
 */
export function faqSchema(
  items: { question: string; reponse: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.reponse,
      },
    })),
  };
}

/**
 * Schéma `BreadcrumbList` — fil d'Ariane structuré pour les pages internes.
 * `items` est ordonné de la racine vers la page courante ; les URL sont des
 * chemins relatifs, résolus en URL absolue via `absoluteUrl`.
 */
export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
