import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  //mostrar vista logout  - mensaje "hasta luego"
  if (req.user) {
    res.render("logout", {
      title: "Ingoweb - Logout",
      nombre: req.session.nombre,
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/", (req, res) => {
  // redireccionar a login luego de mostrar el mensaje
  req.session.destroy((err) => {
    if (!err) {
      console.log("logout ok ");
      res.redirect("/login");
    } else {
      res.send({ status: "Error al borrar session" });
    }
  });
});

export default router;
