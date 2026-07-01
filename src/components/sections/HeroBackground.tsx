/**
 * Fond abstrait du hero : dégradés sombres, halo doré, texture "métal
 * brossé" (bandes CSS très fines) et silhouette de serrure en SVG inline.
 * 100% décoratif (`aria-hidden`), aucune image téléchargée — zéro coût LCP.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand via-background to-brand-2" />

      {/* Halo doré — contenu par overflow-hidden ci-dessus, ne doit jamais
          élargir la largeur de la page (cf. incident scrollbar horizontale). */}
      <div className="absolute top-1/2 right-0 size-[560px] -translate-y-1/2 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />

      {/* Texture "métal brossé" — bandes très fines, opacité minimale */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Silhouette de serrure stylisée */}
      <svg
        viewBox="0 0 200 320"
        className="absolute top-1/2 right-[2%] h-[70%] w-auto -translate-y-1/2 opacity-[0.12] sm:right-[6%]"
      >
        <circle cx="100" cy="90" r="68" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <path
          d="M72 158 L128 158 L152 296 L48 296 Z"
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      {/* Fondu vers le bas pour ancrer la section suivante */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
