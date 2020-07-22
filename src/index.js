const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/route.user");
const sessionsRoute = require("./routes/route.user");
const tweetsRoute = require("./routes/route.tweets");
const SERVER_PORT = 4000;
const checkJwt = require("express-jwt");
const morgan = require("morgan");

mongoose
  .connect("mongodb://localhost/twitter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("La BD se inicializo correctamente.");

    // MIDLEWARE

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(morgan("short"));
    // app.use(
    //   checkJwt({ secret: "Proyecto_final", algorithms: ["HS256"] }).unless({
    //     path: [[/^\/sessions\//]],
    //   })
    // );
    app.use("/users", userRoute);
    app.use("/sessions", sessionsRoute);
    app.use("/tweets", tweetsRoute);

    // SERVER
    app.listen(SERVER_PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => console.error(err.message));

//! CREATE ENVIOROMENTAL VARIABLES SETTINGS

//! CONFIGURAR CORS

//! VER BIEN COMO HACER LO DE JWT
