import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Clock,
  FileCheck,
  Phone,
  Star,
} from "lucide-react";

import { SITE, telHref } from "@/data/site";
import { services, serviceHref } from "@/data/services";
import { arrondissements, zoneHref, getZoneBySlug } from "@/data/zones";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { faq } from "@/data/faq";
import { localBusinessSchema, faqSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICE_ICONS } from "@/components/sections/service-icons";

/*
 * Accueil — 100 % Server Component, aucun contenu critique en client-side
 * rendering. Un seul <h1> (dans le hero) ; hiérarchie Hn propre ensuite
 * (h2 par section, h3 pour les avis).
 *
 * Pas d'image hero : aucune photo réelle de l'entreprise n'est disponible à
 * ce stade (voir public/, uniquement des SVG par défaut de Next.js). Un
 * hero texte-first évite d'inventer un visuel et reste optimal pour le LCP
 * (aucun poids image à charger au-dessus de la ligne de flottaison).
 * // À COMPLÉTER PAR LE CLIENT : remplacer par un <Image priority .../>
 * (photo de l'artisan / du véhicule) le jour où un vrai visuel est fourni.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const siege = getZoneBySlug("villeurbanne");

export default function Home() {
  const breadcrumbFaqItems = faq; // FAQ affichée intégralement ci-dessous — le JSON-LD doit rester identique.

  return (
    <>
      <JsonLd
        schema={[localBusinessSchema(), faqSchema(breadcrumbFaqItems)]}
      />

      {/* Hero — pas d'image (LCP = le texte, aucun poids visuel supplémentaire) */}
      <section className="relative overflow-hidden bg-linear-to-b from-surface to-background px-4 pt-12 pb-16 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-pill border border-border bg-background px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong">
            {SITE.openingHours.label} · Depuis {SITE.foundingYear}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Serrurier à Lyon et dans le Grand Lyon
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/70">
            Dépannage d&apos;urgence, ouverture de porte, portes blindées et
            serrures haute sécurité. Intervention rapide sur les 9
            arrondissements de Lyon et le Grand Lyon, 24h/24 et 7j/7.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
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
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Nos services de serrurerie
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.slug];
            return (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service)}
                  className="focus-ring group block h-full rounded-card border border-border bg-background p-6 shadow-card transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-accent-strong hover:shadow-card-hover"
                >
                  {Icon && (
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent-strong/30 bg-surface text-accent-strong">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                  <h3 className="mt-4 text-lg font-bold">{service.nom}</h3>
                  <p className="mt-2 text-sm text-foreground/70">
                    {service.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Zones desservies */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Nos zones d&apos;intervention
        </h2>
        <p className="mt-4 max-w-2xl text-foreground/70">
          Établis à Villeurbanne, nous intervenons dans les 9 arrondissements
          de Lyon et dans l&apos;ensemble des communes du Grand Lyon.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {siege && (
            <li>
              <Link
                href={zoneHref(siege)}
                className="focus-ring rounded-pill border border-accent-strong bg-surface px-4 py-2 text-sm font-semibold text-accent-strong transition-colors hover:bg-background"
              >
                {siege.nom} (siège)
              </Link>
            </li>
          )}
          {arrondissements.map((z) => (
            <li key={z.slug}>
              <Link
                href={zoneHref(z)}
                className="focus-ring rounded-pill border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-accent-strong"
              >
                {z.nom}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/zones"
          className="focus-ring mt-6 inline-block rounded-sm font-semibold text-accent-strong underline-offset-2 hover:underline"
        >
          Voir toutes nos zones (Lyon + Grand Lyon) →
        </Link>
      </section>

      {/* Pourquoi nous */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Pourquoi choisir {SITE.name} ?
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-card border border-border bg-surface p-6">
            <Award aria-hidden="true" className="size-6 text-accent-strong" />
            <p className="mt-3 text-2xl font-bold text-accent-strong">{SITE.foundingYear}</p>
            <p className="mt-1 text-sm text-foreground/70">
              Artisan serrurier en activité depuis {SITE.foundingYear}
            </p>
          </li>
          <li className="rounded-card border border-border bg-surface p-6">
            <Clock aria-hidden="true" className="size-6 text-accent-strong" />
            <p className="mt-3 text-2xl font-bold text-accent-strong">24/7</p>
            <p className="mt-1 text-sm text-foreground/70">
              Disponible {SITE.openingHours.label}, y compris jours fériés
            </p>
          </li>
          <li className="rounded-card border border-border bg-surface p-6">
            <Star aria-hidden="true" className="size-6 text-accent-strong" />
            <p className="mt-3 text-2xl font-bold text-accent-strong">
              {averageRating}/5
            </p>
            <p className="mt-1 text-sm text-foreground/70">
              Note moyenne sur {reviewCount} avis clients
            </p>
          </li>
          <li className="rounded-card border border-border bg-surface p-6">
            <FileCheck aria-hidden="true" className="size-6 text-accent-strong" />
            <p className="mt-3 text-2xl font-bold text-accent-strong">Devis</p>
            <p className="mt-1 text-sm text-foreground/70">
              Gratuit avant toute intervention non urgente
            </p>
          </li>
          {/*
            À COMPLÉTER : un compteur (ex. "X interventions réalisées")
            pourra être ajouté ici une fois un chiffre réel fourni par le
            client. Aucun chiffre n'est inventé en attendant.
          */}
        </ul>
      </section>

      {/*
        Avis clients — les 10 avis réels, identiques au JSON-LD ci-dessus.
        Le bloc "note globale" ci-dessous est un rendu purement visuel dérivé
        de data/reviews.ts (averageRating/reviewCount) : aucun balisage
        AggregateRating/Review n'est ajouté (voir lib/json-ld.ts, désactivé
        intentionnellement).
      */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ils nous font confiance
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-card border border-border bg-surface p-6">
          <p className="text-5xl font-bold tracking-tight text-accent-strong">
            {averageRating}/5
          </p>
          <div>
            <div aria-hidden="true" className="text-lg text-accent-strong">
              {"★".repeat(averageRating)}
              {"☆".repeat(5 - averageRating)}
            </div>
            <p className="mt-1 text-sm text-foreground/70">
              Note moyenne sur {reviewCount} avis clients vérifiés
            </p>
          </div>
        </div>

        {/*
          Bande défilante en CSS pur (overflow-x + scroll-snap) : les 10 avis
          restent une <ul>/<li> normale dans le flux HTML, indexable, sans
          JS. Pas de librairie carrousel.
        */}
        <ul className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="w-[85%] shrink-0 snap-start rounded-card border border-border p-6 shadow-card sm:w-[45%] lg:w-[31%]"
            >
              <div aria-hidden="true" className="text-accent-strong">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="sr-only">Note : {review.rating} sur 5</p>
              <h3 className="mt-3 text-sm font-bold">{review.author}</h3>
              <p className="mt-2 text-sm text-foreground/70">{review.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ — identique au JSON-LD FAQPage ci-dessus */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="rounded-card border border-border p-4"
            >
              <summary className="focus-ring cursor-pointer rounded-sm font-semibold">
                {item.question}
              </summary>
              <p className="mt-3 text-foreground/70">{item.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-card bg-linear-to-br from-brand to-brand-2 px-8 py-10 text-white">
          <div>
            <h2 className="text-2xl font-bold">Une urgence serrurerie ?</h2>
            <p className="mt-2 text-white/70">
              Appelez-nous directement, nous intervenons rapidement.
            </p>
          </div>
          <a
            href={telHref}
            className="focus-ring-invert inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
          >
            <Phone aria-hidden="true" className="size-4" />
            Appeler le {SITE.phone}
          </a>
        </div>
      </section>
    </>
  );
}
