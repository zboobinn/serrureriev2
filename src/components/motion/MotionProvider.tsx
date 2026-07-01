"use client";

import { MotionConfig } from "framer-motion";

/**
 * Point d'entrée unique de Framer Motion pour tout le site.
 * `reducedMotion="user"` désactive automatiquement transforms/animations
 * pour les visiteurs ayant activé "Réduire les animations" au niveau OS —
 * sans condition à répéter dans chaque composant animé.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
