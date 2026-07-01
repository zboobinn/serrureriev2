import Link from "next/link";

export type BreadcrumbItem = { name: string; url: string };

/**
 * Fil d'Ariane visuel. Le pendant structuré (JSON-LD `BreadcrumbList`) est
 * généré séparément via `breadcrumbSchema` (@/lib/json-ld) à partir des mêmes
 * items, pour garantir la cohérence visuel ↔ balisage.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-foreground/60">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="focus-ring rounded-sm transition-colors hover:text-accent-strong"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
