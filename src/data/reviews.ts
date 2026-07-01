/**
 * Avis clients réels — Serrurerie Roland.
 *
 * Source unique et figée : ces 10 avis (tous notés 5/5) proviennent de
 * PROMPT-DEMARRAGE.md, fautes de frappe évidentes corrigées sans changer le
 * sens. NE PAS EN AJOUTER, NE PAS EN INVENTER — c'est la seule source de
 * vérité pour l'affichage des avis et pour l'`AggregateRating` JSON-LD
 * (ratingValue 5, reviewCount 10).
 */

export interface Review {
  id: number;
  author: string;
  rating: number;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    author: "Cfgs",
    rating: 5,
    date: "2024-11-18",
    text: "L'entreprise Roland est intervenue chez ma maman et je dois dire qu'il est assez rare de nos jours de trouver un artisan aussi professionnel et sérieux. Qualité de la communication que ce soit par message ou au téléphone. Qualité des travaux réalisés. Ponctualité et rapidité de l'intervention. Je recommande vivement cet artisan. Merci encore pour tout",
  },
  {
    id: 2,
    author: "ChristophedeMarinis",
    rating: 5,
    date: "2024-03-20",
    text: "Intervention rapide, sympa et sérieux",
  },
  {
    id: 3,
    author: "angel111x",
    rating: 5,
    date: "2024-02-01",
    text: "Impeccable. J'ai été impressionné par la rapidité avec laquelle Roland est intervenu après avoir perdu les clés de mon appartement. Il était chez moi en moins de 30 minutes et a ouvert ma porte sans aucun dommage. Je recommande vivement",
  },
  {
    id: 4,
    author: "OlivierRx",
    rating: 5,
    date: "2022-04-12",
    text: "Franchement, un bon retour d'expérience. Roland a pris le temps de nous conseiller pour la pose d'une porte de garage dans un local un peu compliqué. Puis les travaux ont été faits dans la foulée, sans problème.",
  },
  {
    id: 5,
    author: "JonathanSerres",
    rating: 5,
    date: "2019-03-18",
    text: "J'ai fait appel à ses services en week-end, très rapide et réactif et avec le sourire, ce qui est rare, et de très bons conseils. Il faut savoir dire les choses quand c'est bien fait : merci à vous et bravo",
  },
  {
    id: 6,
    author: "jcb",
    rating: 5,
    date: "2019-02-23",
    text: "Mon chantier d'installation d'une porte d'entrée, d'une porte de garage et de pose de fenêtres + quelques rafraîchissements s'est très bien passé : délais d'exécution et devis initial ont été respectés. Très bon professionnel, à recommander",
  },
  {
    id: 7,
    author: "Lionel Peronnet",
    rating: 5,
    date: "2026-04-12",
    text: "Nous avons fait remplacer notre porte de garage par la société Serrurerie Roland. Efficacité, amabilité, disponibilité, tout est là et le travail très bien réalisé.",
  },
  {
    id: 8,
    author: "Gisèle",
    rating: 5,
    date: "2026-03-08",
    text: "Je recommande vivement la Serrurerie Roland, pour le travail soigné et consciencieux effectué dans des conditions hivernales et un accès rendu difficile à cause de la neige. Merci.",
  },
  {
    id: 9,
    author: "Nicole Moisson",
    rating: 5,
    date: "2025-11-04",
    text: "Travail efficace et très bien réalisé !!! Très satisfaite... Mme Moisson.",
  },
  {
    id: 10,
    author: "Marine Berthet",
    rating: 5,
    date: "2026-01-29",
    text: "Travail impeccable et sérieux, je recommande à 100%",
  },
];

/** Note moyenne — figée à 5 (les 10 avis sont notés 5/5). */
export const averageRating = 5;

/** Nombre total d'avis — figé à la taille du tableau ci-dessus. */
export const reviewCount = reviews.length;
