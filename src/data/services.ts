/**
 * Données des services — Serrurerie Roland
 *
 * Source unique pour : la page hub `/services`, les 6 pages `/services/{slug}`,
 * le sitemap, et le maillage interne (zones ↔ services).
 *
 * Objectif SEO : contenu rédactionnel propre et non dupliqué par service ;
 * aucune statistique inventée (voir PROMPT-DEMARRAGE.md).
 */

export interface Service {
  /** Identifiant d'URL. URL finale = /services/{slug} */
  slug: string;
  /** Nom court (nav, cartes, footer). */
  nom: string;
  /** Titre H1 de la page service. */
  titre: string;
  /** Description courte pour meta description / cartes. */
  description: string;
  /** Paragraphe d'introduction, en tête de page. */
  intro: string;
  /** Ce que couvre le service, en points concrets. */
  prestations: string[];
  /** Public / situation typiquement concernée. */
  pourQui: string;
  /** true si le service relève typiquement de l'urgence (24/7 mis en avant). */
  urgence?: boolean;
}

export const services: Service[] = [
  {
    slug: "depannage-urgent",
    nom: "Dépannage urgent",
    titre: "Dépannage serrurerie en urgence à Lyon",
    description:
      "Porte claquée, serrure cassée, clé perdue ou cassée : intervention de dépannage serrurerie en urgence, 24h/24 et 7j/7, sur Lyon et le Grand Lyon.",
    intro:
      "Porte bloquée, serrure grippée ou clé cassée dans la serrure : nos interventions d'urgence visent à vous redonner l'accès à votre logement ou local le plus rapidement possible, avec le souci constant de ne pas endommager votre porte.",
    prestations: [
      "Ouverture de porte claquée ou verrouillée sans les clés",
      "Extraction de clé cassée ou coincée dans le barillet",
      "Remplacement de serrure cassée ou hors d'usage",
      "Dépannage après tentative d'effraction",
      "Intervention de nuit, week-end et jours fériés",
    ],
    pourQui:
      "Particuliers et professionnels confrontés à une perte de clés, une porte claquée ou une panne de serrure, à toute heure.",
    urgence: true,
  },
  {
    slug: "portes-blindees",
    nom: "Portes blindées",
    titre: "Installation de portes blindées à Lyon",
    description:
      "Fourniture et pose de portes blindées certifiées à Lyon et dans le Grand Lyon, adaptées à votre logement et à vos exigences de sécurité.",
    intro:
      "La porte blindée reste la protection la plus efficace contre l'effraction. Nous vous conseillons sur le niveau de blindage adapté à votre bâti (immeuble ancien, copropriété, maison individuelle) et assurons une pose soignée, sans dégrader votre encadrement existant.",
    prestations: [
      "Conseil et choix du blindage adapté à votre porte existante",
      "Pose de blocs-portes blindés certifiés A2P",
      "Renforcement de porte existante par blindage complémentaire",
      "Remplacement de serrures et paumelles associées",
      "Intervention en copropriété comme en maison individuelle",
    ],
    pourQui:
      "Propriétaires et syndics souhaitant sécuriser durablement une entrée de logement, en habitat collectif ou individuel.",
  },
  {
    slug: "portes-de-garage",
    nom: "Portes de garage",
    titre: "Portes de garage : pose, motorisation et dépannage à Lyon",
    description:
      "Installation, motorisation et réparation de portes de garage à Lyon et dans le Grand Lyon, pour maisons individuelles et locaux d'activité.",
    intro:
      "Qu'il s'agisse d'une porte de garage neuve, d'une motorisation à ajouter ou d'une panne à réparer, nous intervenons sur l'ensemble des systèmes courants (basculante, sectionnelle, enroulable) pour un usage fiable au quotidien.",
    prestations: [
      "Pose de porte de garage neuve, sur mesure ou standard",
      "Motorisation de porte de garage existante",
      "Réparation de panne (moteur, ressort, rail, télécommande)",
      "Remplacement de serrure ou verrou de porte de garage",
      "Entretien préventif pour limiter les pannes",
    ],
    pourQui:
      "Propriétaires de maison individuelle et gestionnaires de locaux d'activité équipés d'une porte de garage.",
  },
  {
    slug: "rideaux-metalliques",
    nom: "Rideaux métalliques",
    titre: "Rideaux métalliques : installation et réparation à Lyon",
    description:
      "Installation, réparation et sécurisation de rideaux métalliques de commerces et locaux professionnels à Lyon et dans le Grand Lyon.",
    intro:
      "Le rideau métallique reste la protection de référence pour les devantures de commerce. Nous intervenons aussi bien pour l'installation d'un rideau neuf que pour le dépannage d'un rideau bloqué ou endommagé, avec un objectif : limiter l'interruption d'activité.",
    prestations: [
      "Installation de rideau métallique à lames pleines ou ajourées",
      "Motorisation de rideau métallique",
      "Réparation de rideau bloqué, faussé ou endommagé",
      "Remplacement de serrures et systèmes de verrouillage",
      "Intervention rapide en cas de rideau forcé",
    ],
    pourQui:
      "Commerçants et professionnels souhaitant équiper ou sécuriser la devanture de leur local.",
  },
  {
    slug: "serrures-haute-securite",
    nom: "Serrures haute sécurité",
    titre: "Serrures haute sécurité à Lyon",
    description:
      "Installation de serrures multipoints et haute sécurité certifiées A2P à Lyon et dans le Grand Lyon, pour logements et locaux professionnels.",
    intro:
      "Une serrure haute sécurité constitue un investissement ciblé et efficace pour renforcer une porte existante, sans nécessairement la remplacer. Nous vous orientons vers un niveau de certification adapté à votre exposition au risque.",
    prestations: [
      "Pose de serrures multipoints certifiées A2P",
      "Remplacement de cylindre par un modèle haute sécurité",
      "Installation de serrures à clé protégée (copie contrôlée)",
      "Sécurisation de porte palière en copropriété",
      "Conseil sur le niveau de certification adapté",
    ],
    pourQui:
      "Particuliers et professionnels souhaitant renforcer la sécurité d'une porte sans la remplacer entièrement.",
  },
  {
    slug: "conseil-en-securite",
    nom: "Conseil en sécurité",
    titre: "Conseil en sécurisation de porte et d'accès à Lyon",
    description:
      "Diagnostic et conseil personnalisé en sécurisation de porte, de serrure et de contrôle d'accès à Lyon et dans le Grand Lyon.",
    intro:
      "Avant de blinder une porte ou de remplacer une serrure, un diagnostic sur place permet d'identifier les points faibles réels de votre logement ou local et de prioriser les travaux les plus utiles, sans dépense superflue.",
    prestations: [
      "Diagnostic de sécurité de porte et de serrure sur place",
      "Recommandations priorisées selon votre budget",
      "Conseil sur les certifications (A2P) et leur niveau utile",
      "Accompagnement de copropriétés sur la sécurisation des accès",
      "Devis détaillé avant tous travaux",
    ],
    pourQui:
      "Propriétaires, locataires et syndics souhaitant un avis professionnel avant d'engager des travaux de sécurisation.",
  },
];

/** Préfixe d'URL commun aux pages service. */
export const SERVICE_URL_PREFIX = "/services/";

/** URL complète d'un service (ex: /services/depannage-urgent). */
export const serviceHref = (s: Pick<Service, "slug">) =>
  `${SERVICE_URL_PREFIX}${s.slug}`;

/** Tous les slugs — pratique pour generateStaticParams(). */
export const allServiceSlugs = services.map((s) => s.slug);

/** Récupère un service par son slug. */
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/**
 * Récupère un service par son slug ou échoue au build (utilisé par les
 * pages `/services/{slug}` dédiées, où le slug est connu statiquement).
 */
export const requireServiceBySlug = (slug: string): Service => {
  const service = getServiceBySlug(slug);
  if (!service) {
    throw new Error(`Service inconnu: "${slug}" (vérifier @/data/services.ts)`);
  }
  return service;
};
