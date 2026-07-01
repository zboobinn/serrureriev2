import Link from "next/link";
import { SITE, telHref } from "@/data/site";

/*
 * Accueil — version squelette de l'ÉTAPE 2 (init).
 * Le contenu complet (hero, services, chiffres, avis, zones, FAQ) sera
 * construit à l'ÉTAPE 4. Ce placeholder existe pour un site buildable et
 * sans lien mort dès l'init.
 */
export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        {SITE.openingHours.label} · Depuis {SITE.foundingYear}
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        Serrurier à Lyon et dans le Grand Lyon
      </h1>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        Dépannage d&apos;urgence, ouverture de porte, portes blindées et
        serrures haute sécurité. Intervention rapide sur les 9 arrondissements
        et le Grand Lyon.
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

      <p className="mt-12 text-sm text-foreground/50">
        {/* À COMPLÉTER — sections accueil complètes à l'ÉTAPE 4 */}
        Page d&apos;accueil en cours de construction (ÉTAPE 4).
      </p>
    </section>
  );
}
