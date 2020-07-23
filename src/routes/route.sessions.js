const { Router, json } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/model.user");
const { compare } = require("bcrypt");
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
    const token = jwt.sign(userPayload, SECRET_KEY);

    res.json({
      user: userPayload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err.message);
    }
    res.status(200).json(decoded);
  });
});

module.exports = router;

//! TODO - TODA ESTA PARTE
