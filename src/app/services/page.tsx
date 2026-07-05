import type { Metadata } from "next";

import { services } from "@/data/services";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";

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

      <div className="mt-10">
        <ServicesShowcase services={services} headingLevel="h2" />
      </div>
    </section>
  );
}
