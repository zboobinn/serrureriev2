import type { Metadata } from "next";

import type { Service } from "@/data/services";
import { serviceHref } from "@/data/services";

/**
 * Construit les `metadata` d'une page service à partir de sa donnée
 * (`@/data/services.ts`). Factorise le mapping titre/description/canonical
 * commun aux 6 pages dédiées, sans toucher à leur structure en fichiers
 * distincts.
 */
export function buildServiceMetadata(service: Service): Metadata {
  const canonical = serviceHref(service);
  // `metaTitre` (SERP, plus court) prime sur `titre` (H1, plus descriptif) —
  // n'affecte jamais le H1 rendu par ServiceTemplate.
  const title = service.metaTitre ?? service.titre;
  return {
    title,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: service.description,
      url: canonical,
    },
  };
}
