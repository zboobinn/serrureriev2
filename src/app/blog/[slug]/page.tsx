import type { Metadata } from "next";
import { notFound } from "next/navigation";

/*
 * Emplacement prêt pour les futurs articles (rendu Markdown/MDX + JSON-LD
 * `Article`, à implémenter avec le pipeline de contenu choisi). Aucun
 * article n'existe encore : `generateStaticParams` renvoie un tableau vide et
 * toute URL renvoie 404. `noindex` explicite en filet de sécurité, en plus
 * du 404 naturel — voir SEO-GUIDE.md pour la procédure de mise en index une
 * fois du contenu réel en place.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function BlogArticlePage() {
  notFound();
}
