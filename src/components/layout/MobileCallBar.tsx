import { Phone } from "lucide-react";
import { SITE, telHref } from "@/data/site";

/**
 * Barre d'appel flottante, visible uniquement sur mobile (clic-to-call).
 * CTA principal de conversion pour un serrurier d'urgence.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand/95 p-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
      <a
        href={telHref}
        className="focus-ring-invert flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-5 py-3 text-base font-bold text-brand shadow-cta transition-transform active:scale-[0.98]"
        aria-label={`Appeler ${SITE.name} au ${SITE.phone}`}
      >
        <Phone aria-hidden="true" className="size-5" />
        Appeler — {SITE.phone}
      </a>
    </div>
  );
}
