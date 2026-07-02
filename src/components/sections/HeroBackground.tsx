import Image from "next/image";

/**
 * Fond abstrait du hero : dégradés sombres, halo doré, texture "métal
 * brossé" (bandes CSS très fines) et photo du trou de serrure en laiton.
 * 100% décoratif (`aria-hidden` / alt vide).
 *
 * Fondu de la photo : son fond est noir pur, donc `mix-blend-mode: screen`
 * rend ce noir totalement transparent (il n'ajoute rien au fond) — seul le
 * contour laiton et la lumière du trou ressortent, sans aucune bordure
 * visible. Un masque en dégradé sur les bords dissout la découpe pour un
 * fondu parfait dans le fond gris brossé.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand via-background to-brand-2" />

      {/* Halo doré — contenu par overflow-hidden ci-dessus, ne doit jamais
          élargir la largeur de la page (cf. incident scrollbar horizontale). */}
      <div className="absolute top-1/2 right-0 size-140 -translate-y-1/2 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />

      {/* Texture "métal brossé" — bandes très fines, opacité minimale */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Photo du trou de serrure — fondu par mix-blend screen + masque bords */}
      <Image
        src="/serrure-hero.jpg"
        alt=""
        width={736}
        height={1308}
        priority
        sizes="(max-width: 640px) 45vw, 34rem"
        className="pointer-events-none absolute top-0 right-[5%] h-full w-auto object-contain object-top opacity-35 mix-blend-screen select-none mask-[linear-gradient(to_left,black_55%,transparent),linear-gradient(to_bottom,black_75%,transparent)] mask-intersect"
      />

      {/* Fondu vers le bas pour ancrer la section suivante */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
