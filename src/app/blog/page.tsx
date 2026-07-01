import type { Metadata } from "next";
import { Phone } from "lucide-react";

import { SITE, telHref } from "@/data/site";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/*
 * Structure prête, contenu à venir. Volontairement en `noindex` tant qu'aucun
 * article n'est publié (thin content) — voir SEO-GUIDE.md pour la procédure
 * de repassage en index une fois du contenu réel en place. Exclu de
 * sitemap.ts pour la même raison.
 */
export const metadata: Metadata = {
  title: "Blog",
  description: `Conseils et actualités serrurerie de ${SITE.name}.`,
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Blog
      </h1>
      <p className="mt-6 text-lg text-foreground/80">
        Nos premiers articles de conseils serrurerie arrivent bientôt. En
        attendant, une urgence ou une question ?
      </p>

      <a
        href={telHref}
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
      >
        <Phone aria-hidden="true" className="size-4" />
        Appeler le {SITE.phone}
      </a>
    </section>
  );
}
