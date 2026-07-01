import { ZONE_URL_PREFIX, getZoneBySlug, type Zone } from "@/data/zones";

/**
 * Pont entre les slugs propres de `zones.ts` (ex: "lyon-3") et le segment de
 * route Next.js `app/zones/[zoneSlug]` (ex: "serrurier-lyon-3").
 *
 * Next.js n'autorise pas les segments dynamiques partiels (`serrurier-[slug]`
 * est invalide — un nom de dossier est soit statique, soit entièrement
 * dynamique). Le préfixe "serrurier-" est donc géré ici, dérivé de
 * `ZONE_URL_PREFIX` (seule source de vérité, partagée avec `zoneHref` et
 * `sitemap.ts`) — jamais recopié en dur.
 *
 * Identité garantie : pour tout slug, `"/zones/" + zoneSlugParam(slug)`
 * est strictement égal à `ZONE_URL_PREFIX + slug` (= `zoneHref`), caractère
 * pour caractère.
 */

/** Préfixe du SEGMENT de route (sans le "/zones/" initial). Ex: "serrurier-". */
const ZONE_SEGMENT_PREFIX = ZONE_URL_PREFIX.replace(/^\/zones\//, "");

/** Construit la valeur du param `zoneSlug` à partir d'un slug propre. */
export const zoneSlugParam = (slug: string): string =>
  `${ZONE_SEGMENT_PREFIX}${slug}`;

/**
 * Retrouve le slug propre à partir du param `zoneSlug` de la route.
 * Renvoie `null` si le segment ne porte pas le préfixe attendu (URL invalide).
 */
export const slugFromZoneSlugParam = (zoneSlugParam: string): string | null =>
  zoneSlugParam.startsWith(ZONE_SEGMENT_PREFIX)
    ? zoneSlugParam.slice(ZONE_SEGMENT_PREFIX.length)
    : null;

/**
 * Résout directement une `Zone` à partir du param `zoneSlug` de la route.
 * Centralise la logique préfixe→slug→zone utilisée par `generateMetadata`
 * et par la page, pour qu'elles ne puissent pas diverger.
 */
export const resolveZoneFromParam = (zoneSlugParam: string): Zone | undefined => {
  const slug = slugFromZoneSlugParam(zoneSlugParam);
  return slug ? getZoneBySlug(slug) : undefined;
};
