import type { Metadata } from "next";

import {
  arrondissements,
  communesGrandLyon,
  zonesBySecteurGeo,
  SECTEUR_GEO_LABELS,
  SECTEUR_GEO_ORDER,
  type SecteurGeo,
} from "@/data/zones";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ZoneSearch, type ZoneSearchGroup } from "@/components/sections/ZoneSearch";

export const metadata: Metadata = {
  title: "Zones d'intervention — Lyon et Grand Lyon",
  description:
    `Serrurerie Roland intervient dans les 9 arrondissements de Lyon, ${communesGrandLyon.length} communes du Grand Lyon, et au-delà dans l'Est lyonnais, le Nord-Isère, le sud lyonnais et le secteur de Vienne. Retrouvez la page dédiée à votre secteur.`,
  alternates: { canonical: "/zones" },
};

/*
 * Regroupement HONNÊTE par secteur géographique réel (`secteurGeo`) : les
 * communes hors Métropole de Lyon (Est lyonnais/Nord-Isère, sud lyonnais,
 * secteur de Vienne) ne sont jamais mélangées avec "Grand Lyon", à
 * l'exception de Chassieu qui en est réellement membre. Voir data/zones.ts.
 */
export default function ZonesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Zones desservies", url: "/zones" },
  ];

  const secteursHorsLyon = SECTEUR_GEO_ORDER.filter(
    (s): s is Exclude<SecteurGeo, "lyon" | "grand-lyon"> =>
      s !== "lyon" && s !== "grand-lyon"
  );

  const groups: ZoneSearchGroup[] = [
    { key: "lyon", label: SECTEUR_GEO_LABELS.lyon, zones: arrondissements },
    {
      key: "grand-lyon",
      label: SECTEUR_GEO_LABELS["grand-lyon"],
      zones: communesGrandLyon,
    },
    ...secteursHorsLyon.map((secteur) => ({
      key: secteur,
      label: SECTEUR_GEO_LABELS[secteur],
      zones: zonesBySecteurGeo(secteur),
    })),
  ].filter((group) => group.zones.length > 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Nos zones d&apos;intervention
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">
        Établis à Villeurbanne, nous intervenons dans les 9 arrondissements de
        Lyon et les communes du Grand Lyon, ainsi que dans plusieurs secteurs
        au-delà de la métropole. Choisissez votre secteur pour voir le détail
        de nos interventions près de chez vous.
      </p>

      <ZoneSearch groups={groups} />
    </section>
  );
}
