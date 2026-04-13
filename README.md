# OXV Demo — projet prêt pour GitHub et Vercel

Ce dossier contient une version partageable du prototype OXV V8.

## Contenu

- React + TypeScript + Vite
- Tailwind CSS via plugin Vite
- composants UI locaux pour remplacer les dépendances canvas
- configuration prête pour Vercel

## Installation locale

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Arborescence utile

```text
oxv-demo/
  src/
    components/ui/
    lib/
    App.tsx
    main.tsx
    index.css
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  vercel.json
  .gitignore
```

## Import dans GitHub — méthode recommandée

### Option A — GitHub en interface web

1. Créez un nouveau dépôt vide sur GitHub.
2. N’ajoutez rien au dépôt si vous préférez un envoi en Git plus tard.
3. Décompressez ce dossier sur votre ordinateur.
4. Ouvrez le dépôt GitHub.
5. Cliquez sur **Add file** puis **Upload files**.
6. Glissez tous les fichiers et dossiers du projet.
7. Validez avec **Commit changes**.

### Option B — Git en ligne de commande

Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-UTILISATEUR/oxv-demo.git
git push -u origin main
```

## Déploiement sur Vercel

1. Connectez votre compte GitHub à Vercel.
2. Cliquez sur **Add New Project**.
3. Importez le dépôt `oxv-demo`.
4. Laissez Vercel détecter Vite.
5. Cliquez sur **Deploy**.

## Notes

- Le composant `Database` a déjà été corrigé.
- Les imports `@/components/ui/...` ont été remplacés par des composants locaux.
- Le fichier `vercel.json` est déjà inclus.

## Personnalisation rapide

- modifier les textes dans `src/App.tsx`
- remplacer les visuels et URLs externes si nécessaire
- brancher ensuite un vrai backend si vous souhaitez aller au-delà de la démo
