# Serrurerie Roland — site vitrine

Site vitrine de Serrurerie Roland (artisan serrurier, Villeurbanne / Lyon /
Grand Lyon), refondu pour la performance et le SEO local. Next.js App
Router, TypeScript strict, Tailwind CSS, rendu SSG/SSR (aucun contenu
critique en client-side rendering).

## Prérequis

- Node.js 20 LTS ou supérieur
- npm (le repo utilise `package-lock.json`)

## Installation locale

```bash
npm install
cp .env.local.example .env.local
```

Compléter `.env.local` selon les besoins (voir les commentaires du fichier).
Sans `RESEND_API_KEY`/`CONTACT_FROM_EMAIL`, le formulaire de contact reste
fonctionnel à l'écran mais refuse l'envoi (503 explicite) — voir
[DEPLOYMENT.md](./DEPLOYMENT.md).

## Scripts

| Commande        | Effet                                              |
| ---------------- | --------------------------------------------------- |
| `npm run dev`     | Serveur de développement (Turbopack)                |
| `npm run build`   | Build de production (génère les pages SSG + sitemap) |
| `npm run start`   | Sert le build de production                          |
| `npm run lint`    | ESLint (config Next, `--max-warnings=0` recommandé)   |

Vérification manuelle avant tout commit :

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Structure des dossiers

```
src/
├─ app/
│  ├─ layout.tsx              # Layout global : metadata, JSON-LD LocalBusiness, Header/Footer
│  ├─ page.tsx                 # Accueil
│  ├─ sitemap.ts               # sitemap.xml dynamique
│  ├─ robots.ts                 # robots.txt
│  ├─ a-propos/ contact/ mentions-legales/ politique-de-confidentialite/
│  ├─ services/
│  │  ├─ page.tsx               # Hub services
│  │  └─ {slug}/page.tsx        # 6 pages service dédiées
│  ├─ zones/
│  │  ├─ page.tsx               # Hub zones
│  │  └─ [zoneSlug]/page.tsx    # Template SSG des 22 zones (voir SEO-GUIDE.md)
│  ├─ blog/                    # Structure prête, noindex tant que 0 article
│  └─ api/contact/route.ts      # Envoi du formulaire de devis (Resend)
│
├─ components/
│  ├─ layout/                  # Header, Footer, MobileCallBar
│  ├─ ui/                      # Breadcrumb...
│  ├─ sections/                 # ServiceTemplate, ContactForm...
│  └─ seo/JsonLd.tsx            # Rendu des schémas JSON-LD (Server Component)
│
├─ data/                       # Sources uniques de données (voir CONTENT-STRATEGY.md)
│  ├─ site.ts                   # NAP centralisé — source unique de vérité
│  ├─ zones.ts                  # 9 arrondissements + 13 communes
│  ├─ services.ts               # 6 services
│  ├─ reviews.ts                # 10 avis clients réels (figés, ne pas modifier)
│  └─ faq.ts                    # FAQ de l'accueil
│
└─ lib/
   ├─ json-ld.ts                # Générateurs de schémas schema.org
   ├─ seo.ts                    # Helpers metadata
   └─ zone-routing.ts           # Pont slug ↔ segment de route pour /zones/serrurier-{slug}
```

## Documentation complémentaire

- [SEO-GUIDE.md](./SEO-GUIDE.md) — où vivent les métadonnées/JSON-LD, comment
  ajouter une zone ou un service sans casser le SEO.
- [CONTENT-STRATEGY.md](./CONTENT-STRATEGY.md) — mots-clés cibles, idées
  d'articles de blog, règles anti-duplication.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — déploiement Vercel/GitLab, DNS, checklist
  post-déploiement.
