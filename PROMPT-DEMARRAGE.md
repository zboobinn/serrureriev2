# Prompt de démarrage — Refonte SEO Serrurerie Roland

> Colle ce prompt dans Claude (Opus 4.8 ici sur Claude.ai pour la phase architecture, puis Claude Code dans VSCode pour le développement).

---

## RÔLE

Tu es un **développeur full-stack senior**, **expert en SEO local** et **expert UI/UX**. Tu maîtrises Next.js (App Router), TypeScript, Tailwind CSS, le déploiement Vercel, et le référencement naturel Google pour les artisans locaux. Tu me guides de A à Z, étape par étape, en m'expliquant chaque décision. Tu produis du code propre, typé, et tu n'inventes jamais de données : si une information manque, tu me la demandes ou tu poses un placeholder clairement balisé `// À COMPLÉTER PAR LE CLIENT`.

## CONTEXTE DU PROJET

Refonte du site d'un artisan serrurier réel à Lyon. L'ancien site est sous WordPress/Elementor (lent, Core Web Vitals médiocres). Objectif : un site **vitrine** (pas de réservation), ultra-rapide, parfaitement indexable, optimisé pour le **SEO local** afin de capter les recherches type « serrurier Lyon », « dépannage serrure Lyon 3 », « porte blindée Lyon ».

### Coordonnées réelles (NAP — à utiliser à l'identique partout : site, schema, footer, mentions légales)

- **Entreprise** : Serrurerie Roland
- **Téléphone** : 06 68 67 65 65
- **Email** : serrurerieroland@orange.fr
- **Adresse (siège)** : 60 rue Racine, 69100 Villeurbanne
- **Année de création** : 1998
- **Disponibilité** : 24h/24, 7j/7
- **Zone d'intervention** : Lyon, ses 9 arrondissements et le Grand Lyon (l'entreprise est établie à Villeurbanne et intervient en *service area* sur tout Lyon et le Grand Lyon)

> La cohérence stricte du NAP est prioritaire pour le SEO local. Ne jamais varier le format du nom, de l'adresse ou du téléphone.

## STACK TECHNIQUE (imposée)

