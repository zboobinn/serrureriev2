import Link from "next/link";
import { Check, Clock, Phone } from "lucide-react";

import type { Service } from "@/data/services";
import { zoneHref } from "@/data/zones";
import { SITE, telHref } from "@/data/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/json-ld";
import { getRelevantZonesForService } from "@/lib/maillage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SERVICE_ICONS } from "@/components/sections/service-icons";

/**
 * Gabarit visuel partagé par les 6 pages service (fichiers dédiés dans
 * app/services/{slug}/page.tsx). Chaque page reste un fichier distinct avec
 * son propre contenu rédigé à la main dans `@/data/services.ts` — ce
 * composant ne fait que factoriser la mise en page et le balisage commun.
 */
export function ServiceTemplate({
  service,
  children,
}: {
  service: Service;
  /**
   * Contenu additionnel propre à une page service précise (ex. timelapse de
   * chantier), affiché après "Pour qui ?" et avant le bloc CTA. Absent pour
   * les autres pages service — ne change rien à leur rendu.
   */
  children?: React.ReactNode;
}) {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.nom, url: `/services/${service.slug}` },
  ];

  // Maillage croisé ciblé services ↔ zones : `getRelevantZonesForService`
  // (@/lib/maillage) croise les mots-clés du service avec `angleSerrurier`
  // de chaque zone pour ne lier ici que celles où il est le plus demandé,
  // le reste des 22 zones restant accessible via le hub /zones.
  const zonesApercu = getRelevantZonesForService(service);

  const Icon = SERVICE_ICONS[service.slug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={[serviceSchema(service), breadcrumbSchema(breadcrumbItems)]} />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-4">
        {Icon && (
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent-strong/30 bg-surface text-accent-strong">
            <Icon aria-hidden="true" className="size-6" />
          </span>
        )}
        {service.urgence && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong">
            <Clock aria-hidden="true" className="size-4" />
            {SITE.openingHours.label}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {service.titre}
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

      <p className="mt-6 text-lg text-foreground/80">{service.intro}</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Ce que comprend ce service</h2>
        <ul className="mt-3 space-y-2">
          {service.prestations.map((prestation) => (
            <li key={prestation} className="flex gap-2 text-foreground/80">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-strong" />
              {prestation}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Pour qui ?</h2>
        <p className="mt-3 text-foreground/80">{service.pourQui}</p>
      </section>

      {children}

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

      {zonesApercu.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Ce service près de chez vous</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {zonesApercu.map((z) => (
              <li key={z.slug}>
                <Link
                  href={zoneHref(z)}
                  className="focus-ring rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
                >
                  {service.nom} à {z.nom}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/zones"
                className="focus-ring rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
              >
                Voir toutes nos zones d&apos;intervention →
              </Link>
            </li>
          </ul>
        </section>
      )}
    </article>
  );
}
