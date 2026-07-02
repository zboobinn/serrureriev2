import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";

import { allZoneSlugs, zoneHref, getLimitrophes } from "@/data/zones";
import { serviceHref } from "@/data/services";
import { SITE, telHref } from "@/data/site";
import { zoneSlugParam, resolveZoneFromParam } from "@/lib/zone-routing";
import { breadcrumbSchema } from "@/lib/json-ld";
import { getRelevantServicesForZone } from "@/lib/maillage";
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

  // `nom` (court) plutôt que `nomComplet` : garde le titre complet (avec le
  // suffixe " | Serrurerie Roland" ajouté par title.template) sous ~60
  // caractères, y compris sur les 9 arrondissements. N'affecte pas le H1
  // (qui utilise toujours `nomComplet`, voir plus bas).
  const title = `Serrurier ${zone.nom} 24h/24`;
  // Gabarit volontairement compact (< 155 caractères sur les 22 zones) pour
  // ne pas être tronqué dans les SERP.
  const description = `Serrurier à ${zone.nomComplet} (${zone.codePostal}), 24h/24 : dépannage, ouverture de porte, porte blindée. Devis gratuit, intervention rapide.`;
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
  const servicesPertinents = getRelevantServicesForZone(zone);

  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Zones desservies", url: "/zones" },
    { name: zone.nom, url: zoneHref(zone) },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* LocalBusiness déjà injecté globalement par le layout (src/app/layout.tsx) —
          ne pas le répéter ici : un même @id avec un areaServed différent sur
          la même page est un signal structuré ambigu pour Google. */}
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-4">
        <p className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong">
          <MapPin aria-hidden="true" className="size-4" />
          {zone.codePostal} · {zone.secteur}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Serrurier à {zone.nomComplet}
        </h1>

        {/* CTA d'appel immédiat — visible sans scroll, avant tout contenu
            rédactionnel (le CTA de fin de page reste en place en renfort). */}
        <a
          href={telHref}
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
        >
          <Phone aria-hidden="true" className="size-4" />
          Appeler le {SITE.phone}
        </a>
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
          className="focus-ring inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
        >
          <Phone aria-hidden="true" className="size-4" />
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
        Maillage ciblé vers les services : `getRelevantServicesForZone`
        (@/lib/maillage) croise `angleSerrurier` avec les mots-clés de chaque
        service pour ne lier ici que ceux réellement pertinents pour cette
        zone, plutôt qu'un renvoi générique vers le hub /services.
      */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Nos services à {zone.nom}</h2>
        <p className="mt-3 text-foreground/80">
          Les prestations les plus demandées dans le secteur :
        </p>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {servicesPertinents.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service)}
                className="focus-ring rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
              >
                {service.nom} à {zone.nom}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/services"
              className="focus-ring rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
            >
              Voir tous nos services →
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
