"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE, telHref } from "@/data/site";

/**
 * CTA d'appel flottant : discret en haut de page, apparaît une fois le hero
 * dépassé. Plein largeur sur mobile (zone de pouce), pastille compacte en
 * bas à droite sur desktop. Remplace l'ancienne barre mobile toujours
 * visible — le comportement "au scroll" est demandé par la direction
 * scrollytelling.
 */
export function StickyCallButton() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 480);
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 p-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-0"
        >
          <a
            href={telHref}
            className="focus-ring-invert flex w-full items-center justify-center gap-2 rounded-pill border border-accent/40 bg-brand/90 px-5 py-3 text-base font-bold text-brand-foreground shadow-cta backdrop-blur transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-6"
            aria-label={`Appeler ${SITE.name} au ${SITE.phone}`}
          >
            <Phone aria-hidden="true" className="size-5 text-accent" />
            Appeler — {SITE.phone}
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
