"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/**
 * Point d'entrée unique de Framer Motion pour tout le site.
 * `reducedMotion="user"` désactive automatiquement transforms/animations
 * pour les visiteurs ayant activé "Réduire les animations" au niveau OS —
 * sans condition à répéter dans chaque composant animé.
 *
 * `LazyMotion` + `domAnimation` : charge uniquement le sous-ensemble
 * animate/exit/whileInView utilisé par le site (Reveal, ParallaxHero,
 * StickyCallButton), pas drag/layout — économie de bundle. En contrepartie,
 * les composants animés doivent utiliser `m.*` et non `motion.*`.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
