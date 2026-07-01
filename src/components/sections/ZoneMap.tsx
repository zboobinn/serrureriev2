import { arrondissements, communes } from "@/data/zones";

/**
 * Carte stylisée illustrative de la zone d'intervention — pas une carte
 * géographique réelle (pas d'API tierce, pas de script externe, pas de
 * risque de rupture ni d'impact LCP). Un hub (siège à Villeurbanne) entouré
 * de deux anneaux représentant les arrondissements et les communes du Grand
 * Lyon, avec les effectifs réels tirés de `@/data/zones`.
 */
export function ZoneMap() {
  const innerCount = arrondissements.length;
  const outerCount = communes.length;

  const innerDots = Array.from({ length: innerCount }, (_, i) => {
    const angle = (i / innerCount) * 2 * Math.PI - Math.PI / 2;
    return { x: 160 + 70 * Math.cos(angle), y: 160 + 70 * Math.sin(angle) };
  });
  const outerDots = Array.from({ length: outerCount }, (_, i) => {
    const angle = (i / outerCount) * 2 * Math.PI - Math.PI / 2;
    return { x: 160 + 128 * Math.cos(angle), y: 160 + 128 * Math.sin(angle) };
  });

  // Chaîne assemblée en amont : un seul nœud texte dans le <title>, pour
  // éviter tout risque de désync d'hydratation entre les fragments de texte
  // et les expressions interpolées (voir incident hydration mismatch).
  const titleText =
    `Carte illustrative de la zone d'intervention : Villeurbanne (siège) ` +
    `au centre, ${innerCount} arrondissements de Lyon sur l'anneau intérieur, ` +
    `${outerCount} communes du Grand Lyon sur l'anneau extérieur.`;

  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="zone-map-title"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <title id="zone-map-title">{titleText}</title>

      <circle cx="160" cy="160" r="128" fill="none" stroke="var(--border)" strokeDasharray="2 6" />
      <circle cx="160" cy="160" r="70" fill="none" stroke="var(--border)" strokeDasharray="2 6" />

      {outerDots.map((d, i) => (
        <circle key={`outer-${i}`} cx={d.x} cy={d.y} r="3.5" className="fill-accent-muted" />
      ))}
      {innerDots.map((d, i) => (
        <circle key={`inner-${i}`} cx={d.x} cy={d.y} r="4.5" className="fill-accent-strong" />
      ))}

      {/* Halo + point central : siège de Villeurbanne */}
      <circle cx="160" cy="160" r="22" className="fill-accent/10" />
      <circle cx="160" cy="160" r="10" className="fill-accent motion-safe:animate-pulse" />
    </svg>
  );
}
