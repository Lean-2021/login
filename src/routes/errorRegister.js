import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("errorRegister", {
    title: "Infoweb - Error",
  });
});

export default router;
