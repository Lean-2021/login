import { Router } from "express";
import isAuth from "../middleware/Auth.js";
const router = Router();

router.get("/", isAuth, (req, res) => {
  //ruta principal -mostrar formulario de ingreso de productos
  //si existe un sesion mostrar pagina de inicio
  const { nombre, email } = req.user;
  res.render("index", {
    title: "Infoweb - Inicio",
    nombre: nombre,
    email: email,
  });
});

export default router;
