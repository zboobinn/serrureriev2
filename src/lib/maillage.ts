/**
 * Maillage interne ciblé zone ↔ service.
 *
 * Remplace les liens génériques ("voir tous nos services") par des liens
 * vers les 1-2 services/zones réellement pertinents pour la page courante,
 * en croisant les données existantes plutôt qu'en dupliquant du contenu :
 * - si `Zone.servicesPertinents` / `Service.zonesPertinentes` est renseigné
 *   à la main, il est utilisé tel quel (prioritaire) ;
 * - sinon, la pertinence est déduite par mots-clés recherchés dans
 *   `Zone.angleSerrurier` (le champ le plus différenciateur par zone) ;
 * - si aucun mot-clé ne matche (service peu spécifique, ex. conseil), un
 *   fallback garantit qu'aucune page ne reste sans lien croisé.
 */

import { services, getServiceBySlug, type Service } from "@/data/services";
import { zones, getZoneBySlug, type Zone } from "@/data/zones";

/** Mots-clés (recherchés en minuscule) identifiant un service dans un texte libre. */
const SERVICE_KEYWORDS: Record<string, string[]> = {
  "depannage-urgent": [
    "dépannage",
    "urgence",
    "urgent",
    "porte claquée",
    "portes claquées",
    "perte de clés",
    "perdues",
    "effraction",
  ],
  "portes-blindees": ["porte blindée", "portes blindées", "blindage", "blindé"],
  "portes-de-garage": ["porte de garage", "portes de garage"],
  "fermetures-exterieures": ["portail", "portails", "clôture", "clôtures", "portillon"],
  "rideaux-metalliques": ["rideau métallique", "rideaux métalliques"],
  "serrures-haute-securite": [
    "haute sécurité",
    "multipoints",
    "multipoint",
    "a2p",
    "certifiées",
    "barillet",
  ],
  "conseil-en-securite": ["diagnostic", "conseil"],
};

/** Fallback si aucun mot-clé ne matche : les services/zones les plus génériquement pertinents. */
const FALLBACK_SERVICE_SLUGS = ["depannage-urgent", "serrures-haute-securite"];
const FALLBACK_ZONE_SLUGS = ["villeurbanne", "lyon-3", "lyon-6"];

const MAX_SERVICES_PER_ZONE = 2;
const MAX_ZONES_PER_SERVICE = 3;

const containsKeyword = (haystack: string, keywords: string[]): boolean => {
  const lower = haystack.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
};

/** Services les plus pertinents pour une zone, prêts à afficher (jamais vide). */
export function getRelevantServicesForZone(zone: Zone): Service[] {
  if (zone.servicesPertinents && zone.servicesPertinents.length > 0) {
    const explicit = zone.servicesPertinents
      .map(getServiceBySlug)
      .filter((s): s is Service => Boolean(s));
    if (explicit.length > 0) return explicit.slice(0, MAX_SERVICES_PER_ZONE);
  }

  const matched = services.filter((service) =>
    containsKeyword(zone.angleSerrurier, SERVICE_KEYWORDS[service.slug] ?? []),
  );
  if (matched.length > 0) return matched.slice(0, MAX_SERVICES_PER_ZONE);

  return FALLBACK_SERVICE_SLUGS.map(getServiceBySlug).filter(
    (s): s is Service => Boolean(s),
  );
}

/** Zones les plus pertinentes pour un service, prêtes à afficher (jamais vide). */
export function getRelevantZonesForService(service: Service): Zone[] {
  if (service.zonesPertinentes && service.zonesPertinentes.length > 0) {
    const explicit = service.zonesPertinentes
      .map(getZoneBySlug)
      .filter((z): z is Zone => Boolean(z));
    if (explicit.length > 0) return explicit.slice(0, MAX_ZONES_PER_SERVICE);
  }

  const keywords = SERVICE_KEYWORDS[service.slug] ?? [];
  const matched = zones.filter((zone) => containsKeyword(zone.angleSerrurier, keywords));
  if (matched.length > 0) return matched.slice(0, MAX_ZONES_PER_SERVICE);

  return FALLBACK_ZONE_SLUGS.map(getZoneBySlug).filter((z): z is Zone => Boolean(z));
}
