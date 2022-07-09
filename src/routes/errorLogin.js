import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("errorLogin", {
    title: "Infoweb - Error",
  });
});

export default router;
