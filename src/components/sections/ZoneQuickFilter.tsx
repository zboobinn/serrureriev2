"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Search } from "lucide-react";

import { zoneHref, type Zone } from "@/data/zones";
import { SITE, telHref } from "@/data/site";
import { zoneMatchesQuery } from "@/lib/zone-search";

const MAX_SUGGESTIONS = 8;

/**
 * Recherche rapide de zone sur l'accueil — un vrai autocomplete (pas un
 * filtre de liste) : `zones` contient les 66 zones (arrondissements +
 * communes), reçues du Server Component parent, pour que taper "Mions" ou
 * "Vienne" (hors des 9 pastilles d'arrondissement affichées à côté) donne
 * un résultat.
 *
 * SEO : contrairement au hub /zones, ces suggestions n'ont pas besoin
 * d'exister dans le HTML statique de l'accueil — le maillage des 66 pages
 * est déjà garanti par /zones (66 liens en dur) et le sitemap. Générer la
 * liste au clic/à la frappe ici est donc acceptable ; le lien "Voir toutes
 * nos zones →" reste lui en dur dans le JSX (repli sans JS, cf. page.tsx).
 */
export function ZoneQuickFilter({ zones }: { zones: Zone[] }) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(() => {
    if (query.trim() === "") return [];
    return zones
      .filter((z) => zoneMatchesQuery(z, query))
      .slice(0, MAX_SUGGESTIONS);
  }, [zones, query]);

  const showDropdown = isOpen && query.trim() !== "";
  const showNoResults = showDropdown && suggestions.length === 0;
  const activeOption =
    activeIndex >= 0 && activeIndex < suggestions.length
      ? suggestions[activeIndex]
      : undefined;

  function goToZone(zone: Zone) {
    setQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(zoneHref(zone));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Escape") setIsOpen(false);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        break;
      case "Enter":
        e.preventDefault();
        goToZone(activeOption ?? suggestions[0]);
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  return (
    <div className="relative mt-6 max-w-sm">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-foreground/40"
        />
        <input
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={
            activeOption ? `${listboxId}-${activeOption.slug}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Laisse le temps au clic sur une suggestion de s'exécuter avant fermeture.
            window.setTimeout(() => setIsOpen(false), 150);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Trouver votre commune (ex. Mions, Vienne...)"
          aria-label="Rechercher une commune parmi nos zones d'intervention"
          className="focus-ring w-full rounded-pill border border-border bg-background py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-foreground/40"
        />
      </div>

      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Suggestions de zones"
          className="absolute z-10 mt-2 w-full overflow-hidden rounded-card border border-border bg-surface shadow-card-hover"
        >
          {suggestions.map((z, i) => (
            <li key={z.slug} role="presentation">
              <Link
                id={`${listboxId}-${z.slug}`}
                role="option"
                aria-selected={i === activeIndex}
                href={zoneHref(z)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`focus-ring block px-4 py-2 text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-surface-2 text-accent-strong"
                    : "text-foreground hover:bg-surface-2"
                }`}
              >
                {z.nomComplet}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {showNoResults && (
        <div className="absolute z-10 mt-2 w-full rounded-card border border-border bg-surface p-4 text-sm text-foreground/80 shadow-card-hover">
          <p>
            Nous intervenons dans tout le Grand Lyon et ses environs —
            appelez-nous :
          </p>
          <a
            href={telHref}
            className="focus-ring mt-2 inline-flex items-center gap-1.5 font-semibold text-accent-strong underline-offset-2 hover:underline"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            {SITE.phone}
          </a>
        </div>
      )}
    </div>
  );
}
