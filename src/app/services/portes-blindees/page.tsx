import type { Metadata } from "next";

import { requireServiceBySlug } from "@/data/services";
import { buildServiceMetadata } from "@/lib/seo";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

const service = requireServiceBySlug("portes-blindees");

export const metadata: Metadata = buildServiceMetadata(service);

export default function Page() {
  return <ServiceTemplate service={service} />;
}
