const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Seccion = require("../models/model.sessions");
const User = require("../models/model.user");
const { hash, compare } = require("bcrypt");
const checkJwt = require("express-jwt");
const { SECRET_KEY } = require("../config");
const router = Router();

//! TODO - TODA ESTA PARTE

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        error: "No se encuentra ningún usuario con ese email",
      });
    }

    const match = await compare(req.body.password, user.hash);
    if (!match) {
      return res.status(400).json({
        error: "Contraseña incorrecta",
      });
    }

    const userPayload = { email: user.email };
    const token = jwt.sign(userPayload, "Proyecto-final");

    res.json({
      user: userPayload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/",(params) => {
    
  }
);

module.exports = router;

//! TODO - TODA ESTA PARTE
