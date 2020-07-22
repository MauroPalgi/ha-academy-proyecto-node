const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require('./routes/route.user');
const SERVER_PORT = 4000;

mongoose
  .connect("mongodb://localhost/twitter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("La BD se inicializo correctamente.");
    app.use(express.json());

    app.use('/users', userRoute);
    app.listen(SERVER_PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => console.error(err.message));
