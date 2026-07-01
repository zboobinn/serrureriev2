import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { allZoneSlugs, zoneHref, getLimitrophes } from "@/data/zones";
import { SITE, telHref } from "@/data/site";
import { zoneSlugParam, resolveZoneFromParam } from "@/lib/zone-routing";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/*
 * Template de page zone — une instance par zone (9 arrondissements + 13
 * communes), pré-générée en SSG via `generateStaticParams`.
 *
 * ⚠️ Cohérence des URL : le segment de route `zoneSlug` (ex. "serrurier-lyon-3")
 * et les URL affichées/canoniques (ex. "/zones/serrurier-lyon-3") dérivent
 * TOUTES deux de `ZONE_URL_PREFIX` (source unique, définie dans `data/zones.ts`)
 * via les helpers `zoneSlugParam`/`zoneHref` — jamais recopiées en dur. C'est
 * la même constante que celle utilisée par `app/sitemap.ts`.
 *
 * ⚠️ Anti-duplicate content : le contenu substantiel (intro, "nos
 * interventions", quartiers) est construit à partir des champs RÉELS de
 * `zones.ts` (`caractere`, `pointsDeRepere`, `angleSerrurier`, `typeBati`,
 * `quartiers`) — champ le plus différenciateur par zone. Le champ optionnel
 * `texteUnique` (rédigé à la main) est affiché en priorité quand il existe.
 */

type RouteParams = { zoneSlug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return allZoneSlugs.map((slug) => ({ zoneSlug: zoneSlugParam(slug) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { zoneSlug } = await params;
  const zone = resolveZoneFromParam(zoneSlug);
  if (!zone) notFound();

  const title = `Serrurier à ${zone.nomComplet} — dépannage 24h/24`;
  const description = `Serrurier à ${zone.nomComplet} (${zone.codePostal}) : dépannage d'urgence, ouverture de porte, portes blindées et serrures haute sécurité. Intervention rapide dans ${zone.secteur.toLowerCase()}.`;
  const canonical = zoneHref(zone);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export default async function ZonePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { zoneSlug } = await params;
  const zone = resolveZoneFromParam(zoneSlug);
  if (!zone) notFound();

  const limitrophes = getLimitrophes(zone.slug);

  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Zones desservies", url: "/zones" },
    { name: zone.nom, url: zoneHref(zone) },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        schema={[
          localBusinessSchema({
            areaServed: [{ "@type": "City", name: zone.nomComplet }],
          }),
          breadcrumbSchema(breadcrumbItems),
        ]}
      />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-4">
        <p className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong">
          {zone.codePostal} · {zone.secteur}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Serrurier à {zone.nomComplet}
        </h1>
      </header>

      {/* Intro — ancrée sur le caractère du secteur et ses repères réels */}
      <p className="mt-6 text-lg text-foreground/80">
        {zone.nomComplet} est {zone.type === "arrondissement" ? "un arrondissement" : "une commune"}{" "}
        {zone.caractere}. Repères connus du secteur : {zone.pointsDeRepere.join(", ")}.
      </p>

      {/* Contenu enrichi à la main, prioritaire quand présent */}
      {zone.texteUnique && zone.texteUnique.length > 0 && (
        <section className="mt-8 space-y-4">
          {zone.texteUnique.map((paragraph, i) => (
            <p key={i} className="text-foreground/80">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {/* Angle serrurier — le champ le plus différenciateur de zones.ts */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">
          Nos interventions de serrurerie à {zone.nom}
        </h2>
        <p className="mt-3 text-foreground/80">{zone.angleSerrurier}</p>
        <p className="mt-3 text-foreground/80">
          Bâti dominant du secteur : {zone.typeBati}.
        </p>
      </section>

      {/* Quartiers réels desservis */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Quartiers desservis à {zone.nom}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {zone.quartiers.map((quartier) => (
            <li
              key={quartier}
              className="rounded-pill border border-border bg-surface px-3 py-1 text-sm"
            >
              {quartier}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-10 flex flex-wrap gap-4 rounded-card border border-border bg-surface p-6">
        <a
          href={telHref}
          className="focus-ring rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
        >
          Appeler le {SITE.phone}
        </a>
        <Link
          href="/contact"
          className="focus-ring rounded-pill border border-border bg-background px-6 py-3 font-semibold transition-colors hover:border-accent-strong hover:bg-surface"
        >
          Demander un devis gratuit
        </Link>
      </section>

      {/* Maillage interne — zones limitrophes réelles */}
      {limitrophes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Zones limitrophes</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {limitrophes.map((z) => (
              <li key={z.slug}>
                <Link
                  href={zoneHref(z)}
                  className="focus-ring rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
                >
                  Serrurier {z.nom}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*
        Maillage vers les services : en attente de data/services.ts et des
        pages /services/* (ÉTAPE 4). Le hub /services existe déjà en lien ici
        pour ne pas laisser d'impasse tant que les pages individuelles ne
        sont pas construites.
      */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Nos services</h2>
        <p className="mt-3 text-foreground/80">
          Découvrez l&apos;ensemble de nos prestations de serrurerie
          disponibles à {zone.nom}.
        </p>
        <Link
          href="/services"
          className="focus-ring mt-3 inline-block rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
        >
          Voir tous nos services →
        </Link>
      </section>
    </article>
  );
}
