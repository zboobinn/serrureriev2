"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

/**
 * Effet de parallaxe au premier scroll : le contenu (texte + CTA, déjà
 * rendus côté serveur et passés en `children`) glisse et s'estompe plus
 * vite que le fond décoratif (`background`), qui suit à peine.
 *
 * Purement transform/opacity (compositing GPU) — pas de reflow, pas
 * d'impact sur le LCP puisque le texte est déjà dans le HTML initial et
 * visible avant même l'hydratation.
 */
export function ParallaxHero({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden">
      {background && (
        <m.div aria-hidden="true" style={{ y: backgroundY }} className="absolute inset-0 -z-10">
          {background}
        </m.div>
      )}
      <m.div style={{ y: contentY, opacity: contentOpacity }}>
        {children}
      </m.div>
    </div>
  );
}
