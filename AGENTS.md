# AGENTS.md — Guide de mise à jour du CV

Instructions pour les agents LLM travaillant sur ce dépôt. L'utilisateur est francophone : communiquer et écrire le contenu du CV en français.

## Objet du dépôt

CV personnel de Florent Albany (ingénieur test & validation électronique), publié sur GitHub Pages. Site statique vanilla (HTML/CSS/JS) : **pas de build, pas de dépendance npm, pas de framework**.

- En production : https://falbany.github.io/cv-florent-albany/cv-florent.html
- Déploiement : push sur `main` → GitHub Pages sert la racine du dépôt, sans étape de build.

## Architecture : chaîne de contenu

**`cv-florent.md` est la source de vérité du contenu.** Toute modification de contenu commence par ce fichier, puis est répercutée sur les rendus :

```
cv-florent.md   (SOURCE — texte, tooltips, logos)
   ├──→  cv-florent.html                          CV officiel A4 (contenu en dur, autonome)
   └──→  content.json ──js/cv-loader.js──→  cv-florent-full.html   Version digitale
```

| Fichier | Rôle | Règle |
|---|---|---|
| `cv-florent.md` | Source de vérité du contenu | Éditer ici d'abord, toujours |
| `cv-florent.html` | CV officiel : candidatures + impression | Doit tenir sur **UNE page A4** imprimée |
| `cv-florent-full.html` | Portfolio digital, sans limite de longueur | Hydraté par `js/cv-loader.js`, mais contient aussi du texte en dur (tooltips, descriptions d'entreprises) |
| `content.json` | Données de la version digitale | Consommé via `fetch` : doit rester un JSON valide |
| `style.css` | Styles écran + impression A4 (bloc « Professional A4 Print Optimization » en fin de fichier) | Ne pas modifier le bloc `@media print` sans re-vérifier l'aperçu |
| `responsive.css` | Responsive écran uniquement | N'y rien mettre qui affecte l'impression |
| `img/` | Photo, favicon, logos d'entreprises | Ne pas renommer (`Photo Profil.jpeg` contient une espace → encoder `%20` dans les URL) |
| `GEMINI.md` | Règles historiques Dual-CV | Complément ; en cas de divergence, AGENTS.md fait foi |

## Workflow de mise à jour du contenu

1. **Éditer `cv-florent.md`** (source).
2. **Répercuter dans `cv-florent.html`** section par section (mapping ci-dessous), y compris les commentaires `<!-- data-tooltip : ... -->` (→ attribut `data-tooltip`) et `<!-- logo : ... -->` (→ `<img src>`).
3. **Répercuter dans `content.json`** les faits partagés : contact, à-propos, compétences, expériences, formation, publications.
4. **Répercuter aussi dans le HTML en dur de `cv-florent-full.html`** les tooltips et descriptions d'entreprises qui n'y sont pas pilotés par `content.json`.
5. Si le titre ou le profil change : mettre à jour `<title>`, `meta description` et `og:*` de `cv-florent.html` (et l'année du pied de page s'il y a lieu).
6. Vérifier l'aperçu A4 (voir « Vérification ») avant de déclarer le travail terminé.

### Mapping cv-florent.md → cv-florent.html

| Section du .md | Cible HTML |
|---|---|
| Titre + spécialités | `<main><header>` : `#profile-name`, `#profile-title`, `.header-specialties` |
| À propos | `main .about-text` |
| Coordonnées | `aside .contact-info` |
| Compétences | `aside .skills-list` — 6 catégories `<strong>`, sous-listes `ul` |
| Langues, Atouts | Sections `aside` correspondantes |
| Publications | `aside #publications-list` — `li > a.publication-link.tooltip` avec `data-tooltip` |
| Expériences | `main #experience-list` — un `div.job` par employeur ; plusieurs postes chez le même employeur = plusieurs couples `.job-header` + `ul` dans le même `.job` |
| Formation | `main .education-item` — une ligne par diplôme (`h4` + `.date`) |

## Contrainte A4 (bloquante)

- `cv-florent.html` doit tenir sur **une seule page A4** à l'impression.
- Réglages d'impression actuels (`style.css`) : `@page { size: A4; margin: 0 }`, corps à 8,5 pt, grille 245 px + 1fr, `.no-print` masqué, tooltips masqués à l'impression (`[data-tooltip]::after { display: none }` — ils gardent sinon leur boîte de mise en page et débordent).
- Après tout ajout de contenu : ouvrir la page, aperçu impression (Cmd+P), marges « Aucune », graphiques d'arrière-plan activés → vérifier **1 page**.
- Si ça déborde : condenser le texte ou déplacer le détail excédentaire vers `cv-florent-full.html`. Ne jamais réduire la police d'impression ni toucher au `@page` sans y être invité.

## Règles de contenu

- Langue : français (titres de publications en anglais acceptés).
- **Ne jamais inventer ni modifier un fait** (dates, chiffres, coordonnées, intitulés de poste) : reprendre exactement la source ou la demande explicite de l'utilisateur.
- Liens externes : `target="_blank" rel="noopener noreferrer"`.
- Icônes : Font Awesome 6.4 (CDN). Police : Inter (Google Fonts).
- Les tooltips (`data-tooltip`) servent à loger du détail sans alourdir la mise en page A4 papier.

## Vérification

- Aucun build. Pour tester en local (le `fetch` de `content.json` exige un serveur HTTP) :
  ```sh
  python3 -m http.server 8000
  ```
  puis ouvrir `http://localhost:8000/cv-florent.html` et `http://localhost:8000/cv-florent-full.html`.
- Vérifier la console navigateur sur la version full : un échec de `fetch` laisse la page vide sans erreur visible.
- A4 : aperçu impression → 1 page (voir ci-dessus).

## Conventions de commit

- Messages courts préfixés, cohérents avec l'historique : `feat:`, `style:`, `fix:`, `chore:`.
- Ne pas committer les fichiers locaux non suivis de spécification sans demande explicite.
