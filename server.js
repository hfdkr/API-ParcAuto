import express from 'express';
import vehiculesRouter from './routes/vehicules.js';
import "dotenv/config";
const app = express();
app.use(express.json());
app.use('/vehicules', vehiculesRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});