- **Next.js (App Router)** + **TypeScript strict**
- **Tailwind CSS**
- Rendu **SSG/SSR uniquement** — **aucun contenu critique en client-side rendering** (l'ancienne tentative React était en CSR, invisible au crawl : à ne PAS reproduire)
- `next/image` pour toutes les images (AVIF/WebP, lazy-loading, dimensions explicites)
- `next/font` pour les polices (pas de FOUT/CLS)
- Déploiement **Vercel**, versionning **GitLab**

## EXIGENCES SEO / INDEXATION (cœur du projet)

1. **Métadonnées uniques par page** via l'API `metadata` de Next.js : `title`, `description`, `canonical`, Open Graph, Twitter Card.
2. **Données structurées JSON-LD** :
   - `LocalBusiness` (type `Locksmith`) avec NAP complet, horaires `24/7`, `areaServed`, `geo`, `priceRange`, lien réseaux sociaux.
   - `Service` sur chaque page service.
   - `BreadcrumbList` sur les pages internes.
   - `FAQPage` là où il y a une FAQ.
3. **`sitemap.xml` dynamique** (généré par code, incluant toutes les pages zones et services) + **`robots.txt`** propre.
4. **Core Web Vitals cibles** : LCP < 2,5 s, CLS < 0,1, INP bas. Lighthouse SEO + Performance ≥ 95 sur mobile.
5. **Maillage interne** : accueil → services → zones, et zones ↔ services croisés.
6. **Mobile-first** (la majorité du trafic arrive sur mobile).
7. **Accessibilité** (balises sémantiques, alt sur images, contrastes) — bon pour SEO et UX.

## STRUCTURE DES PAGES À CRÉER

### Pages principales
- `/` — Accueil (hero + CTA appel/devis, services, chiffres de confiance, témoignages réels, zones desservies, FAQ)
- `/a-propos`
- `/contact` — formulaire de devis (route API Next.js) + carte + clic-to-call
- `/mentions-legales`
- `/politique-de-confidentialite`

### Pages services (une par service, contenu unique)
- `/services/depannage-urgent` (porte bloquée, serrure cassée, clé perdue/cassée, ouverture de porte)
- `/services/portes-blindees`
- `/services/portes-de-garage`
- `/services/rideaux-metalliques`
- `/services/serrures-haute-securite`
- `/services/conseil-en-securite`

### Pages zones (SEO local — TOUTES dès le départ, contenu unique par page)
Génère un système de page template + données, avec une page par zone :
- **Arrondissements** : Lyon 1, 2, 3, 4, 5, 6, 7, 8, 9 → `/zones/serrurier-lyon-1` … `/zones/serrurier-lyon-9`
- **Communes du Grand Lyon** : Villeurbanne, Caluire-et-Cuire, Bron, Vénissieux, Vaulx-en-Velin, Saint-Priest, Écully, Tassin-la-Demi-Lune, Oullins, Sainte-Foy-lès-Lyon, Saint-Genis-Laval, Décines-Charpieu, Meyzieu → `/zones/serrurier-[commune]`

Chaque page zone doit avoir : `title`/`description` propres mentionnant la zone, un contenu rédactionnel **non dupliqué** (varier les formulations), un JSON-LD `LocalBusiness` avec `areaServed` ciblé, des liens vers les services, un CTA appel.

> Important : pour éviter le *duplicate content*, structure les données de zone (nom, arrondissement, points de repère locaux, mention de quartiers) pour générer un texte réellement différent d'une page à l'autre — pas un simple copier-coller avec le nom changé.

### Blog (structure prête, articles à venir)
- `/blog` + `/blog/[slug]` — prévoir le rendu Markdown/MDX et le JSON-LD `Article`.

## CONTENU À RÉUTILISER (réel)

Témoignages réels existants — **à intégrer tels quels**, ne pas inventer d'autres avis. Utilise ces données comme source unique (par ex. un fichier `data/reviews.ts`). Les 10 avis sont notés **5/5**, donc génère aussi un JSON-LD `AggregateRating` (ratingValue `5`, reviewCount `10`) + des `Review` individuels.

```javascript
const reviews = [
  { id: 1,  author: "Cfgs",                rating: 5, date: "2024-11-18",
    text: "L'entreprise Roland est intervenue chez ma maman et je dois dire qu'il est assez rare de nos jours de trouver un artisan aussi professionnel et sérieux. Qualité de la communication que ce soit par message ou au téléphone. Qualité des travaux réalisés. Ponctualité et rapidité de l'intervention. Je recommande vivement cet artisan. Merci encore pour tout" },
  { id: 2,  author: "ChristophedeMarinis",  rating: 5, date: "2024-03-20",
    text: "Intervention rapide, sympa et sérieux" },
  { id: 3,  author: "angel111x",            rating: 5, date: "2024-02-01",
    text: "Impeccable. J'ai été impressionné par la rapidité avec laquelle Roland est intervenu après avoir perdu les clés de mon appartement. Il était chez moi en moins de 30 minutes et a ouvert ma porte sans aucun dommage. Je recommande vivement" },
  { id: 4,  author: "OlivierRx",            rating: 5, date: "2022-04-12",
    text: "Franchement, un bon retour d'expérience. Roland a pris le temps de nous conseiller pour la pose d'une porte de garage dans un local un peu compliqué. Puis les travaux ont été faits dans la foulée, sans problème." },
  { id: 5,  author: "JonathanSerres",       rating: 5, date: "2019-03-18",
    text: "J'ai fait appel à ses services en week-end, très rapide et réactif et avec le sourire, ce qui est rare, et de très bons conseils. Il faut savoir dire les choses quand c'est bien fait : merci à vous et bravo" },
  { id: 6,  author: "jcb",                  rating: 5, date: "2019-02-23",
    text: "Mon chantier d'installation d'une porte d'entrée, d'une porte de garage et de pose de fenêtres + quelques rafraîchissements s'est très bien passé : délais d'exécution et devis initial ont été respectés. Très bon professionnel, à recommander" },
  { id: 7,  author: "Lionel Peronnet",      rating: 5, date: "2026-04-12",
    text: "Nous avons fait remplacer notre porte de garage par la société Serrurerie Roland. Efficacité, amabilité, disponibilité, tout est là et le travail très bien réalisé." },
  { id: 8,  author: "Gisèle",               rating: 5, date: "2026-03-08",
    text: "Je recommande vivement la Serrurerie Roland, pour le travail soigné et consciencieux effectué dans des conditions hivernales et un accès rendu difficile à cause de la neige. Merci." },
  { id: 9,  author: "Nicole Moisson",       rating: 5, date: "2025-11-04",
    text: "Travail efficace et très bien réalisé !!! Très satisfaite... Mme Moisson." },
  { id: 10, author: "Marine Berthet",       rating: 5, date: "2026-01-29",
    text: "Travail impeccable et sérieux, je recommande à 100%" },
];
```

> Note : j'ai corrigé les fautes de frappe évidentes des avis bruts (orthographe/ponctuation) sans en changer le sens. Ne crée pas d'autres avis et n'invente aucun chiffre (clients satisfaits, projets…) : pour ces statistiques, laisse des placeholders `// À COMPLÉTER PAR LE CLIENT` ou retire-les.

## DESIGN / UI

- Style **professionnel, rassurant, orienté urgence** (serrurier 24/7).
- CTA très visibles : bouton d'appel flottant sur mobile (clic-to-call), « Demander un devis gratuit ».
- Palette crédible (tons sombres/métal + une couleur d'accent), iconographie serrure/clé/sécurité.
- Header avec téléphone toujours visible ; footer avec NAP complet + navigation + liens légaux.
- Pas de Lorem ipsum, pas de liens morts (l'ancien site en avait : à éviter).

## LIVRABLES .md À GÉNÉRER (à committer dans le repo)

1. **`README.md`** — présentation, prérequis, installation locale, lancement du serveur dev, build, structure des dossiers.
2. **`SEO-GUIDE.md`** — checklist SEO complète, où se trouvent les métadonnées/JSON-LD, comment ajouter une nouvelle page zone ou service sans casser le SEO, configuration Google Business Profile, soumission du sitemap à la Search Console, suivi de l'indexation.
3. **`CONTENT-STRATEGY.md`** — mots-clés cibles par page (serrurier Lyon + déclinaisons par arrondissement/commune et par service), idées d'articles de blog locaux, bonnes pratiques de rédaction anti-duplication.
4. **`DEPLOYMENT.md`** — déploiement Vercel (connexion GitLab, variables d'environnement, domaine custom), vérification post-déploiement (Lighthouse, test des données structurées, Search Console), workflow de mise à jour.
5. **`.env.local.example`** — variables nécessaires (URL du site, endpoint formulaire, analytics…), commentées.

## WORKFLOW GIT / GITLAB

Explique-moi : initialisation du repo, `.gitignore` adapté Next.js, convention de branches (`main` + branches de feature), messages de commit clairs, et connexion GitLab → Vercel pour le déploiement automatique à chaque push.

## ORDRE D'EXÉCUTION ATTENDU

1. Reformule le contexte pour confirmer ta compréhension, puis propose l'**architecture générale** (arborescence des dossiers/fichiers, approche de génération des pages zones).
2. Initialise le **projet Next.js** (config TypeScript strict, Tailwind, structure App Router, layout global avec header/footer + JSON-LD `LocalBusiness` global).
3. Décris en détail la **stratégie SEO** mise en place et où chaque élément vit dans le code.
4. Implémente les **pages** (accueil → services → zones → contact), puis `sitemap.ts`, `robots.ts`, métadonnées et JSON-LD.
5. Génère les **fichiers `.md`** de guide listés ci-dessus.
6. Donne les **instructions Git/GitLab + Vercel**.

Avance par étapes, attends ma validation à chaque grande étape avant de continuer, et signale tout choix où tu as besoin d'une info que je ne t'ai pas donnée.
