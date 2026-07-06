"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Search, X } from "lucide-react";

import { zoneHref, type Zone } from "@/data/zones";
import { SITE, telHref } from "@/data/site";
import { zoneMatchesQuery } from "@/lib/zone-search";

export interface ZoneSearchGroup {
  key: string;
  label: string;
  zones: Zone[];
}

/**
 * Barre de recherche du hub /zones. Les 66 liens sont toujours rendus dans
 * le HTML (voir `groups`, reçu du Server Component parent) : la saisie ne
 * fait que masquer/afficher visuellement les <li> déjà présents (classe
 * `hidden`), jamais générer de liens en JS. Sans JS (ou avant hydratation),
 * `query` vaut "" et tout reste visible, à l'identique de l'ancien rendu.
 */
export function ZoneSearch({ groups }: { groups: ZoneSearchGroup[] }) {
  const [query, setQuery] = useState("");

  const matchCount = useMemo(
    () =>
      groups.reduce(
        (total, group) =>
          total + group.zones.filter((z) => zoneMatchesQuery(z, query)).length,
        0,
      ),
    [groups, query],
  );

  return (
    <div>
      <div className="relative mt-8 max-w-md">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/50"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher votre commune (ex. Lyon 3e, Villeurbanne...)"
          aria-label="Rechercher une commune ou une zone d'intervention"
          className="focus-ring w-full rounded-pill border border-border bg-surface py-3 pr-10 pl-10 text-foreground placeholder:text-foreground/50"
        />
        {query !== "" && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Effacer la recherche"
            className="focus-ring absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-foreground/50 transition-colors hover:text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      {matchCount === 0 && (
        <p
          role="status"
          className="mt-6 max-w-2xl rounded-card border border-border bg-surface p-6 text-foreground/80"
        >
          Aucune commune trouvée pour « {query} ». Nous intervenons dans tout
          le Grand Lyon et ses environs — appelez-nous au{" "}
          <a
            href={telHref}
            className="focus-ring inline-flex items-center gap-1 font-semibold text-accent-strong underline-offset-2 hover:underline"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            {SITE.phone}
          </a>
          .
        </p>
      )}

      {groups.map((group) => {
        const visibleCount = group.zones.filter((z) =>
          zoneMatchesQuery(z, query),
        ).length;
        return (
          <div
            key={group.key}
            className={`mt-10 ${visibleCount === 0 ? "hidden" : ""}`}
          >
            <h2 className="text-xl font-bold">{group.label}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {group.zones.map((z) => {
                const visible = zoneMatchesQuery(z, query);
                return (
                  <li key={z.slug} className={visible ? "" : "hidden"}>
                    <Link
                      href={zoneHref(z)}
                      className="focus-ring flex items-center gap-2 rounded-card border border-border bg-surface px-4 py-3 shadow-card transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent-strong hover:shadow-card-hover"
                    >
                      <MapPin aria-hidden="true" className="size-4 text-accent-strong" />
                      {z.nom}
                      {z.siege && (
                        <span className="ml-2 text-xs font-semibold text-accent-strong">
                          Siège
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
