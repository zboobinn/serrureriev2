import type { Metadata } from "next";
import Link from "next/link";

import { services, serviceHref } from "@/data/services";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SERVICE_ICONS } from "@/components/sections/service-icons";

export const metadata: Metadata = {
  title: "Nos services de serrurerie",
  description:
    "Dépannage d'urgence, portes blindées, portes de garage, rideaux métalliques, serrures haute sécurité et conseil en sécurité : nos services de serrurerie à Lyon et dans le Grand Lyon.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Nos services de serrurerie
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">
        Du dépannage d&apos;urgence à la sécurisation complète de votre porte,
        découvrez l&apos;ensemble de nos prestations à Lyon et dans le Grand
        Lyon.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.slug];
          return (
            <li key={service.slug}>
              <Link
                href={serviceHref(service)}
                className="focus-ring group block h-full rounded-card border border-border bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-accent-strong hover:shadow-card-hover"
              >
                {Icon && (
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent-strong/30 bg-background text-accent-strong">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                )}
                <h2 className="mt-4 text-lg font-bold">{service.nom}</h2>
                <p className="mt-2 text-sm text-foreground/70">
                  {service.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
