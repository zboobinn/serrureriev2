import type { Metadata } from "next";
import Link from "next/link";

import { arrondissements, communes, zoneHref } from "@/data/zones";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Zones d'intervention — Lyon et Grand Lyon",
  description:
    "Serrurerie Roland intervient dans les 9 arrondissements de Lyon et 13 communes du Grand Lyon. Retrouvez la page dédiée à votre secteur.",
  alternates: { canonical: "/zones" },
};

export default function ZonesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Zones desservies", url: "/zones" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Nos zones d&apos;intervention
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">
        Établis à Villeurbanne, nous intervenons dans les 9 arrondissements de
        Lyon et 13 communes du Grand Lyon. Choisissez votre secteur pour voir
        le détail de nos interventions près de chez vous.
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Arrondissements de Lyon</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {arrondissements.map((z) => (
            <li key={z.slug}>
              <Link
                href={zoneHref(z)}
                className="focus-ring block rounded-card border border-border bg-surface px-4 py-3 shadow-card transition-colors hover:border-accent-strong"
              >
                {z.nom}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Communes du Grand Lyon</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {communes.map((z) => (
            <li key={z.slug}>
              <Link
                href={zoneHref(z)}
                className="focus-ring block rounded-card border border-border bg-surface px-4 py-3 shadow-card transition-colors hover:border-accent-strong"
              >
                {z.nom}
                {z.siege && (
                  <span className="ml-2 text-xs font-semibold text-accent-strong">
                    Siège
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
