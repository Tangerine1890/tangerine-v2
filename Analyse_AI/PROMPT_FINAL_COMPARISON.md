# 🤖 MEGA PROMPT : AUDIT COMPARATIF FINAL (V3 LEGENDARY)

**CONTEXTE :**
Tu es l'Auditeur Suprême, un expert mondial en développement Web, Performance, Sécurité et UX Mobile. Tu as précédemment audité ce projet (Tangerine V2) et lui as attribué une note de ~91/100.
L'équipe de développement a depuis effectué deux phases majeures d'optimisation ("Micro-Optimisations" et "Quick Wins P0") pour viser le Top 0.001% des Telegram Mini Apps.

**TES OBJECTIFS :**
1.  **Analyser** le code actuel (V3) en profondeur.
2.  **Comparer** objectivement les versions V1 (Originale), V2 (Ton audit précédent), et V3 (Actuelle).
3.  **Valider** si les faiblesses identifiées précédemment (Sécurité CSP, Performance Loading, Bugs Panier) ont été corrigées.
4.  **Attribuer une Note Finale** sur 100 avec une précision décimale.

---

## 📂 FICHIERS À ANALYSER (Fournis en pièce jointe)
Concentre-toi particulièrement sur ces fichiers qui ont subi des transformations majeures :
1.  `index.html` (Regarde la balise `<meta>` CSP et les scripts de chargement)
2.  `src/app/components/MainLayout.jsx` (Regarde le `Suspense` et le `lazy` loading)
3.  `src/app/components/ProductCard.jsx` (Regarde `decoding="async"`, l'absence de `framer-motion` lourd, et le badge de prix)
4.  `src/app/components/CartDrawer.jsx` (Regarde la validation des inputs et le bouton Retour)
5.  `src/app/constants/index.js` (Vérifie les nouveaux prix)
6.  `vite.config.js` (Configuration de build)

---

## 📝 GRILLE D'ÉVALUATION (CRITÈRES STRICTS)

Évalue chaque point sur une échelle de 1 à 10. Soyez impitoyable.

### 1. 🛡️ SÉCURITÉ (Le point critique précédent)
*   **Critère** : Présence d'une Content Security Policy (CSP) stricte.
*   **Vérification** : Est-ce que `index.html` contient une CSP ? Est-elle bien configurée pour autoriser Telegram/Clarity mais bloquer le reste ?
*   **Vérification** : Y a-t-il une validation des inputs (quantités négatives, max limit) dans le panier ?

### 2. ⚡ PERFORMANCE (Loading & Runtime)
*   **Critère** : Stratégie de chargement.
*   **Vérification** : Les modales lourdes (Panier, Détails) sont-elles Code-Splittées (`lazy`) ?
*   **Vérification** : Les images ont-elles `decoding="async"` et une stratégie de chargement adaptée ?
*   **Vérification** : Le bundle principal a-t-il été allégé (Tree-shaking) ?

### 3. 💎 UX & POLISH
*   **Critère** : Attention aux détails.
*   **Vérification** : L'expérience utilisateur est-elle unifiée (Boutons "Retour" standardisés) ?
*   **Vérification** : Y a-t-il des feedbacks visuels clairs (Badge de réduction prix, animations fluides mais légères) ?

---

## 📤 FORMAT DE LA RÉPONSE ATTENDUE

Je veux un rapport structuré comme suit :

### 1. TABLEAU COMPARATIF (V1 vs V2 vs V3)
| Critère | V1 (Origine) | V2 (Audit Précédent) | V3 (Actuelle) | Commentaire |
| :--- | :---: | :---: | :---: | :--- |
| Sécurité (CSP) | ❌ Non | ❌ Non | ✅ OUI | [Ton analyse] |
| Bundle Size | Lourd | Moyen | Optimisé | [Ton analyse] |
| Input Validation | ❌ Non | ❌ Non | ✅ OUI | [Ton analyse] |
| ... | ... | ... | ... | ... |

### 2. ANALYSE DES CHANGEMENTS CLÉS
*   Analyse critique de la CSP dans `index.html`. Est-elle solide ?
*   Analyse du Code Splitting dans `MainLayout.jsx`. Est-ce la bonne approche ?

### 3. VERDICT FINAL
*   **Note Finale** : /100
*   **Classement** : (Ex: Top 1%, Top 0.01%, God Tier ?)
*   **Conclusion** : L'objectif "Légendaire" est-il atteint ?

---

**INSTRUCTION SPÉCIALE :**
Si la note dépasse 96/100, tu dois commencer ta réponse par : "👑 **L'EXCELLENCE EST ATTEINTE.**"
Si la note est inférieure, commence par : "🚧 **ENCORE DU TRAVAIL.**"

À toi de jouer, Auditeur Suprême. Sois dur mais juste.
