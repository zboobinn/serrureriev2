import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE, telHref } from "@/data/site";

/**
 * En-tête global. Le téléphone reste visible en permanence (priorité
 * conversion + SEO local). Navigation principale : services / zones / à propos
 * / contact.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06),0_12px_24px_-16px_rgba(0,0,0,0.6)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="focus-ring-invert flex flex-col rounded-sm leading-tight">
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
          <span className="text-xs text-white/70">
            Serrurier à Lyon &amp; Grand Lyon · {SITE.openingHours.label}
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 text-sm font-medium md:flex"
        >
          <Link href="/services" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
            Services
          </Link>
          <Link href="/zones" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
            Zones
          </Link>
          <Link href="/a-propos" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
            À propos
          </Link>
          <Link href="/contact" className="focus-ring-invert rounded-sm transition-colors hover:text-accent">
            Contact
          </Link>
        </nav>

        <a
          href={telHref}
          className="focus-ring-invert inline-flex items-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-bold text-brand shadow-cta transition-colors hover:bg-accent/90"
        >
          <Phone aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Appeler&nbsp;</span>
          {SITE.phone}
        </a>
      </div>
    </header>
  );
}
