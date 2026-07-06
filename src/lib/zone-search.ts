import type { Zone } from "@/data/zones";

/**
 * Normalise une chaine pour la recherche : sans accents, minuscules,
 * ponctuation reduite a des espaces. Permet a "St Priest" et "saint-priest"
 * de produire la meme cle de comparaison.
 */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Developpe les abreviations courantes ("st" -> "saint", "ste" -> "sainte"). */
function expandAbbreviations(query: string): string {
  return query
    .replace(/\bste\b/g, "sainte")
    .replace(/\bst\b/g, "saint");
}

/** Cle de recherche normalisee d'une zone (nom court + nom complet + slug). */
export function zoneSearchKey(zone: Pick<Zone, "nom" | "nomComplet" | "slug">): string {
  return normalize(`${zone.nom} ${zone.nomComplet} ${zone.slug}`);
}

/** Vrai si la zone correspond a la saisie (recherche partielle, insensible casse/accents). */
export function zoneMatchesQuery(
  zone: Pick<Zone, "nom" | "nomComplet" | "slug">,
  query: string,
): boolean {
  const needle = expandAbbreviations(normalize(query));
  if (needle === "") return true;
  return zoneSearchKey(zone).includes(needle);
}
