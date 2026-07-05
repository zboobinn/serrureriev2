"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type EtapeChantier = {
  src: string;
  width: number;
  height: number;
  titre: string;
  alt: string;
};

export type Chantier = {
  titre: string;
  etapes: EtapeChantier[];
};

export const chantierPortailVilleurbanne: Chantier = {
  titre: "Pose d'un portail à Villeurbanne",
  etapes: [
    {
      src: "/realisations/chantier1/1.jpg",
      width: 1024,
      height: 473,
      titre: "Emplacement avant travaux",
      alt: "Pose d'un portail à Villeurbanne — emplacement avant travaux",
    },
    {
      src: "/realisations/chantier1/2.jpg",
      width: 1024,
      height: 577,
      titre: "Mise en place du ferraillage pour le béton armé",
      alt: "Pose d'un portail à Villeurbanne — ferraillage du béton armé",
    },
    {
      src: "/realisations/chantier1/3.jpg",
      width: 1024,
      height: 577,
      titre: "Coulage et finition des deux piliers",
      alt: "Pose d'un portail à Villeurbanne — coulage et finition des piliers",
    },
    {
      src: "/realisations/chantier1/4.1.jpg",
      width: 1024,
      height: 577,
      titre: "Portail posé, vue depuis l'intérieur",
      alt: "Pose d'un portail à Villeurbanne — portail posé, vue intérieure",
    },
    {
      src: "/realisations/chantier1/4.2.jpg",
      width: 1024,
      height: 577,
      titre: "Portail terminé, vue depuis la rue",
      alt: "Pose d'un portail à Villeurbanne — portail terminé, vue depuis la rue",
    },
  ],
};

function ChantierCard({
  chantier,
  isFirstCard,
}: {
  chantier: Chantier;
  isFirstCard: boolean;
}) {
  const [index, setIndex] = useState(0);
  const etape = chantier.etapes[index];

  function goTo(next: number) {
    setIndex(Math.min(Math.max(next, 0), chantier.etapes.length - 1));
  }

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <AnimatePresence mode="wait">
          <m.div
            key={etape.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={etape.src}
              alt={etape.alt}
              fill
              // La 1ère étape du 1er chantier peut apparaître dans le
              // viewport initial selon la hauteur d'écran (mesuré comme LCP
              // par Next en conditions réelles) : chargement non différé
              // uniquement pour cette image précise. Les autres étapes ne
              // sont montées qu'après interaction, jamais au chargement.
              loading={isFirstCard && index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 42rem"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 sm:p-6">
          <p className="text-sm font-semibold text-white/70">
            Étape {index + 1}/{chantier.etapes.length}
          </p>
          <p className="mt-1 text-lg font-bold text-white sm:text-xl">
            {etape.titre}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Étape précédente"
          className="focus-ring inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent-strong disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        <input
          type="range"
          min={0}
          max={chantier.etapes.length - 1}
          step={1}
          value={index}
          onChange={(e) => goTo(Number(e.target.value))}
          aria-label="Progression du chantier"
          aria-valuetext={`Étape ${index + 1} sur ${chantier.etapes.length} : ${etape.titre}`}
          className="h-2 w-full flex-1 cursor-pointer appearance-none rounded-pill bg-border accent-accent-strong focus-ring"
        />

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === chantier.etapes.length - 1}
          aria-label="Étape suivante"
          className="focus-ring inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent-strong disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * Accepte plusieurs chantiers pour anticiper l'ajout futur d'avant/après
 * supplémentaires : un seul chantier reste limité en largeur et centré
 * (élément parmi d'autres dans la page, pas une section plein écran) ;
 * plusieurs chantiers passent en grille 2 colonnes sur desktop.
 */
export function ChantierTimelapse({ chantiers }: { chantiers: Chantier[] }) {
  return (
    <div
      className={
        chantiers.length > 1
          ? "grid gap-10 sm:grid-cols-2"
          : "mx-auto max-w-2xl"
      }
    >
      {chantiers.map((chantier, i) => (
        <ChantierCard
          key={chantier.titre}
          chantier={chantier}
          isFirstCard={i === 0}
        />
      ))}
    </div>
  );
}
