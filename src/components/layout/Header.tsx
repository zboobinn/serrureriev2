import Link from "next/link";
import { SITE, telHref } from "@/data/site";

/**
 * En-tête global. Le téléphone reste visible en permanence (priorité
 * conversion + SEO local). Navigation principale : services / zones / à propos
 * / contact.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
          <span className="text-xs text-white/70">
            Serrurier à Lyon &amp; Grand Lyon · {SITE.openingHours.label}
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 text-sm font-medium md:flex"
        >
          <Link href="/services" className="hover:text-accent">
            Services
          </Link>
          <Link href="/zones" className="hover:text-accent">
            Zones
          </Link>
          <Link href="/a-propos" className="hover:text-accent">
            À propos
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </nav>

        <a
          href={telHref}
          className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-accent/90"
        >
          <span className="hidden sm:inline">Appeler&nbsp;</span>
          {SITE.phone}
        </a>
      </div>
    </header>
  );
}
