import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoose-ayala-santiago");
    // para borrar toda la base de datos
    // await mongoose.connection.dropDatabase();
    console.log("Conectado a la base de datos");
  } catch (err) {
    console.error("No se pudo conectar a la base de datos", err);
  }
};
