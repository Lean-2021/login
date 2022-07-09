import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../DB/models/usuarios.js";

const localStrategy = Strategy;

passport.use(
  //passport refistro de usuarios
  "signUp",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const usuario = await Usuarios.findOne({ email });
      if (usuario) {
        return done(null, false);
      }
      const user = new Usuarios();
      const { nombre } = req.body;
      user.nombre = nombre;
      user.email = email;
      user.password = user.encrypta(password);

      await user.save();
      return done(null, user);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await Usuarios.findOne({ email });
      if (!user || user.compara(password, user.password) === false) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await Usuarios.findById(id);
  done(null, user);
});
