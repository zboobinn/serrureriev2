/**
 * Données des zones d'intervention — Serrurerie Roland
 * Siège : 62 rue Racine, 69100 Villeurbanne (intervention Lyon + Grand Lyon)
 *
 * Objectif SEO : une landing page par zone, avec un contenu UNIQUE.
 * Le champ `angleSerrurier` + `caractere` + `typeBati` servent à faire varier
 * la rédaction d'une page à l'autre (éviter le duplicate content).
 *
 * URL cible : /zones/serrurier-{slug}
 * Ex : /zones/serrurier-lyon-3, /zones/serrurier-villeurbanne
 */

export type ZoneType = "arrondissement" | "commune";

export interface Zone {
  /** Identifiant d'URL. URL finale = /zones/serrurier-{slug} */
  slug: string;
  /** Nom court affiché (ex: "Lyon 3e", "Villeurbanne") */
  nom: string;
  /** Nom complet pour les titres/H1 (ex: "Lyon 3ᵉ arrondissement") */
  nomComplet: string;
  type: ZoneType;
  codePostal: string;
  /** Situation géo dans l'agglo, pour varier les intros */
  secteur: string;
  /** Quartiers rattachés — à citer pour ancrer le contenu localement */
  quartiers: string[];
  /** Points de repère connus — renforcent la pertinence locale */
  pointsDeRepere: string[];
  /** Caractère urbain du secteur (ambiance, densité) */
  caractere: string;
  /** Type de bâti dominant — oriente le vocabulaire technique */
  typeBati: string;
  /** Angle serrurier spécifique : le cœur de l'unicité éditoriale de la page */
  angleSerrurier: string;
  /** Slugs des zones limitrophes, pour le maillage interne */
  limitrophes: string[];
  /** true pour la zone où se trouve le siège (à mettre en avant) */
  siege?: boolean;
  /**
   * Contenu rédactionnel UNIQUE écrit à la main, pour enrichir en priorité
   * les zones stratégiques (les 9 arrondissements + Villeurbanne) et renforcer
   * l'unicité SEO au-delà de ce que génèrent déjà `angleSerrurier`/`quartiers`.
   * Chaque entrée = un paragraphe. Optionnel : si absent, la page compose son
   * contenu à partir des autres champs (aucune page ne reste vide).
   * // À COMPLÉTER PAR LE CLIENT (zone par zone, quand le temps le permet)
   */
  texteUnique?: string[];
}

