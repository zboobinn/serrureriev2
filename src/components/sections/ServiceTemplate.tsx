import Link from "next/link";

import type { Service } from "@/data/services";
import { zoneHref, getZoneBySlug } from "@/data/zones";
import { SITE, telHref } from "@/data/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/**
 * Gabarit visuel partagé par les 6 pages service (fichiers dédiés dans
 * app/services/{slug}/page.tsx). Chaque page reste un fichier distinct avec
 * son propre contenu rédigé à la main dans `@/data/services.ts` — ce
 * composant ne fait que factoriser la mise en page et le balisage commun.
 */
export function ServiceTemplate({ service }: { service: Service }) {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.nom, url: `/services/${service.slug}` },
  ];

  // Maillage croisé services ↔ zones : siège + un aperçu d'arrondissements,
  // le reste des 22 zones restant accessible via le hub /zones.
  const siege = getZoneBySlug("villeurbanne");
  const zonesApercu = [siege, getZoneBySlug("lyon-3"), getZoneBySlug("lyon-6")].filter(
    (z): z is NonNullable<typeof z> => Boolean(z),
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={[serviceSchema(service), breadcrumbSchema(breadcrumbItems)]} />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-4">
        {service.urgence && (
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.openingHours.label}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {service.titre}
        </h1>
      </header>

      <p className="mt-6 text-lg text-foreground/80">{service.intro}</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Ce que comprend ce service</h2>
        <ul className="mt-3 space-y-2">
          {service.prestations.map((prestation) => (
            <li key={prestation} className="flex gap-2 text-foreground/80">
              <span aria-hidden="true" className="text-accent">•</span>
              {prestation}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Pour qui ?</h2>
        <p className="mt-3 text-foreground/80">{service.pourQui}</p>
      </section>

      <section className="mt-10 flex flex-wrap gap-4 rounded-lg bg-surface p-6">
        <a
          href={telHref}
          className="rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
        >
          Appeler le {SITE.phone}
        </a>
        <Link
          href="/contact"
          className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-white"
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
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {service.nom} à {z.nom}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/zones"
                className="text-accent underline-offset-2 hover:underline"
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
