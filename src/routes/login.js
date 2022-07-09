import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  //mostrar pagin de Login
  res.render("login", {
    title: "Infoweb - Login",
  });
});

router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/",
  })
);

export default router;
