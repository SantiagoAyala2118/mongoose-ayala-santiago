import express from "express";
import { routes } from "./src/routes/index.js";
import { startDB } from "./src/config/database.js";
startDB();

const app = express();
const PORT = 4100;

//--------------MIDDLEWARES
app.use(express.json());

//--------------RUTAS
app.use("/api", routes);

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
