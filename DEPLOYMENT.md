# Déploiement

## 1. GitLab → Vercel

1. Pousser le repo sur GitLab (`main` + branches de feature).
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, connecter le
   compte GitLab, sélectionner le repo `serrurerie-roland` (ou le nom retenu).
3. Framework détecté automatiquement : **Next.js**. Garder les réglages par
   défaut (`npm run build`, dossier racine).
4. Chaque push sur `main` déclenche un déploiement en production ; chaque
   push sur une branche de feature / merge request déclenche un déploiement
   de preview (URL unique, utile pour valider avant merge).

## 2. Variables d'environnement (Vercel → Project Settings → Environment Variables)

À renseigner pour l'environnement **Production** (et **Preview** si les
previews doivent aussi pouvoir envoyer des e-mails de test) :

| Variable | Valeur | Où l'obtenir |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://serrurerie-roland.com` | Fixe — domaine historique (voir §4) |
| `RESEND_API_KEY` | clé API Resend | Dashboard Resend → API Keys |
| `CONTACT_FROM_EMAIL` | ex. `contact@serrurerie-roland.com` | Doit appartenir au domaine vérifié dans Resend (voir §3) |
| `CONTACT_TO_EMAIL` | `serrurerieroland@orange.fr` | Boîte de réception de l'artisan |

Ne jamais commiter ces valeurs (`.env.local` est ignoré par git — voir
`.gitignore`) ; `.env.local.example` documente les variables sans valeurs
sensibles.

## 3. Configuration DNS pour vérifier le domaine Resend

Le domaine `serrurerie-roland.com` doit être **vérifié dans Resend** avant
de pouvoir envoyer des e-mails depuis `CONTACT_FROM_EMAIL` :

1. Dans le dashboard Resend → **Domains → Add Domain**, saisir
   `serrurerie-roland.com`.
2. Resend génère des enregistrements DNS spécifiques (SPF, DKIM, et
   éventuellement DMARC/MX selon la configuration) — **copier les valeurs
   exactes affichées dans le dashboard Resend au moment de l'ajout** (elles
   sont propres à chaque compte, ne pas réutiliser des valeurs génériques).
3. Ajouter ces enregistrements chez le registrar/gestionnaire DNS du
   domaine `serrurerie-roland.com`.
4. La propagation DNS peut prendre de quelques minutes à plusieurs heures
   (parfois jusqu'à 24-48h) — **lancer cette étape tôt**, avant le
   déploiement final, pas la veille de la mise en ligne.
5. Une fois les enregistrements propagés, Resend affiche le domaine comme
   "Verified" — l'envoi depuis `CONTACT_FROM_EMAIL` devient possible.

Tant que le domaine n'est pas vérifié, `/api/contact` renvoie une erreur 503
explicite côté formulaire plutôt que d'échouer silencieusement.

## 4. Domaine et redirection www → non-www

Le domaine `serrurerie-roland.com` (sans www) doit être le domaine canonique,
conformément à `SITE.url` (`@/data/site.ts`) et à `metadataBase`/`canonical`
configurés dans tout le site.

1. Sur Vercel → Project Settings → Domains, ajouter les deux entrées :
   `serrurerie-roland.com` et `www.serrurerie-roland.com`.
2. Définir `serrurerie-roland.com` (sans www) comme domaine **primaire**.
   Vercel propose alors automatiquement de configurer
   `www.serrurerie-roland.com` en redirection **301/308 permanente** vers le
   domaine primaire — accepter cette option.
3. Vérifier après propagation que `https://www.serrurerie-roland.com`
   redirige bien vers `https://serrurerie-roland.com` (et pas l'inverse).

## 5. Soumission du sitemap à Google Search Console

1. Ajouter la propriété `https://serrurerie-roland.com` dans
   [Google Search Console](https://search.google.com/search-console) (si
   elle existe déjà pour l'ancien site, la conserver — c'est elle qui porte
   l'historique d'indexation).
2. Vérifier la propriété (méthode DNS recommandée, ou balise HTML/fichier si
   plus simple à ce stade).
3. Menu **Sitemaps** → soumettre `sitemap.xml` (URL complète :
   `https://serrurerie-roland.com/sitemap.xml`).
4. Suivre l'onglet **Pages** dans les jours suivants pour l'indexation
   progressive des 35 URL (accueil, hubs, 6 services, 22 zones, pages
   légales/contact).

## 6. Checklist post-déploiement

- [ ] `npm run build` en local sans erreur avant tout push sur `main`.
- [ ] Vérifier `https://serrurerie-roland.com/robots.txt` (accessible,
      `Disallow: /api/` uniquement, `Sitemap:` correct).
- [ ] Vérifier `https://serrurerie-roland.com/sitemap.xml` (35 URL, aucune
      en 404, aucune page `/blog`).
- [ ] **Rich Results Test** (
      [search.google.com/test/rich-results](https://search.google.com/test/rich-results))
      sur : l'accueil (`LocalBusiness` + `FAQPage`), une page zone
      (`LocalBusiness` + `BreadcrumbList`), une page service (`Service` +
      `BreadcrumbList`) — vérifier l'absence d'erreur/avertissement.
- [ ] **Lighthouse mobile** (Chrome DevTools ou PageSpeed Insights) sur
      l'accueil : cibles SEO + Performance ≥ 95, LCP < 2,5s, CLS < 0,1.
- [ ] Tester le formulaire de contact avec un vrai envoi (vérifier la
      réception sur `serrurerieroland@orange.fr`, y compris dossier
      indésirables au premier essai — voir note deliverability §3).
- [ ] Tester le clic-to-call sur mobile réel (pas juste desktop).
- [ ] Vérifier la redirection `www` → non-www (§4).
- [ ] Soumettre `/sitemap.xml` dans Search Console si pas encore fait (§5).
- [ ] Compléter les placeholders restants de `mentions-legales` (SIRET,
      forme juridique, assurance, médiateur de la consommation) dès que les
      informations légales sont disponibles.
