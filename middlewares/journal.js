// Middleware journal : affiche la méthode et l'URL de chaque requête
const journal = (req, res, next) => {
  const date = new Date().toLocaleString("fr-FR");
  console.log(`[${date}] ${req.method} ${req.originalUrl}`);
  next();
};

export default journal;