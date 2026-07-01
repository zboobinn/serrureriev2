# Stratégie de contenu SEO

## Mots-clés cibles

### Génériques (accueil, pages hub)

- serrurier Lyon
- serrurier Lyon pas cher / serrurier Lyon urgence
- dépannage serrurier Lyon 24h/24
- serrurier Grand Lyon
- ouverture de porte Lyon

### Par zone (déclinaison des 22 pages `/zones/serrurier-{slug}`)

Pattern à décliner pour chaque zone (`nom`, `nomComplet`, `codePostal` dans
`@/data/zones.ts`) :

- `serrurier {nom}` (ex. "serrurier Lyon 3", "serrurier Villeurbanne")
- `serrurier {codePostal}` (ex. "serrurier 69003")
- `dépannage serrurier {nom}`
- `urgence serrurier {nom}`
- `ouverture porte {nom}`
- `porte blindée {nom}` (zones à dominante pavillonnaire/résidentielle
  cossue : Caluire-et-Cuire, Écully, Sainte-Foy-lès-Lyon, Tassin-la-Demi-Lune,
  Saint-Genis-Laval)
- `changement serrure {nom}` (zones étudiantes/forte rotation locative :
  Lyon 7, Villeurbanne)

Le champ `angleSerrurier` de chaque zone indique déjà l'intention de
recherche dominante du secteur (bâti ancien → remplacement de serrures
vétustes ; zones pavillonnaires → blindage/portails ; zones étudiantes →
changement de barillet). S'en servir pour prioriser le mot-clé secondaire
mis en avant dans chaque page zone.

### Par service (déclinaison des 6 pages `/services/{slug}`)

Pattern à décliner pour chaque service (`nom` dans `@/data/services.ts`) :

- `{service} Lyon` (ex. "porte blindée Lyon", "rideau métallique Lyon")
- `prix {service} Lyon`
- `{service} urgence` (pour depannage-urgent en particulier)
- `installation {service} Lyon`
- `{service} certifié A2P` (portes-blindees, serrures-haute-securite)

Croisement service × zone (déjà en place via le maillage interne
`ServiceTemplate` → zones, et pages zone → services) : ne pas créer 132
pages combinatoires (6 services × 22 zones), le maillage interne suffit à
capter l'intention croisée sans dupliquer le contenu.

## Idées d'articles de blog locaux

À activer une fois le pipeline MDX en place (voir SEO-GUIDE.md, section
"Remettre le blog en index"). Idées ancrées sur les données réelles déjà
présentes dans `zones.ts`/`services.ts`, pas sur des statistiques inventées :

1. **"Porte claquée à Lyon : que faire avant d'appeler un serrurier ?"**
   — informationnel, capte "porte claquée lyon".
2. **"Porte blindée ou serrure haute sécurité : laquelle choisir ?"**
   — comparatif entre deux pages service existantes, maillage naturel.
3. **"Sécuriser un appartement dans le Vieux Lyon : les contraintes du bâti
   ancien"** — appuyé sur `typeBati`/`angleSerrurier` de la zone lyon-5.
4. **"Serrurier en copropriété à Villeurbanne : qui paie quoi ?"** —
   angle pratique/juridique, zone siège.
5. **"Combien coûte un changement de serrure à Lyon ?"** — informationnel
   prix, sans chiffre inventé (renvoie vers devis gratuit).
6. **"Portail et porte de garage motorisés : ce qu'il faut savoir avant
   d'installer"** — appuyé sur la page service portes-de-garage.
7. **"Sécuriser un commerce à Lyon : rideau métallique ou vitrine
   renforcée ?"** — cible les zones à commerces (Lyon 2, Lyon 4, Oullins).

Règle : chaque article doit répondre à une intention de recherche réelle et
lier vers au moins une page service et une page zone pertinentes (maillage
interne), sans jamais dupliquer le contenu déjà présent sur ces pages.

## Règles anti-duplication

1. **Chaque page a un `title`/`description`/`canonical` unique.** Vérifié
   par construction pour les zones et services (générés depuis les données),
   à respecter manuellement pour toute page ajoutée à la main.
2. **Le contenu substantiel des pages zone vient des données réelles**
   (`angleSerrurier`, `quartiers`, `pointsDeRepere`, `typeBati`), pas d'un
   gabarit avec le nom de la ville changé. Voir `texteUnique` (SEO-GUIDE.md)
   pour aller plus loin sur les zones prioritaires.
3. **Les 6 pages service ont un contenu rédigé indépendamment** (`intro`,
   `prestations`, `pourQui` distincts) — ne jamais copier-coller un bloc
   d'un service à l'autre en ne changeant que le nom.
4. **Un seul `@id` par entité** (`LocalBusiness`) répété à l'identique sur
   toutes les pages où il apparaît — jamais une variante par page.
5. **Pas de pages combinatoires service × zone** générées automatiquement :
   le maillage interne (liens croisés) capte l'intention sans dupliquer le
   contenu rédactionnel.
6. **Blog en noindex tant qu'il est vide** — un article seul, publié tôt,
   ne doit pas non plus repasser prématurément en index (voir SEO-GUIDE.md).
