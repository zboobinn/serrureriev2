import type { Metadata } from "next";
import Link from "next/link";

import { SITE, telHref } from "@/data/site";
import { services, serviceHref } from "@/data/services";
import { arrondissements, zoneHref, getZoneBySlug } from "@/data/zones";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { faq } from "@/data/faq";
import { localBusinessSchema, faqSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

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

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {SITE.openingHours.label} · Depuis {SITE.foundingYear}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
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
            className="rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
          >
            Appeler le {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-surface"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Nos services de serrurerie
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service)}
                className="block h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <h3 className="text-lg font-bold">{service.nom}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {service.description}
                </p>
              </Link>
            </li>
          ))}
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
                className="rounded-full border border-accent bg-surface px-4 py-2 text-sm font-semibold text-accent"
              >
                {siege.nom} (siège)
              </Link>
            </li>
          )}
          {arrondissements.map((z) => (
            <li key={z.slug}>
              <Link
                href={zoneHref(z)}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-accent"
              >
                {z.nom}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/zones"
          className="mt-6 inline-block text-accent underline-offset-2 hover:underline"
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
          <li className="rounded-lg bg-surface p-6">
            <p className="text-2xl font-bold text-accent">{SITE.foundingYear}</p>
            <p className="mt-2 text-sm text-foreground/70">
              Artisan serrurier en activité depuis {SITE.foundingYear}
            </p>
          </li>
          <li className="rounded-lg bg-surface p-6">
            <p className="text-2xl font-bold text-accent">24/7</p>
            <p className="mt-2 text-sm text-foreground/70">
              Disponible {SITE.openingHours.label}, y compris jours fériés
            </p>
          </li>
          <li className="rounded-lg bg-surface p-6">
            <p className="text-2xl font-bold text-accent">
              {averageRating}/5
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              Note moyenne sur {reviewCount} avis clients
            </p>
          </li>
          <li className="rounded-lg bg-surface p-6">
            <p className="text-2xl font-bold text-accent">Devis</p>
            <p className="mt-2 text-sm text-foreground/70">
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

      {/* Avis clients — les 10 avis réels, identiques au JSON-LD ci-dessus */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ils nous font confiance
        </h2>
        <p className="mt-2 text-foreground/70">
          {averageRating}/5 sur {reviewCount} avis clients.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-lg border border-border p-6">
              <div aria-hidden="true" className="text-accent">
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
              className="rounded-lg border border-border p-4"
            >
              <summary className="cursor-pointer font-semibold">
                {item.question}
              </summary>
              <p className="mt-3 text-foreground/70">{item.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-brand px-8 py-10 text-white">
          <div>
            <h2 className="text-2xl font-bold">Une urgence serrurerie ?</h2>
            <p className="mt-2 text-white/70">
              Appelez-nous directement, nous intervenons rapidement.
            </p>
          </div>
          <a
            href={telHref}
            className="rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
          >
            Appeler le {SITE.phone}
          </a>
        </div>
      </section>
    </>
  );
}
