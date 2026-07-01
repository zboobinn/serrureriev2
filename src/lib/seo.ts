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
  return {
    title: service.titre,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title: service.titre,
      description: service.description,
      url: canonical,
    },
  };
}
