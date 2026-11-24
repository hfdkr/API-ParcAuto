# API ParcAuto

API REST développée avec Express pour gérer les véhicules d'une agence de location.

Les données sont stockées dans un tableau en mémoire (sans base de données). Elles sont réinitialisées à chaque redémarrage du serveur.

## Installation et lancement

```bash
npm install
npm start
# ou : npm run dev (redémarrage automatique)
```

Serveur : http://localhost:3000

## Structure du projet

```text
ParcAuto/
├── server.js
├── package.json
├── routes/
│   └── vehicules.js
└── middlewares/
    └── journal.js
```

## Routes disponibles

| Méthode | URL | Description | Réponses |
|---|---|---|---|
| GET | /vehicules | Liste des véhicules | 200 |
| GET | /vehicules?disponible=true | Liste des véhicules disponibles | 200 |
| GET | /vehicules/:id | Récupère un véhicule | 200, 404 |
| POST | /vehicules | Crée un véhicule | 201, 400 |
| PATCH | /vehicules/:id | Modifie un ou plusieurs champs | 200, 400, 404 |
| DELETE | /vehicules/:id | Supprime un véhicule | 204, 404 |

## Champs du véhicule

- `id` : attribué automatiquement par le serveur.
- `marque` : obligatoire.
- `modele` : obligatoire.
- `immatriculation` : obligatoire et unique.
- `disponible` : `true` par défaut à la création.

## Gestion des erreurs

Les erreurs sont renvoyées au format JSON :

- `404` : `{ "erreur": "Véhicule introuvable" }`
- `400` : `{ "erreur": "Champs obligatoires manquants" }`
- `400` : `{ "erreur": "Immatriculation déjà existante" }`
- `404` : `{ "erreur": "Route introuvable" }`

## Technologies utilisées

- Node.js
- Express.js
- JavaScript (ES Modules)
- Postman
