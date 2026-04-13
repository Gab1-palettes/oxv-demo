# Guide complet d'import GitHub + mise en ligne Vercel

## 1) Préparer le dossier

- Décompressez le projet.
- Vérifiez que vous voyez bien `package.json` à la racine.

## 2) Envoyer dans GitHub

### Méthode simple sans terminal

- Connectez-vous à GitHub.
- Créez un nouveau dépôt.
- Donnez un nom, par exemple `oxv-demo`.
- Pour une publication avec Git ensuite, laissez le dépôt vide.
- Ouvrez le dépôt.
- Cliquez sur **Add file** > **Upload files**.
- Glissez tout le contenu du dossier.
- Cliquez sur **Commit changes**.

### Méthode terminal

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-UTILISATEUR/oxv-demo.git
git push -u origin main
```

## 3) Mettre en ligne sur Vercel

- Allez sur Vercel.
- Cliquez sur **Add New Project**.
- Sélectionnez le dépôt GitHub.
- Validez l'import.
- Déployez.

## 4) Commandes locales utiles

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 5) Si le site ne démarre pas

### Supprimez puis réinstallez les dépendances

```bash
rm -rf node_modules package-lock.json
npm install
```

### Vérifiez votre version de Node.js

Une version LTS récente est recommandée.

## 6) Ce qui est déjà fait dans ce projet

- structure Vite prête
- TypeScript prêt
- Tailwind prêt
- framer-motion prêt
- lucide-react prêt
- configuration Vercel prête
