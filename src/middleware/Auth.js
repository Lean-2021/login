function isAuth(req, res, next) {
  //comprobar  si el usuario esta autenticado ó no
  if (req.isAuthenticated()) {
    const { nombre, email } = req.user;
    req.session.nombre = nombre;
    req.session.email = email;
    next();
  } else {
    res.redirect("/login");
  }
}
export default isAuth;
