const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Seccion = require("../models/model.sessions");
const { hash } = require("bcrypt");
const checkJwt = require("express-jwt");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const passHash = await hash(req.body.password, 10);
    const newSession = await Seccion.create({
      email: req.body.email,
      username: req.body.username,
      hash: passHash,
    });
    const userData = { email: newSession.email, username: newSession.username };
    const token = jwt.sign(userData, "Proyecto_final");
    res.json({ token: token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", (req,res) => {
  checkJwt({ secret: "Proyecto_final", algorithms: ['HS256'] }),
  (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
})


module.exports = router;