export const zones: Zone[] = [
  // ─────────────────────────────  ARRONDISSEMENTS DE LYON  ─────────────────────────────
  {
    slug: "lyon-1",
    nom: "Lyon 1er",
    nomComplet: "Lyon 1ᵉʳ arrondissement",
    type: "arrondissement",
    codePostal: "69001",
    secteur: "Centre / bas des pentes de la Croix-Rousse",
    quartiers: ["Terreaux", "Pentes de la Croix-Rousse", "Saint-Vincent", "Cordeliers"],
    pointsDeRepere: ["Place des Terreaux", "Hôtel de Ville", "Opéra de Lyon", "Musée des Beaux-Arts", "Place Sathonay"],
    caractere: "quartier historique animé, ruelles en pente et vie nocturne dense",
    typeBati: "immeubles anciens d'époque canut, nombreux petits commerces et copropriétés",
    angleSerrurier:
      "Bâti ancien avec des portes et serrures parfois d'origine : beaucoup de demandes de remplacement de serrures vétustes, d'ouverture de porte claquée dans les immeubles sans concierge, et de sécurisation de commerces en rez-de-chaussée.",
    limitrophes: ["lyon-2", "lyon-4", "lyon-6"],
  },
  {
    slug: "lyon-2",
    nom: "Lyon 2e",
    nomComplet: "Lyon 2ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69002",
    secteur: "Presqu'île, du centre à la Confluence",
    quartiers: ["Bellecour", "Ainay", "Cordeliers", "Perrache", "Confluence"],
    pointsDeRepere: ["Place Bellecour", "Rue de la République", "Musée des Confluences", "Gare de Perrache", "Centre commercial Confluence"],
    caractere: "cœur commerçant de Lyon et quartier neuf de la Confluence",
    typeBati: "immeubles bourgeois haussmanniens au nord, résidences et bureaux récents à la Confluence",
    angleSerrurier:
      "Contraste entre serrures anciennes des immeubles bourgeois d'Ainay/Bellecour et serrures multipoints et contrôles d'accès des résidences récentes de la Confluence : interventions autant en dépannage classique qu'en maintenance d'accès sécurisés.",
    limitrophes: ["lyon-1", "lyon-5", "lyon-7"],
  },
  {
    slug: "lyon-3",
    nom: "Lyon 3e",
    nomComplet: "Lyon 3ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69003",
    secteur: "Est du centre, autour de la Part-Dieu",
    quartiers: ["Part-Dieu", "Préfecture", "Montchat", "Sans-Souci", "Dauphiné"],
    pointsDeRepere: ["Gare de la Part-Dieu", "Centre commercial Part-Dieu", "Tour Part-Dieu (le Crayon)", "Halles Paul Bocuse", "Préfecture du Rhône"],
    caractere: "arrondissement le plus peuplé, quartier d'affaires très fréquenté",
    typeBati: "grands ensembles tertiaires et résidentiels près de la Part-Dieu, maisons de ville à Montchat",
    angleSerrurier:
      "Forte densité résidentielle et tertiaire : dépannages urgents fréquents (portes claquées, clés perdues) et sécurisation de locaux professionnels autour de la Part-Dieu, avec un secteur pavillonnaire à Montchat demandant plutôt du blindage et des serrures haute sécurité.",
    limitrophes: ["lyon-6", "lyon-7", "lyon-8", "villeurbanne", "bron"],
  },
  {
    slug: "lyon-4",
    nom: "Lyon 4e",
    nomComplet: "Lyon 4ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69004",
    secteur: "Plateau de la Croix-Rousse",
    quartiers: ["Plateau de la Croix-Rousse", "Serin", "Gros Caillou"],
    pointsDeRepere: ["Boulevard de la Croix-Rousse", "Marché de la Croix-Rousse", "Gros Caillou", "Place de la Croix-Rousse"],
    caractere: "esprit village, familial et convivial, marchés réputés",
    typeBati: "immeubles anciens de canuts, copropriétés et maisons de ville en pente",
    angleSerrurier:
      "Immeubles anciens aux entrées étroites et portes d'époque : beaucoup de remplacements de serrures usées, de sécurisation d'appartements familiaux et de dépannages après tentative d'effraction sur du bâti ancien.",
    limitrophes: ["lyon-1", "lyon-9", "caluire-et-cuire"],
  },
  {
    slug: "lyon-5",
    nom: "Lyon 5e",
    nomComplet: "Lyon 5ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69005",
    secteur: "Ouest, du Vieux Lyon aux collines",
    quartiers: ["Vieux Lyon (Saint-Jean, Saint-Paul, Saint-Georges)", "Fourvière", "Point du Jour", "Ménival", "Champvert"],
    pointsDeRepere: ["Basilique de Fourvière", "Cathédrale Saint-Jean", "Vieux Lyon et ses traboules", "Théâtres romains de Fourvière"],
    caractere: "secteur patrimonial classé UNESCO et quartiers résidentiels sur les hauteurs",
    typeBati: "immeubles Renaissance et portes anciennes dans le Vieux Lyon, pavillons et résidences sur les collines",
    angleSerrurier:
      "Le Vieux Lyon impose un travail soigné sur des portes anciennes et parfois classées (respect du bâti, serrures adaptées), tandis que les quartiers de collines (Point du Jour, Champvert) demandent surtout du blindage et de la serrure haute sécurité pour maisons individuelles.",
    limitrophes: ["lyon-2", "lyon-9", "sainte-foy-les-lyon", "tassin-la-demi-lune"],
  },
  {
    slug: "lyon-6",
    nom: "Lyon 6e",
    nomComplet: "Lyon 6ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69006",
    secteur: "Nord-est, quartier des Brotteaux",
    quartiers: ["Brotteaux", "Foch", "Masséna", "Tête d'Or"],
    pointsDeRepere: ["Parc de la Tête d'Or", "Les Brotteaux (ancienne gare)", "Cité Internationale", "Boulevard des Belges"],
    caractere: "arrondissement résidentiel chic et bourgeois",
    typeBati: "immeubles bourgeois de standing, appartements familiaux haut de gamme",
    angleSerrurier:
      "Clientèle attentive à la sécurité et à la discrétion : demande importante en portes blindées, serrures multipoints certifiées A2P et sécurisation d'appartements de standing, avec exigence d'un travail propre et sans dégât sur des portes de valeur.",
    limitrophes: ["lyon-1", "lyon-3", "villeurbanne", "caluire-et-cuire"],
  },
  {
    slug: "lyon-7",
    nom: "Lyon 7e",
    nomComplet: "Lyon 7ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69007",
    secteur: "Sud-est, de la Guillotière à Gerland",
    quartiers: ["Guillotière", "Jean Macé", "Gerland", "Berthelot", "Université"],
    pointsDeRepere: ["Stade de Gerland", "Halle Tony Garnier", "Place Jean Macé", "campus universitaires et ENS"],
    caractere: "quartier étudiant, populaire et en pleine mutation",
    typeBati: "mix d'immeubles anciens, de logements étudiants et de résidences neuves à Gerland",
    angleSerrurier:
      "Forte rotation locative (étudiants, jeunes actifs) : nombreux changements de barillet entre deux locations, ouvertures de portes après perte de clés, et sécurisation de studios ; côté Gerland, davantage de locaux professionnels et de résidences récentes à équiper.",
    limitrophes: ["lyon-2", "lyon-3", "lyon-8"],
  },
  {
    slug: "lyon-8",
    nom: "Lyon 8e",
    nomComplet: "Lyon 8ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69008",
    secteur: "Sud-est résidentiel",
    quartiers: ["Monplaisir", "États-Unis", "Bachut", "Grand Trou", "Laënnec", "Mermoz"],
    pointsDeRepere: ["Institut Lumière (Monplaisir)", "Place du Bachut", "Hôpital Édouard Herriot", "quartier des États-Unis (Tony Garnier)"],
    caractere: "arrondissement résidentiel et familial en développement",
    typeBati: "immeubles des années 1930 à aujourd'hui, copropriétés et quelques maisons de ville",
    angleSerrurier:
      "Habitat familial dense : demandes régulières de remplacement de serrures, de blindage de porte d'appartement et de dépannage d'urgence, avec un tissu de commerces de proximité (Bachut, Monplaisir) à sécuriser.",
    limitrophes: ["lyon-3", "lyon-7", "bron", "venissieux"],
  },
  {
    slug: "lyon-9",
    nom: "Lyon 9e",
    nomComplet: "Lyon 9ᵉ arrondissement",
    type: "arrondissement",
    codePostal: "69009",
    secteur: "Nord-ouest, le long de la Saône",
    quartiers: ["Vaise", "Gorge de Loup", "Saint-Rambert", "Île Barbe", "La Duchère"],
    pointsDeRepere: ["Gare de Vaise", "Île Barbe", "quartier de La Duchère", "pôle multimodal Gorge de Loup"],
    caractere: "secteur mêlant zones résidentielles, tertiaires et rénovation urbaine",
    typeBati: "résidences récentes à Vaise, grands ensembles rénovés à La Duchère, maisons à Saint-Rambert",
    angleSerrurier:
      "Diversité de bâti : immeubles récents et tertiaires autour de Vaise/Gorge de Loup (contrôles d'accès, serrures multipoints) et pavillons de Saint-Rambert à protéger par du blindage, avec des interventions d'urgence courantes dans les copropriétés.",
    limitrophes: ["lyon-4", "lyon-5", "caluire-et-cuire", "ecully"],
  },

  // ─────────────────────────────  COMMUNES DU GRAND LYON  ─────────────────────────────
  {
    slug: "villeurbanne",
    nom: "Villeurbanne",
    nomComplet: "Villeurbanne",
    type: "commune",
    codePostal: "69100",
    secteur: "Est de Lyon, commune limitrophe (siège de l'entreprise)",
    quartiers: ["Gratte-Ciel", "Charpennes", "Cusset", "Tonkin", "Les Brosses", "Croix-Luizet", "Buers", "Saint-Jean"],
    pointsDeRepere: ["Gratte-Ciel", "Théâtre National Populaire (TNP)", "Campus de La Doua", "Le Rize", "Place Charpennes"],
    caractere: "deuxième ville de la métropole, dense, résidentielle et étudiante",
    typeBati: "immeubles Art déco des Gratte-Ciel, copropriétés variées et logements étudiants près de La Doua",
    angleSerrurier:
      "C'est notre commune d'implantation : intervention ultra-rapide sur tout Villeurbanne, du dépannage d'urgence dans les copropriétés des Gratte-Ciel et de Charpennes au changement de barillet fréquent près du campus de La Doua, en passant par le blindage de porte dans les quartiers résidentiels.",
    limitrophes: ["lyon-3", "lyon-6", "vaulx-en-velin", "bron", "caluire-et-cuire"],
    siege: true,
  },
  {
    slug: "caluire-et-cuire",
    nom: "Caluire-et-Cuire",
    nomComplet: "Caluire-et-Cuire",
    type: "commune",
    codePostal: "69300",
    secteur: "Nord de Lyon, entre Rhône et Saône",
    quartiers: ["Caluire centre", "Cuire", "Montessuy", "Bissardon", "Saint-Clair", "Vassieux"],
    pointsDeRepere: ["bords de Saône et du Rhône", "Île Barbe (proximité)", "quartier de Saint-Clair"],
    caractere: "commune résidentielle aisée, pavillonnaire et calme",
    typeBati: "maisons individuelles et petites copropriétés résidentielles",
    angleSerrurier:
      "Habitat majoritairement pavillonnaire : forte demande de portes blindées, de serrures haute sécurité et de sécurisation de maisons individuelles, ainsi que de portails et portes de garage motorisés.",
    limitrophes: ["lyon-4", "lyon-6", "lyon-9", "villeurbanne"],
  },
  {
    slug: "bron",
    nom: "Bron",
    nomComplet: "Bron",
    type: "commune",
    codePostal: "69500",
    secteur: "Est de Lyon",
    quartiers: ["Bron centre", "Terraillon", "Parilly", "UMV"],
    pointsDeRepere: ["Aéroport de Bron", "Parc de Parilly", "hôpitaux Est (Pinel, neurologique)"],
    caractere: "commune de l'est mêlant résidentiel et zones d'activité",
    typeBati: "mix de copropriétés, de pavillons et de locaux d'activité",
    angleSerrurier:
      "Habitat varié et présence de zones d'activité : dépannages résidentiels courants et sécurisation de locaux professionnels et commerciaux (rideaux métalliques, serrures renforcées).",
    limitrophes: ["lyon-3", "lyon-8", "villeurbanne", "venissieux", "saint-priest"],
  },
  {
    slug: "venissieux",
    nom: "Vénissieux",
    nomComplet: "Vénissieux",
    type: "commune",
    codePostal: "69200",
    secteur: "Sud-est de Lyon",
    quartiers: ["Vénissieux centre", "Les Minguettes", "Parilly", "Moulin à Vent"],
    pointsDeRepere: ["Marché de Vénissieux", "Parc de Parilly", "zones industrielles sud-est"],
    caractere: "commune populaire et dense, résidentielle et industrielle",
    typeBati: "grands ensembles, copropriétés et importantes zones d'activité",
    angleSerrurier:
      "Dépannages d'urgence fréquents dans l'habitat collectif dense, et forte demande de sécurisation (rideaux métalliques, portes blindées, serrures anti-effraction) pour les commerces et locaux professionnels des zones d'activité.",
    limitrophes: ["lyon-8", "bron", "saint-priest"],
  },
  {
    slug: "vaulx-en-velin",
    nom: "Vaulx-en-Velin",
    nomComplet: "Vaulx-en-Velin",
    type: "commune",
    codePostal: "69120",
    secteur: "Est de Lyon, le long du canal de Jonage",
    quartiers: ["Le Village", "Mas du Taureau", "La Grappinière", "Carré de Soie"],
    pointsDeRepere: ["Planétarium de Vaulx-en-Velin", "pôle du Carré de Soie", "canal de Jonage"],
    caractere: "commune en rénovation urbaine, entre logements collectifs et secteurs pavillonnaires",
    typeBati: "grands ensembles rénovés, pavillons au Village et résidences neuves au Carré de Soie",
    angleSerrurier:
      "Interventions d'urgence dans l'habitat collectif et sécurisation des résidences neuves du Carré de Soie (contrôles d'accès, serrures multipoints), avec du blindage pour les pavillons du Village.",
    limitrophes: ["villeurbanne", "decines-charpieu", "bron"],
  },
  {
    slug: "saint-priest",
    nom: "Saint-Priest",
    nomComplet: "Saint-Priest",
    type: "commune",
    codePostal: "69800",
    secteur: "Sud-est de la métropole",
    quartiers: ["Saint-Priest centre", "Bel Air", "Manissieux", "Revaison"],
    pointsDeRepere: ["Château de Saint-Priest", "Parc technologique de Lyon", "zones industrielles est"],
    caractere: "commune pavillonnaire dotée d'importantes zones d'activité",
    typeBati: "maisons individuelles, lotissements récents et parcs d'activité",
    angleSerrurier:
      "Prédominance de maisons individuelles et de lotissements : blindage, portails et portes de garage motorisés, serrures haute sécurité, complétés par la sécurisation des entreprises du parc technologique.",
    limitrophes: ["bron", "venissieux", "meyzieu"],
  },
  {
    slug: "ecully",
    nom: "Écully",
    nomComplet: "Écully",
    type: "commune",
    codePostal: "69130",
    secteur: "Ouest de Lyon",
    quartiers: ["Écully centre", "Le Pérollier", "Charrière Blanche"],
    pointsDeRepere: ["emlyon business school", "École Centrale de Lyon", "quartiers résidentiels boisés"],
    caractere: "commune résidentielle cossue de l'ouest lyonnais",
    typeBati: "maisons individuelles de standing et résidences haut de gamme",
    angleSerrurier:
      "Clientèle exigeante en sécurité : portes blindées, serrures certifiées A2P, coffres et sécurisation de propriétés individuelles, avec un travail soigné attendu sur des menuiseries de qualité.",
    limitrophes: ["lyon-9", "tassin-la-demi-lune"],
  },
  {
    slug: "tassin-la-demi-lune",
    nom: "Tassin-la-Demi-Lune",
    nomComplet: "Tassin-la-Demi-Lune",
    type: "commune",
    codePostal: "69160",
    secteur: "Ouest de Lyon",
    quartiers: ["La Demi-Lune", "Le Méridien", "Alaï"],
    pointsDeRepere: ["Horloge de Tassin", "vallon des Planches", "axes vers l'ouest lyonnais"],
    caractere: "commune résidentielle familiale de l'ouest",
    typeBati: "maisons individuelles et résidences récentes",
    angleSerrurier:
      "Habitat pavillonnaire et petites copropriétés : demande soutenue de blindage, de serrures haute sécurité et de motorisation de portails/portes de garage pour les maisons familiales.",
    limitrophes: ["lyon-5", "ecully", "sainte-foy-les-lyon"],
  },
  {
    slug: "oullins",
    nom: "Oullins",
    nomComplet: "Oullins",
    type: "commune",
    codePostal: "69600",
    secteur: "Sud de Lyon, rive droite du Rhône",
    quartiers: ["Oullins centre", "La Saulaie", "Le Golf"],
    pointsDeRepere: ["terminus de la ligne B (Oullins Gare)", "bords de Saône", "Grande Rue commerçante"],
    caractere: "commune en développement, bien desservie par le métro",
    typeBati: "mix d'immeubles anciens du centre, de copropriétés et de programmes neufs",
    angleSerrurier:
      "Centre-ville commerçant et arrivée du métro dynamisent l'habitat : dépannages d'urgence dans les copropriétés, changements de serrures dans l'ancien et équipement des résidences neuves.",
    limitrophes: ["lyon-2", "sainte-foy-les-lyon", "saint-genis-laval"],
  },
  {
    slug: "sainte-foy-les-lyon",
    nom: "Sainte-Foy-lès-Lyon",
    nomComplet: "Sainte-Foy-lès-Lyon",
    type: "commune",
    codePostal: "69110",
    secteur: "Sud-ouest, sur les coteaux",
    quartiers: ["Sainte-Foy centre", "Le Plan du Loup", "La Gravière", "Beaunant"],
    pointsDeRepere: ["coteaux avec vue sur Lyon", "centre-bourg résidentiel", "proximité du Vieux Lyon"],
    caractere: "commune résidentielle aisée perchée sur les collines",
    typeBati: "maisons individuelles et résidences de standing",
    angleSerrurier:
      "Habitat pavillonnaire cossu sur les hauteurs : forte demande de portes blindées, serrures haute sécurité, portails et sécurisation périmétrique des propriétés.",
    limitrophes: ["lyon-5", "tassin-la-demi-lune", "oullins", "saint-genis-laval"],
  },
  {
    slug: "saint-genis-laval",
    nom: "Saint-Genis-Laval",
    nomComplet: "Saint-Genis-Laval",
    type: "commune",
    codePostal: "69230",
    secteur: "Sud-ouest de la métropole",
    quartiers: ["Saint-Genis centre", "Beaunant", "Basses Barolles"],
    pointsDeRepere: ["Observatoire de Lyon", "hôpitaux sud", "centre-bourg"],
    caractere: "commune résidentielle du sud-ouest, en extension du métro",
    typeBati: "maisons individuelles, lotissements et petites résidences",
    angleSerrurier:
      "Zone majoritairement pavillonnaire : blindage, serrures haute sécurité, portails et portes de garage motorisés pour maisons familiales, avec du dépannage courant dans les résidences.",
    limitrophes: ["oullins", "sainte-foy-les-lyon"],
  },
  {
    slug: "decines-charpieu",
    nom: "Décines-Charpieu",
    nomComplet: "Décines-Charpieu",
    type: "commune",
    codePostal: "69150",
    secteur: "Est de la métropole",
    quartiers: ["Décines centre", "Le Sixième", "Grand Large"],
    pointsDeRepere: ["Groupama Stadium (Parc OL)", "plan d'eau du Grand Large", "canal de Jonage"],
    caractere: "commune en forte croissance, pavillonnaire et sportive",
    typeBati: "maisons individuelles, lotissements récents et nouvelles résidences",
    angleSerrurier:
      "Croissance résidentielle rapide : équipement de maisons et résidences neuves (serrures multipoints, portails, portes de garage) et blindage des pavillons, avec du dépannage d'urgence dans les lotissements.",
    limitrophes: ["vaulx-en-velin", "meyzieu"],
  },
  {
    slug: "meyzieu",
    nom: "Meyzieu",
    nomComplet: "Meyzieu",
    type: "commune",
    codePostal: "69330",
    secteur: "Est de la métropole, près du Grand Parc",
    quartiers: ["Meyzieu centre", "Le Carreau", "zone industrielle"],
    pointsDeRepere: ["Grand Large", "proximité du Parc de Miribel-Jonage", "tramway T3 / Rhônexpress"],
    caractere: "commune pavillonnaire en expansion à l'est de l'agglomération",
    typeBati: "maisons individuelles, lotissements et zone industrielle",
    angleSerrurier:
      "Tissu pavillonnaire et zone industrielle : blindage et serrures haute sécurité pour les maisons, sécurisation des entreprises et locaux (rideaux métalliques, serrures renforcées) sur la ZI.",
    limitrophes: ["decines-charpieu", "saint-priest"],
  },
];

// ─────────────────────────────  HELPERS  ─────────────────────────────

/** Préfixe d'URL commun aux pages de zone. */
export const ZONE_URL_PREFIX = "/zones/serrurier-";

/** URL complète d'une zone (ex: /zones/serrurier-lyon-3). */
export const zoneHref = (z: Pick<Zone, "slug">) => `${ZONE_URL_PREFIX}${z.slug}`;

/** Tous les slugs — pratique pour generateStaticParams(). */
export const allZoneSlugs = zones.map((z) => z.slug);

/** Récupère une zone par son slug. */
export const getZoneBySlug = (slug: string): Zone | undefined =>
  zones.find((z) => z.slug === slug);

/** Zones filtrées par type. */
export const arrondissements = zones.filter((z) => z.type === "arrondissement");
export const communes = zones.filter((z) => z.type === "commune");

/** Zones limitrophes hydratées (pour le maillage interne d'une page). */
export const getLimitrophes = (slug: string): Zone[] => {
  const zone = getZoneBySlug(slug);
  if (!zone) return [];
  return zone.limitrophes
    .map(getZoneBySlug)
    .filter((z): z is Zone => Boolean(z));
};
