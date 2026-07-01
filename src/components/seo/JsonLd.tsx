import type { JsonLdObject } from "@/lib/json-ld";

/**
 * Injecte un (ou plusieurs) bloc(s) JSON-LD dans le HTML.
 *
 * Server Component : le script est rendu côté serveur et fait donc partie du
 * HTML initial (indexable, aucun JS client requis).
 */
export function JsonLd({ schema }: { schema: JsonLdObject | JsonLdObject[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify échappe déjà le contenu ; pas d'entrée utilisateur ici.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
