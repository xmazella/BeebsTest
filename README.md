Technical test - Beebs - Que faire a Paris ?

## Objectif

Créer un site web en utilisant React et Next.js. L'objectif est de mettre en évidence la structure du code, la clarté, et la capacité à travailler avec des fonctionnalités de base de Next.js.

## Livrable

Envoyez le projet dans un dépôt GitHub public (ou zip). Veuillez inclure des instructions pour installer et démarrer le projet (README.md).

## Utilisation de l'API

Utilisez l'API open data "que faire à Paris" pour lister des événements à Paris : [API Que faire à Paris](https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api/?disjunctive.tags&disjunctive.address_name&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.pmr&disjunctive.blind&disjunctive.deaf&disjunctive.price_type&disjunctive.access_type&disjunctive.programs).

Pour l'affichage, vous êtes libre de faire comme vous le souhaitez. Il faut afficher au moins l'image, le titre, le lieu et la date des événements.

Ajoutez des fonctions pour rechercher et filtrer parmi les événements en s'appuyant sur les capacités de l'API. Pas besoin de faire une vue détail de l'événement.

## Getting Started

Install Project

```bash
npm install
```

Maybe force install because React-select have an issue SSR `ive downgraded to 5.1.0`

```bash
npm install --force
```

Run Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started

Issue SSR => [React-Select](https://github.com/JedWatson/react-select/issues/5459) waiting fix to update to lasted version to this library.
