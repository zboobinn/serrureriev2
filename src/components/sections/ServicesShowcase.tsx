import Link from "next/link";
import { Clock, Phone } from "lucide-react";

import type { Service } from "@/data/services";
import { serviceHref } from "@/data/services";
import { SITE, telHref } from "@/data/site";
import { SERVICE_ICONS } from "@/components/sections/service-icons";
import { Reveal } from "@/components/motion/Reveal";

/** Produit d'appel 24/7 : mis en avant dans un bandeau distinct plutôt que
 *  noyé dans la grille. */
const FEATURED_SLUG = "depannage-urgent";

/**
 * Les 2 services premium/certifiés A2P prennent 2 colonnes dans la grille
 * secondaire (bento) plutôt qu'une seule — choix purement visuel, sans
 * rapport avec `data/services.ts` (aucune donnée modifiée).
 */
const WIDE_SECONDARY_SLUGS = new Set([
  "portes-blindees",
  "serrures-haute-securite",
]);

/**
 * Présentation hiérarchisée des services, partagée entre l'accueil et le hub
 * /services : un bandeau "featured" pour le dépannage urgent (produit
 * d'appel), puis les autres services en grille asymétrique (bento). Reste un
 * Server Component — seule `Reveal` (framer-motion) est un Client Component,
 * et n'anime que l'opacité/transform, jamais le contenu texte lui-même.
 */
export function ServicesShowcase({
  services,
  headingLevel,
}: {
  services: Service[];
  headingLevel: "h2" | "h3";
}) {
  const Title = headingLevel;
  const featured = services.find((s) => s.slug === FEATURED_SLUG);
  const secondary = services.filter((s) => s.slug !== FEATURED_SLUG);
  const FeaturedIcon = featured ? SERVICE_ICONS[featured.slug] : undefined;

  return (
    <div className="space-y-6">
      {featured && (
        <Reveal>
          <div className="rounded-card border border-accent-strong/30 bg-linear-to-br from-brand to-brand-2 p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {FeaturedIcon && (
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-accent-strong/40 bg-surface/60 text-accent-strong backdrop-blur">
                      <FeaturedIcon aria-hidden="true" className="size-6" />
                    </span>
                  )}
                  <p className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface/60 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong backdrop-blur">
                    <Clock aria-hidden="true" className="size-4" />
                    {SITE.openingHours.label}
                  </p>
                </div>

                <Title className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  <Link
                    href={serviceHref(featured)}
                    className="focus-ring rounded-sm underline-offset-4 hover:underline"
                  >
                    {featured.nom}
                  </Link>
                </Title>
                <p className="mt-3 max-w-xl text-foreground/70">
                  {featured.description}
                </p>
                <Link
                  href={serviceHref(featured)}
                  className="focus-ring mt-4 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
                >
                  En savoir plus
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <a
                href={telHref}
                className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3 text-center font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
              >
                <Phone aria-hidden="true" className="size-4" />
                Appeler le {SITE.phone}
              </a>
            </div>
          </div>
        </Reveal>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {secondary.map((service, i) => {
          const Icon = SERVICE_ICONS[service.slug];
          const wide = WIDE_SECONDARY_SLUGS.has(service.slug);
          return (
            <li key={service.slug} className={wide ? "lg:col-span-2" : undefined}>
              <Reveal delay={Math.min(i, 5) * 0.05} className="h-full">
                <Link
                  href={serviceHref(service)}
                  className="focus-ring group flex h-full flex-col rounded-card border border-border bg-background p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent-strong hover:shadow-card-hover"
                >
                  {Icon && (
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent-strong/30 bg-surface text-accent-strong transition-colors group-hover:bg-accent-strong group-hover:text-accent-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                  <Title className="mt-4 text-lg font-bold">{service.nom}</Title>
                  <p className="mt-2 text-sm text-foreground/70">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
                    En savoir plus
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
