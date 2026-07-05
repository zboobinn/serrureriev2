import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  SITE,
  telHref,
  mailHref,
  addressInline,
} from "@/data/site";
import { arrondissements, communes, zoneHref } from "@/data/zones";

/**
 * Footer : on ne liste que les 6 communes principales (siège + les plus
 * demandées) pour garder une colonne équilibrée — les 26 communes restent
 * toutes générées et indexées (sitemap, hub /zones), seul l'affichage ici
 * est restreint. Voir /zones pour la liste complète.
 */
const COMMUNES_FOOTER_SLUGS = [
  "villeurbanne",
  "caluire-et-cuire",
  "bron",
  "venissieux",
  "vaulx-en-velin",
  "saint-priest",
];
const communesFooter = COMMUNES_FOOTER_SLUGS.map((slug) =>
  communes.find((z) => z.slug === slug),
).filter((z): z is NonNullable<typeof z> => Boolean(z));

/**
 * Pied de page global : NAP complet (cohérence SEO local), navigation
 * secondaire, maillage vers les zones, liens légaux.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-linear-to-b from-brand to-brand-2 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* NAP */}
        <div>
          <h2 className="text-base font-bold text-white">{SITE.name}</h2>
          <address className="mt-3 space-y-2 text-sm not-italic">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/60" />
              {addressInline}
            </p>
            <p className="flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-white/60" />
              <a href={telHref} className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
                {SITE.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-white/60" />
              <a href={mailHref} className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
                {SITE.email}
              </a>
            </p>
            <p className="text-white/60">{SITE.openingHours.label}</p>
          </address>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Services
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services/depannage-urgent" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">Dépannage urgent</Link></li>
            <li><Link href="/services/portes-blindees" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">Portes blindées</Link></li>
            <li><Link href="/services/serrures-haute-securite" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">Serrures haute sécurité</Link></li>
            <li><Link href="/services" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">Tous les services</Link></li>
          </ul>
        </nav>

        {/* Zones */}
        <nav aria-label="Zones d'intervention">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Arrondissements
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {arrondissements.map((z) => (
              <li key={z.slug}>
                <Link href={zoneHref(z)} className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
                  {z.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Communes */}
        <nav aria-label="Communes du Grand Lyon">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Grand Lyon
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {communesFooter.map((z) => (
              <li key={z.slug}>
                <Link href={zoneHref(z)} className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
                  {z.nom}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/zones"
                className="focus-ring-invert rounded-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Toutes nos zones →
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} {SITE.name} — Serrurier depuis {SITE.foundingYear}.
          </p>
          <nav aria-label="Liens légaux" className="flex gap-4">
            <Link href="/mentions-legales" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="focus-ring-invert rounded-sm transition-colors hover:text-accent"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
