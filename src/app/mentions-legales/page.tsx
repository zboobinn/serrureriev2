import type { Metadata } from "next";

import { SITE, addressInline, telHref, mailHref } from "@/data/site";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site de ${SITE.name}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

/*
 * ⚠️ Page à faire valider par le client (ou un professionnel du droit)
 * avant mise en ligne. Toutes les données non fournies dans
 * PROMPT-DEMARRAGE.md sont laissées en placeholder — aucune donnée légale
 * (SIRET, forme juridique, assurance, médiateur...) n'est inventée.
 */
export default function MentionsLegalesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Mentions légales", url: "/mentions-legales" },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Mentions légales
      </h1>
      <p className="mt-2 text-sm text-foreground/60">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
        pour la confiance dans l&apos;économie numérique (LCEN).
      </p>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Éditeur du site</h2>
        <p>Raison sociale : {SITE.name}</p>
        <p>Forme juridique : Entrepreneur individuel</p>
        <p>Capital social (le cas échéant) : Aucun</p>
        <p>Adresse du siège : {addressInline}</p>
        <p>
          Téléphone :{" "}
          <a href={telHref} className="focus-ring rounded-sm transition-colors hover:text-accent-strong">
            {SITE.phone}
          </a>
        </p>
        <p>
          Email :{" "}
          <a href={mailHref} className="focus-ring rounded-sm transition-colors hover:text-accent-strong">
            {SITE.email}
          </a>
        </p>
        <p>Numéro SIRET : 45359868200046</p>
        {/*<p>Immatriculation (RCS ou Répertoire des Métiers) : À COMPLÉTER PAR LE CLIENT</p>*/}
        <p>Numéro de TVA intracommunautaire (le cas échéant) : FR33453598682</p>
        <p>Directeur de la publication : Roland NOAILLES</p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc. — 340 S Lemon Ave #4133, Walnut,
          CA 91789, États-Unis.
        </p>
        <p className="text-sm text-foreground/50">
          {/* À vérifier avant publication : l'adresse officielle de
              l'hébergeur peut évoluer. Se référer à vercel.com/legal. */}
          Adresse à vérifier avant mise en ligne (vercel.com/legal).
        </p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">
          Assurances professionnelles
        </h2>
        <p>
          {SITE.name} déclare être couverte par une assurance responsabilité
          civile professionnelle et, pour les travaux relevant du gros
          œuvre ou du second œuvre du bâtiment, par une garantie décennale.
        </p>
        {/*
        <p>Assureur et numéro de police : À COMPLÉTER PAR LE CLIENT</p>
        */}
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Médiation de la consommation</h2>
        <p>
          Conformément aux articles L.616-1 et R.616-1 du Code de la
          consommation, en cas de litige non résolu directement avec notre
          entreprise, le client peut recourir gratuitement à un médiateur de
          la consommation.
        </p>
        {/*}
        <p>
          Médiateur compétent, coordonnées et site internet : À COMPLÉTER PAR
          LE CLIENT
        </p>
        */}
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, images,
          logo) est protégé au titre du droit d&apos;auteur. Toute
          reproduction sans autorisation préalable est interdite.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Données personnelles</h2>
        <p>
          Le traitement des données personnelles collectées sur ce site est
          détaillé dans notre{" "}
          <a href="/politique-de-confidentialite" className="focus-ring rounded-sm transition-colors hover:text-accent-strong">
            politique de confidentialité
          </a>
          .
        </p>
      </section>
    </article>
  );
}
