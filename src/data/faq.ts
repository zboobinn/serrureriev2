/**
 * FAQ de l'accueil — source unique.
 *
 * ⚠️ Le JSON-LD `FAQPage` doit correspondre EXACTEMENT aux questions/réponses
 * réellement affichées à l'écran (voir @/lib/json-ld → faqSchema). Ne pas
 * dupliquer ce contenu ailleurs avec des variantes différentes.
 */

export interface FaqItem {
  question: string;
  reponse: string;
}

export const faq: FaqItem[] = [
  {
    question: "Intervenez-vous vraiment 24h/24 et 7j/7 ?",
    reponse:
      "Oui, nous intervenons en urgence de jour comme de nuit, week-ends et jours fériés compris, sur Lyon et le Grand Lyon.",
  },
  {
    question: "Quel est le prix d'une intervention ?",
    reponse:
      "Le tarif dépend du type d'intervention (dépannage, remplacement de serrure, pose de porte blindée...) et de la complexité du chantier. Nous vous communiquons un prix clair avant toute intervention non urgente, et un devis gratuit sur demande.",
  },
  {
    question: "Pouvez-vous ouvrir ma porte sans l'endommager ?",
    reponse:
      "Dans la grande majorité des cas, oui : nous privilégions les techniques d'ouverture fine qui préservent la porte et la serrure, avant d'envisager un remplacement si nécessaire.",
  },
  {
    question: "Dans quelles villes intervenez-vous ?",
    reponse:
      "Nous intervenons dans les 9 arrondissements de Lyon et dans les communes du Grand Lyon (Villeurbanne, Caluire-et-Cuire, Bron, Vénissieux...). Consultez notre page zones d'intervention pour le détail complet.",
  },
  {
    question: "Proposez-vous un devis gratuit ?",
    reponse:
      "Oui, pour toute intervention non urgente (portes blindées, serrures haute sécurité, rideaux métalliques...), nous établissons un devis gratuit avant travaux.",
  },
];
