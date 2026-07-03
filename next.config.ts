import type { NextConfig } from "next";
import { GOOGLE_REVIEW_URL } from "./src/data/site";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Redirections 301 permanentes depuis les anciennes URL WordPress, pour
   * préserver l'autorité SEO déjà acquise sur le domaine historique lors du
   * passage au nouveau site.
   *
   * `permanent: true` → statut 301 (et non 302), signal fort à Google que
   * l'URL a définitivement changé de place.
   *
   * Pas de slash final dans `source` : `trailingSlash` n'est pas activé
   * (valeur par défaut `false`), donc Next.js normalise déjà en interne les
   * URL avec slash final (ex. WordPress) vers leur équivalent sans slash
   * avant de les faire correspondre aux règles ci-dessous — une seule entrée
   * par ancienne URL couvre donc les deux formes.
   */
  async redirects() {
    return [
      {
        source: "/depannage-de-serrure-a-lyon",
        destination: "/services/depannage-urgent",
        permanent: true,
      },
      {
        source: "/portes-blindees",
        destination: "/services/portes-blindees",
        permanent: true,
      },
      {
        source: "/porte-de-garage",
        destination: "/services/portes-de-garage",
        permanent: true,
      },
      {
        source: "/rideaux-metalliques",
        destination: "/services/rideaux-metalliques",
        permanent: true,
      },
      {
        source: "/serrurier-lyon-3",
        destination: "/zones/serrurier-lyon-3",
        permanent: true,
      },
      {
        source: "/serrurier-lyon-6",
        destination: "/zones/serrurier-lyon-6",
        permanent: true,
      },
      {
        source: "/serrurier-lyon-7",
        destination: "/zones/serrurier-lyon-7",
        permanent: true,
      },
      {
        source: "/types-de-serrures-avantages-inconvenients",
        destination: "/services/serrures-haute-securite",
        permanent: true,
      },
      {
        // Lien de marque vers la page d'avis Google. 307 volontairement
        // temporaire : la cible peut changer (voir GOOGLE_REVIEW_URL dans
        // src/data/site.ts, source de vérité).
        source: "/avis",
        destination: GOOGLE_REVIEW_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
