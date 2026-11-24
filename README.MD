# API ParcAuto

API REST (Express) de gestion des véhicules d'une agence de location. Les données sont gardées dans un tableau en mémoire (pas de base de données) : elles sont réinitialisées à chaque redémarrage.

## Installation et lancement

```bash
npm install
npm start          # ou : npm run dev (redémarrage auto)
```

Serveur : http://localhost:3000

## Structure

```
server.js               # application Express, middlewares, 404
routes/vehicules.js     # express.Router + données en mémoire
middlewares/journal.js  # affiche méthode + URL de chaque requête
package.json            # "type": "module"
```

## Routes

| Méthode | URL | Description | Réponses |
|---|---|---|---|
| GET | /vehicules | liste les véhicules (`?disponible=true` : seulement les disponibles) | 200 |
| GET | /vehicules/:id | renvoie un véhicule | 200 · 404 |
| POST | /vehicules | crée un véhicule (marque, modele, immatriculation obligatoires) | 201 · 400 |
| PATCH | /vehicules/:id | modifie un ou plusieurs champs | 200 · 404 |
| DELETE | /vehicules/:id | supprime un véhicule | 204 · 404 |

## Erreurs (JSON)

- `{ "erreur": "Véhicule introuvable" }` → 404
- `{ "erreur": "Champs obligatoires manquants" }` → 400
- `{ "erreur": "Route introuvable" }` → 404 (URL inconnue)

## Tests Postman

Importer `ParcAuto.postman_collection.json` dans Postman (File → Import), puis lancer les requêtes dans l'ordre.