import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import routeHome from "./routes/home.js";
import routeProduct from "./routes/productsTest.js";
import routeLogin from "./routes/login.js";
import routeLogout from "./routes/logout.js";
import routeRegister from "./routes/register.js";
import routeErrorLogin from "./routes/errorLogin.js";
import routeErrorRegister from "./routes/errorRegister.js";
import connectDB from "./DB/configDB.js";
import sockets from "./sockets.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import "./passport/local.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer); //implementación de websocket
const PORT = process.env.PORT || 8080; // puerto de conexión
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

connectDB();
sockets(io);

// views - motores de plantilla
app.set("views", "./src/views");
app.set("view engine", "ejs"); //motor de plantillas EJS

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("public"));
app.use(
  session({
    secret: "logeo",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.URI_SESSION}`,
      mongoOptions: advanceOptions,
      ttl: 600,
    }),
  })
);
app.use(passport.initialize()); //iniciar passport y sesion passport
app.use(passport.session());

//routes
app.use("/", routeHome);
app.use("/api/productos-test", routeProduct);
app.use("/login", routeLogin);
app.use("/logout", routeLogout);
app.use("/register", routeRegister);
app.use("/errorLogin", routeErrorLogin);
app.use("/errorRegister", routeErrorRegister);

//connection server
try {
  httpServer.listen(PORT);
  console.log(`Server on port ${PORT}...`);
} catch (error) {
  console.log("Error de conexión con el servidor...", error);
}
