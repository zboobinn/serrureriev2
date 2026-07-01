# Guide SEO

## Où vivent les métadonnées

- **Layout global** ([src/app/layout.tsx](./src/app/layout.tsx)) : `metadataBase`,
  `title.template` (`%s | Serrurerie Roland`), description par défaut, Open
  Graph, `robots: index/follow`, JSON-LD `LocalBusiness` global.
- **Chaque page statique** exporte son propre `metadata` (titre, description,
  `alternates.canonical`) — voir `/services/page.tsx`, `/zones/page.tsx`,
  `/contact/page.tsx`, etc.
- **Pages service** ([src/app/services/{slug}/page.tsx](./src/app/services)) :
  `metadata` généré par `buildServiceMetadata()` ([src/lib/seo.ts](./src/lib/seo.ts))
  à partir de `@/data/services.ts`.
- **Pages zone** ([src/app/zones/[zoneSlug]/page.tsx](./src/app/zones/%5BzoneSlug%5D/page.tsx)) :
  `generateMetadata()` (async, `params` est une Promise en Next 16) construit
  titre/description/canonical à partir de la `Zone` résolue.

## Où vit le JSON-LD

Tout le balisage structuré est centralisé dans
[src/lib/json-ld.ts](./src/lib/json-ld.ts), rendu via le composant
[`<JsonLd>`](./src/components/seo/JsonLd.tsx) (Server Component — toujours
dans le HTML initial, jamais injecté côté client) :

| Schéma | Fonction | Où il est utilisé |
| --- | --- | --- |
| `LocalBusiness`/`Locksmith` | `localBusinessSchema()` | Layout global (toutes pages), pages zone (avec `areaServed` ciblé) |
| `Service` | `serviceSchema()` | Chaque page service, `provider.@id` référence le même `LocalBusiness` |
| `BreadcrumbList` | `breadcrumbSchema()` | Toutes les pages internes (fil d'Ariane) |
| `FAQPage` | `faqSchema()` | Accueil uniquement, et uniquement avec les questions réellement affichées |

**Règle stricte** : un schema ne doit jamais décrire un contenu absent de la
page. `FAQPage` n'est généré qu'à partir des questions effectivement rendues
à l'écran (`@/data/faq.ts`, source unique pour l'affichage ET le schema).

**Avis clients** : les 10 avis (`@/data/reviews.ts`) sont affichés
visuellement sur l'accueil, **mais volontairement sans balisage
`AggregateRating`/`Review`**. Ce sont des avis Google recopiés manuellement,
pas des avis first-party collectés sur ce site — Google déconseille de
baliser ce type d'avis "self-serving". Le code pour réactiver ce balisage
(si un système d'avis first-party est mis en place un jour) est laissé en
commentaire dans `json-ld.ts`, juste après `localBusinessSchema()`.

**`@id` stable** : le `LocalBusiness` utilise toujours `@id` et `url` fixes
(ancrés sur l'accueil), même quand le schéma est répété sur une page zone.
Ne jamais faire varier `url` avec la page courante.

## Ajouter une nouvelle zone sans casser le SEO

1. Ajouter l'entrée dans `zones` (`@/data/zones.ts`) avec un `slug` propre
   (ex. `"nouvelle-commune"`, sans le préfixe `serrurier-`).
2. Renseigner tous les champs obligatoires, en particulier `angleSerrurier`
   (le champ le plus différenciateur pour éviter le duplicate content) et
   `limitrophes` (maillage interne).
3. Rien d'autre à faire : `generateStaticParams()` de
   `app/zones/[zoneSlug]/page.tsx` lit `allZoneSlugs`, et `sitemap.ts` lit la
   même source — la nouvelle page zone est automatiquement générée et
   référencée au prochain build.
4. Vérifier avec `npm run build` que la page apparaît bien dans la liste des
   routes générées et dans `sitemap.xml`.

### Le champ `texteUnique` — enrichir les zones prioritaires

`Zone.texteUnique?: string[]` permet d'ajouter, à la main, un contenu
rédactionnel enrichi pour une zone précise (un élément du tableau = un
paragraphe). Quand il est renseigné, la page zone l'affiche en priorité,
juste après l'intro générée automatiquement. Quand il est absent, la page
reste complète (contenu généré depuis `angleSerrurier`/`quartiers`/
`typeBati`) — aucune page ne reste vide.

**Priorité recommandée** pour remplir ce champ : les 9 arrondissements de
Lyon + Villeurbanne (siège), qui concentrent le plus de volume de recherche.
Les autres communes du Grand Lyon peuvent être enrichies dans un second
temps.

## Ajouter un nouveau service sans casser le SEO

1. Ajouter l'entrée dans `services` (`@/data/services.ts`) avec un `slug`
   propre. Rédiger `intro`, `prestations`, `pourQui` à la main (pas de
   contenu générique dupliqué entre services).
2. Créer le fichier dédié `app/services/{slug}/page.tsx` (copier un fichier
   service existant, ex. `depannage-urgent/page.tsx`, et changer uniquement
   le slug passé à `requireServiceBySlug()`).
3. `sitemap.ts` lit `services` depuis `@/data/services.ts` : la nouvelle page
   est automatiquement référencée au prochain build, sans y toucher.
4. Vérifier avec `npm run build`.

## Remettre le blog en index

Le blog (`/blog` + `/blog/[slug]`) est actuellement en
`robots: { index: false, follow: true }` car aucun article n'existe (thin
content). Pour le repasser en index une fois du contenu réel publié :

1. Mettre en place le pipeline de rendu du contenu (Markdown/MDX) dans
   `app/blog/[slug]/page.tsx`, avec `generateStaticParams()` retournant les
   vrais slugs d'articles et un JSON-LD `Article` par page.
2. Retirer `robots: { index: false }` de `app/blog/page.tsx` **et**
   `app/blog/[slug]/page.tsx` une fois qu'au moins quelques articles de
   qualité sont publiés (éviter de repasser en index avec 1 seul article
   maigre).
3. Ajouter les URL du blog dans `app/sitemap.ts` (actuellement absentes,
   volontairement — voir le commentaire en tête de ce fichier).
4. Soumettre l'URL `/blog` à réindexation dans Google Search Console.

## Invariant à ne jamais casser

**Sitemap ↔ robots des pages** : toute URL présente dans `sitemap.ts` doit
correspondre à une page indexable (`robots: index: true` ou absence de
directive noindex). Toute page en `noindex` doit être absente du sitemap.
Vérifié par build réel à chaque étape de ce projet — à revérifier après
toute modification touchant les métadonnées `robots` ou le sitemap.
