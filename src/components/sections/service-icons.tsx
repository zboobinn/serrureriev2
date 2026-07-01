import {
  ClipboardCheck,
  Lock,
  PanelTop,
  ShieldCheck,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icône associée à chaque service, par slug — purement visuel (design), sans
 * lien avec les données rédactionnelles de `@/data/services.ts`. Partagé
 * entre l'accueil et le hub /services pour rester cohérent.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "depannage-urgent": Wrench,
  "portes-blindees": ShieldCheck,
  "portes-de-garage": Warehouse,
  "rideaux-metalliques": PanelTop,
  "serrures-haute-securite": Lock,
  "conseil-en-securite": ClipboardCheck,
};
