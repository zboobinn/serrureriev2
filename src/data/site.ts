/**
 * Source unique de vérité du NAP (Name / Address / Phone) et des infos
 * d'entreprise — Serrurerie Roland.
 *
 * ⚠️ SEO LOCAL : la cohérence STRICTE du NAP est prioritaire. Tout le site
 * (header, footer, mentions légales, JSON-LD, metadata) doit lire CET objet.
 * Ne jamais réécrire le nom / l'adresse / le téléphone à la main ailleurs.
 */

export const SITE = {
  /** Nom commercial — format unique, à ne jamais varier. */
  name: "Serrurerie Roland",

  /** Téléphone affiché (format français lisible). */
  phone: "06 68 67 65 65",
  /** Téléphone au format E.164 pour les liens tel: et le JSON-LD. */
  phoneE164: "+33668676565",

  email: "serrurerieroland@orange.fr",

  /** Adresse du siège (établissement à Villeurbanne). */
  address: {
    street: "62 rue Racine",
    postalCode: "69100",
    city: "Villeurbanne",
    /** Code pays ISO 3166-1 alpha-2. */
    country: "FR",
    region: "Auvergne-Rhône-Alpes",
  },

  /**
   * Coordonnées géographiques du siège (pour geo du JSON-LD LocalBusiness).
   * Laissées vides tant qu'elles ne sont pas confirmées : le JSON-LD n'inclura
   * `geo` que si ces valeurs sont renseignées (pas de donnée inventée).
   */
  geo: {
    // À COMPLÉTER PAR LE CLIENT (latitude/longitude exactes du 62 rue Racine)
    latitude: null as number | null,
    longitude: null as number | null,
  },

  /** Année de création de l'entreprise. */
  foundingYear: 1998,

  /** Disponibilité : 24h/24, 7j/7. */
  openingHours: {
    label: "24h/24 et 7j/7",
    /** Format schema.org : tous les jours, toute la journée. */
    opens: "00:00",
    closes: "23:59",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  /**
   * Fourchette de prix indicative pour le JSON-LD (LocalBusiness).
   * "€€" = tarifs artisan classiques ; le client peut ajuster.
   */
  priceRange: "€€",

  /** Zone d'intervention (service area) — libellé éditorial. */
  areaServedLabel: "Lyon, ses 9 arrondissements et le Grand Lyon",

  /**
   * URL canonique du site en production. Surchargée par la variable
   * d'environnement NEXT_PUBLIC_SITE_URL (voir .env.local.example, à venir).
   */
  // À COMPLÉTER PAR LE CLIENT (domaine définitif)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.serrurerie-roland.fr",

  /**
   * Profils externes (sameAs du JSON-LD). Laissés vides tant que les URL
   * réelles ne sont pas fournies — n'apparaîtront pas dans le schema si vides.
   */
  social: {
    // À COMPLÉTER PAR LE CLIENT
    googleBusiness: "" as string,
    facebook: "" as string,
    instagram: "" as string,
  },
} as const;

/** Lien clic-to-call prêt à l'emploi (href="tel:..."). */
export const telHref = `tel:${SITE.phoneE164}`;

/** Lien e-mail prêt à l'emploi. */
export const mailHref = `mailto:${SITE.email}`;

/** Adresse postale sur une ligne (footer, mentions légales). */
export const addressInline = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;

/** Liste des profils sociaux réellement renseignés (pour sameAs). */
export const socialLinks: string[] = Object.values(SITE.social).filter(
  (u): u is string => u.length > 0,
);
