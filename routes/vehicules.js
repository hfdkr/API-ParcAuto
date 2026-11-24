import express from "express";

const router = express.Router();

// Donnees de depart
let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

// Prochain id attribue par le serveur
let prochainId = Math.max(...vehicules.map((v) => v.id)) + 1;

// Cherche un vehicule par son id
const vehicul = (id) => vehicules.find((v) => v.id === Number(id));

// GET /vehicules avec un filtre optionnel sur la disponibilite
router.get("/", (req, res) => {
  const { disponible } = req.query;

  if (disponible === "true" || disponible === "false") {
    const filtre = disponible === "true";
    return res.status(200).json(vehicules.filter((v) => v.disponible === filtre));
  }

  res.status(200).json(vehicules);
});

// GET /vehicules/:id
router.get("/:id", (req, res) => {
  const vehicule = vehicul(req.params.id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  res.status(200).json(vehicule);
});

// POST /vehicules

router.post("/", (req, res) => {
  const { marque, modele, immatriculation } = req.body || {};

  //  Verifier les champs obligatoires
  if (!marque || !modele || !immatriculation) {
    return res.status(400).json({
      erreur: "Champs obligatoires manquants"
    });
  }

  // Verifier si l'immatriculation existe deja
  const existe = vehicules.some(
    v => v.immatriculation === immatriculation
  );

  if (existe) {
    return res.status(400).json({
      erreur: "Immatriculation déjà existante"
    });
  }

  // Creer le nouveau vehicule
  const newVehicule = {
    id: prochainId++,
    marque,
    modele,
    immatriculation,
    disponible: true
  };

  // Ajouter le vehicule au tableau
  vehicules.push(newVehicule);

  // Renvoyer le vehicule cree avec le code 201
  res.status(201).json(newVehicule);
});


// PATCH /vehicules/:id
router.patch("/:id", (req, res) => {
  const vehicule = vehicul(req.params.id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  const { marque, modele, immatriculation, disponible } = req.body || {};

  // On ne modifie que les champs envoyes dans le corps de la requête
  if (marque !== undefined) vehicule.marque = marque;
  if (modele !== undefined) vehicule.modele = modele;
  if (immatriculation !== undefined) vehicule.immatriculation = immatriculation;
  if (disponible !== undefined) vehicule.disponible = disponible;

  res.status(200).json(vehicule);
});

// DELETE /vehicules/:id
router.delete("/:id", (req, res) => {
  const vehicule = vehicul(req.params.id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  vehicules = vehicules.filter((v) => v.id !== vehicule.id);
  res.status(204).send();
});

export default router;