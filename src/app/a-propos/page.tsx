import type { Metadata } from "next";
import Link from "next/link";

import { SITE, telHref } from "@/data/site";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "À propos",
  description: `${SITE.name}, artisan serrurier à Villeurbanne depuis ${SITE.foundingYear}. Intervention 24h/24 7j/7 à Lyon et dans le Grand Lyon.`,
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "À propos", url: "/a-propos" },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {SITE.name}, artisan serrurier depuis {SITE.foundingYear}
      </h1>

      <p className="mt-6 text-lg text-foreground/80">
        Installée à Villeurbanne, {SITE.name} intervient depuis{" "}
        {SITE.foundingYear} en dépannage de serrurerie, installation de
        portes blindées et sécurisation d&apos;accès pour les particuliers et
        les professionnels de {SITE.areaServedLabel}.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Notre engagement</h2>
        <ul className="mt-3 space-y-2 text-foreground/80">
          <li>• Disponibilité {SITE.openingHours.label} pour les urgences</li>
          <li>• Intervention soignée, sans dégât inutile sur vos portes</li>
          <li>• Devis clair avant toute intervention non urgente</li>
          <li>
            • Une connaissance fine du bâti lyonnais, de l&apos;immeuble
            ancien du Vieux Lyon aux résidences récentes du Grand Lyon
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Notre zone d&apos;intervention</h2>
        <p className="mt-3 text-foreground/80">
          Nous intervenons sur les 9 arrondissements de Lyon et 13 communes
          du Grand Lyon.{" "}
          <Link href="/zones" className="text-accent underline-offset-2 hover:underline">
            Voir toutes nos zones d&apos;intervention →
          </Link>
        </p>
      </section>

      {/* À COMPLÉTER PAR LE CLIENT : présentation de l'équipe, photo(s),
          certifications professionnelles, adhésion à une fédération de
          métiers (CMA, FFB...), le cas échéant. */}

      <section className="mt-10 rounded-lg bg-surface p-6">
        <h2 className="text-xl font-bold">Une urgence ?</h2>
        <a
          href={telHref}
          className="mt-4 inline-block rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
        >
          Appeler le {SITE.phone}
        </a>
      </section>
    </article>
  );
}
