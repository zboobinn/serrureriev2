import type { Metadata } from "next";

import { requireServiceBySlug } from "@/data/services";
import { buildServiceMetadata } from "@/lib/seo";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";
import {
  ChantierTimelapse,
  chantierPortailVilleurbanne,
} from "@/components/sections/ChantierTimelapse";

const service = requireServiceBySlug("fermetures-exterieures");

export const metadata: Metadata = buildServiceMetadata(service);

export default function Page() {
  return (
    <ServiceTemplate service={service}>
      {/* Timelapse de chantier — propre à cette page service (pose de
          portail réelle), taille contenue pour rester un élément parmi
          d'autres dans la page, pas une section plein écran. */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          Un chantier en images : pose d&apos;un portail
        </h2>
        <p className="mt-3 text-foreground/80">
          Faites glisser le curseur pour suivre les étapes de la pose d&apos;un
          portail, de l&apos;emplacement avant travaux jusqu&apos;à la finition.
        </p>
        <div className="mt-6">
          <ChantierTimelapse chantiers={[chantierPortailVilleurbanne]} />
        </div>
      </section>
    </ServiceTemplate>
  );
}
