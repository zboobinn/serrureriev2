@AGENTS.md

# Projet — Refonte SEO Serrurerie Roland (site vitrine Next.js)

Contexte complet dans les docs : README.md (structure), SEO-GUIDE.md (SEO/
JSON-LD), CONTENT-STRATEGY.md (mots-clés), DEPLOYMENT.md (mise en ligne).
Lis-les au besoin plutôt que de tout charger.

NAP source unique : src/data/site.ts — Serrurerie Roland, 06 68 67 65 65,
siège 62 rue Racine 69100 Villeurbanne, depuis 1998, 24/7.

## Pièges à NE PAS défaire
- Avis (data/reviews.ts) : affichés mais VOLONTAIREMENT non balisés en
  JSON-LD. Ne pas réactiver AggregateRating/Review. (PROMPT-DEMARRAGE.md dit
  l'inverse : périmé sur ce point.)
- @id LocalBusiness stable = <url>/#locksmith partout ; adresse = toujours le
  siège ; seul areaServed varie par zone.
- Slugs zones "propres" (ex. lyon-3) + ZONE_URL_PREFIX ; ne pas modifier.
- Blog noindex + hors sitemap tant qu'il est vide.

## État / reste à faire
Build vert, 42 routes, sitemap 35/35. À faire : déploiement Vercel/GitLab,
config Resend (DNS), redirection www→non-www, redirections 301 des anciennes
URL WordPress, remplir geo (site.ts), placeholders mentions légales.