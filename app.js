import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
