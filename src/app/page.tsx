import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Clock,
  FileCheck,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { SITE, telHref } from "@/data/site";
import { services, serviceHref } from "@/data/services";
import { arrondissements, zoneHref, getZoneBySlug } from "@/data/zones";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICE_ICONS } from "@/components/sections/service-icons";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { ZoneMap } from "@/components/sections/ZoneMap";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

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
      {/* LocalBusiness déjà injecté globalement par le layout (src/app/layout.tsx) —
          ne pas le répéter ici (même @id en double sur la page). */}
      <JsonLd schema={faqSchema(breadcrumbFaqItems)} />

      {/* Hero — texte 100% Server Component, dans le HTML initial (LCP).
          Le parallaxe (ParallaxHero) n'anime que transform/opacity côté
          client, sans jamais re-rendre ce contenu. */}
      <ParallaxHero background={<HeroBackground />}>
        <section className="relative min-h-[85vh] px-4 pt-12 pb-16 sm:pt-20">
          <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-pill border border-border bg-surface/60 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent-strong backdrop-blur">
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
                className="focus-ring rounded-pill border border-border bg-surface/60 px-6 py-3 font-semibold backdrop-blur transition-colors hover:border-accent-strong hover:bg-surface"
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </section>
      </ParallaxHero>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Nos services de serrurerie
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.slug];
            return (
              <li key={service.slug}>
                <Reveal delay={Math.min(i, 5) * 0.06}>
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
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Bandeau de confiance : assurances partenaires + certification matériel */}
      <section className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="grid gap-8 rounded-card border border-border bg-surface p-8 sm:grid-cols-3 sm:items-center sm:divide-x sm:divide-border">
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-9 shrink-0 text-accent" />
              <div>
                <p className="font-bold">Agréé assurances</p>
                <p className="text-sm text-foreground/70">
                  Remboursement suite à effraction
                </p>
              </div>
            </div>

            <div className="text-center sm:px-6">
              <p className="font-semibold text-foreground/80">
                AXA · MACIF · Allianz
                <br />
                Groupama · MAAF · Matmut
              </p>
            </div>

            <div className="flex items-center gap-3 sm:justify-end sm:pl-6">
              <div>
                <p className="font-bold">Matériel certifié</p>
                <p className="text-sm text-foreground/70">
                  Norme de sécurité A2P
                </p>
              </div>
              <span
                aria-hidden="true"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-accent-strong/40 bg-brand text-sm font-black text-accent"
              >
                A2P
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Zones desservies */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Nos zones d&apos;intervention
              </h2>
              <p className="mt-4 max-w-2xl text-foreground/70">
                Établis à Villeurbanne, nous intervenons dans les 9
                arrondissements de Lyon et dans l&apos;ensemble des communes du
                Grand Lyon.
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
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:block">
            <ZoneMap />
          </Reveal>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pourquoi choisir {SITE.name} ?
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Award,
              value: SITE.foundingYear,
              label: `Artisan serrurier en activité depuis ${SITE.foundingYear}`,
            },
            {
              icon: Clock,
              value: "24/7",
              label: `Disponible ${SITE.openingHours.label}, y compris jours fériés`,
            },
            {
              icon: Star,
              value: `${averageRating}/5`,
              label: `Note moyenne sur ${reviewCount} avis clients vérifiés`,
            },
            {
              icon: FileCheck,
              value: "Devis",
              label: "Gratuit avant toute intervention non urgente",
            },
          ].map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={i * 0.06}>
                <div className="rounded-card border border-border bg-surface p-6">
                  <stat.icon aria-hidden="true" className="size-6 text-accent-strong" />
                  <p className="mt-3 text-2xl font-bold text-accent-strong">{stat.value}</p>
                  <p className="mt-1 text-sm text-foreground/70">{stat.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
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
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ils nous font confiance
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
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
        </Reveal>

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

      {/* Formulaire de devis — même composant que /contact (Client Component
          isolé à l'interactivité du formulaire, reste du contenu inchangé). */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Demander un devis gratuit
          </h2>
          <p className="mt-4 text-foreground/70">
            Décrivez votre besoin, nous vous recontactons rapidement — pour
            une urgence, appelez-nous directement.
          </p>
          <div className="mt-8 rounded-card border border-border bg-surface p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* FAQ — identique au JSON-LD FAQPage ci-dessus */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions fréquentes
          </h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {faq.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i, 5) * 0.05}>
              <details className="rounded-card border border-border p-4">
                <summary className="focus-ring cursor-pointer rounded-sm font-semibold">
                  {item.question}
                </summary>
                <p className="mt-3 text-foreground/70">{item.reponse}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-card bg-linear-to-br from-brand to-brand-2 px-8 py-10 text-foreground">
            <div>
              <h2 className="text-2xl font-bold">Une urgence serrurerie ?</h2>
              <p className="mt-2 text-foreground/70">
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
        </Reveal>
      </section>
    </>
  );
}
