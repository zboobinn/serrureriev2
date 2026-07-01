"use client";

import { motion } from "framer-motion";

/**
 * Dévoilement au scroll (fade-in-up), façon scrollytelling.
 *
 * Le contenu (`children`) est toujours rendu côté serveur en amont — ce
 * wrapper ne fait qu'appliquer une transition d'apparition quand l'élément
 * entre dans le viewport. `viewport={{ once: true }}` : l'animation ne
 * rejoue pas à chaque scroll, un seul coût d'exécution par élément.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
