import type { Metadata } from "next";

import { SITE, addressInline, mailHref } from "@/data/site";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données personnelles de ${SITE.name}.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Politique de confidentialité", url: "/politique-de-confidentialite" },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Politique de confidentialité
      </h1>
      <p className="mt-2 text-sm text-foreground/60">
        Cette politique décrit comment {SITE.name} collecte et traite vos
        données personnelles, conformément au Règlement Général sur la
        Protection des Données (RGPD).
      </p>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Responsable de traitement</h2>
        <p>
          {SITE.name}, {addressInline}, joignable à{" "}
          <a href={mailHref} className="hover:text-accent">
            {SITE.email}
          </a>
          , est responsable du traitement des données personnelles collectées
          sur ce site.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">
          Données collectées via le formulaire de contact
        </h2>
        <p>
          Lorsque vous remplissez le formulaire de la page{" "}
          <a href="/contact" className="hover:text-accent">
            Contact
          </a>
          , nous collectons : votre nom, votre numéro de téléphone, votre
          adresse email (si renseignée), la zone concernée (si renseignée) et
          le contenu de votre message.
        </p>
        <table className="mt-4 w-full border-collapse text-sm">
          <tbody>
            <tr className="border-t border-border">
              <th className="py-2 pr-4 text-left font-semibold">Finalité</th>
              <td className="py-2">
                Traiter votre demande de devis ou de dépannage, vous
                recontacter.
              </td>
            </tr>
            <tr className="border-t border-border">
              <th className="py-2 pr-4 text-left font-semibold">Base légale</th>
              <td className="py-2">
                Exécution de mesures précontractuelles prises à votre demande
                (article 6.1.b du RGPD).
              </td>
            </tr>
            <tr className="border-t border-border">
              <th className="py-2 pr-4 text-left font-semibold">
                Destinataires
              </th>
              <td className="py-2">
                {SITE.name} uniquement, ainsi que nos prestataires
                techniques agissant en sous-traitants (hébergement du site,
                envoi de l&apos;e-mail de notification). Aucune donnée n&apos;est
                vendue ni cédée à des tiers à des fins commerciales.
              </td>
            </tr>
            <tr className="border-t border-border">
              <th className="py-2 pr-4 text-left font-semibold">
                Durée de conservation
              </th>
              <td className="py-2">
                3 ans à compter du dernier contact, en l&apos;absence de suite
                commerciale.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, de limitation et
          d&apos;opposition au traitement de vos données, ainsi que d&apos;un
          droit à la portabilité. Pour exercer ces droits, contactez-nous à{" "}
          <a href={mailHref} className="hover:text-accent">
            {SITE.email}
          </a>
          . Vous disposez également du droit d&apos;introduire une réclamation
          auprès de la CNIL (www.cnil.fr).
        </p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Cookies et traceurs</h2>
        <p>
          Ce site n&apos;utilise actuellement aucun cookie de mesure
          d&apos;audience ni traceur publicitaire.
        </p>
        <p className="text-sm text-foreground/50">
          {/* Si un outil d'analytics (voir NEXT_PUBLIC_ANALYTICS_ID) est
              activé ultérieurement, cette section et le recueil du
              consentement cookies devront être mis à jour en conséquence. */}
          Cette section sera mise à jour si un outil de mesure d&apos;audience
          est activé.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-foreground/80">
        <h2 className="text-xl font-bold">Sécurité</h2>
        <p>
          Nous mettons en œuvre les mesures techniques et organisationnelles
          raisonnables pour protéger vos données contre l&apos;accès non
          autorisé, la perte ou la divulgation.
        </p>
      </section>
    </article>
  );
}
