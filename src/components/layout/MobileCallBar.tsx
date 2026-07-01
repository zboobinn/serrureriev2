import { SITE, telHref } from "@/data/site";

/**
 * Barre d'appel flottante, visible uniquement sur mobile (clic-to-call).
 * CTA principal de conversion pour un serrurier d'urgence.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand/95 p-3 backdrop-blur md:hidden">
      <a
        href={telHref}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-bold text-brand"
        aria-label={`Appeler ${SITE.name} au ${SITE.phone}`}
      >
        📞 Appeler — {SITE.phone}
      </a>
    </div>
  );
}
