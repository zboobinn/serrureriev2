import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { SITE, telHref, mailHref, addressInline } from "@/data/site";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Devis gratuit",
  description:
    "Contactez Serrurerie Roland pour un devis gratuit ou une intervention d'urgence à Lyon et dans le Grand Lyon. Disponible 24h/24 et 7j/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Contact", url: "/contact" },
  ];

  const mapQuery = encodeURIComponent(`${addressInline}`);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Contactez-nous
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">
        Besoin d&apos;un dépannage en urgence ou d&apos;un devis gratuit ?
        Appelez-nous directement ou laissez-nous un message, nous vous
        recontactons rapidement.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="rounded-card border border-border bg-surface p-6 shadow-card">
            <a
              href={telHref}
              className="focus-ring flex items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3 text-center font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90"
            >
              <Phone aria-hidden="true" className="size-4" />
              Appeler le {SITE.phone}
            </a>
            <address className="mt-4 space-y-2 text-sm not-italic text-foreground/80">
              <p className="font-semibold text-foreground">{SITE.name}</p>
              <p className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                {addressInline}
              </p>
              <p className="flex items-center gap-2">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-accent-strong" />
                <a href={mailHref} className="focus-ring rounded-sm transition-colors hover:text-accent-strong">
                  {SITE.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock aria-hidden="true" className="size-4 shrink-0 text-accent-strong" />
                {SITE.openingHours.label}
              </p>
            </address>
          </div>

          {/*
            Pas d'iframe Google Maps : la version "sans clé API"
            (google.com/maps?...&output=embed) est une URL non officielle,
            susceptible de casser sans préavis, et alourdit inutilement le
            LCP pour un site dont l'argument n°1 est la vitesse. Un simple
            lien sortant est plus léger et plus fiable. Si une carte visuelle
            est souhaitée plus tard, l'API Maps Embed officielle nécessite
            une clé Google (GOOGLE_MAPS_EMBED_API_KEY, non configurée).
          */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-6 block rounded-card border border-border bg-surface p-6 shadow-card transition-colors hover:border-accent-strong"
          >
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/60">
              <MapPin aria-hidden="true" className="size-4" />
              Nous trouver
            </p>
            <p className="mt-2 text-foreground/80">{addressInline}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-accent-strong">
              Voir sur Google Maps →
            </span>
          </a>
        </div>

        <div>
          <h2 className="text-xl font-bold">Demander un devis gratuit</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
