import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.render("register", {
    title: "Infoweb - Registro",
  });
});

router.post(
  "/",
  passport.authenticate("signUp", {
    failureRedirect: "/errorRegister",
    successRedirect: "/login",
  })
);

export default router;
