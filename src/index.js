const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/route.user");
const sessionsRoute = require("./routes/route.sessions");
const tweetsRoute = require("./routes/route.tweets");
const checkJwt = require("express-jwt");
const morgan = require("morgan");
const cors = require("cors");
const { SECRET_KEY, SERVER_PORT, MONGODB_CONNECTION } = require("./config");

mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("La BD se inicializo correctamente.");

    // MIDDLEWARE

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cors());
    app.use(morgan("dev"));
    //console.log(process.env.SECRET_KEY);
    // app.use(
    //   checkJwt({ secret: "Proyecto-final", algorithms: ["HS256"] }).unless({
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
