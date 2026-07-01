import type { Metadata } from "next";

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
          <div className="rounded-lg bg-surface p-6">
            <a
              href={telHref}
              className="block rounded-full bg-accent px-6 py-3 text-center font-bold text-accent-foreground"
            >
              Appeler le {SITE.phone}
            </a>
            <address className="mt-4 space-y-1 text-sm not-italic text-foreground/80">
              <p>{SITE.name}</p>
              <p>{addressInline}</p>
              <p>
                <a href={mailHref} className="hover:text-accent">
                  {SITE.email}
                </a>
              </p>
              <p>{SITE.openingHours.label}</p>
            </address>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Localisation ${SITE.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
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
