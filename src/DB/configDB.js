import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function connectedDB() {
  mongoose
    .connect(`${process.env.URI}`)
    .then(() => console.log("Connected MongoDB..."))
    .catch((err) => console.log("Error de conexion", err));
}
