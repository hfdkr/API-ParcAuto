import express from "express";
import journal from "./middlewares/journal.js";
import vehiculesRouter from "./routes/vehicules.js";
import "dotenv/config";

const app = express();
// port d'ecoute du serveur (defini dans le fichier .env)
const PORT = process.env.PORT;

// Middlewares globaux
app.use(journal);
app.use(express.json());

// Routes
app.use("/vehicules", vehiculesRouter);

// Middleware 404 
app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

// Gestion des erreurs : reponse en JSON
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erreur: "JSON invalide" });
  }
  console.error(err);
  res.status(500).json({ erreur: "Erreur serveur" });
});

app.listen(PORT, () => {
  console.log(`Serveur ParcAuto démarré sur http://localhost:${PORT}`);
});