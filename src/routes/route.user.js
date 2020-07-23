const mongoose = require("mongoose");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/model.user");
const { hash } = require("bcrypt");
const checkJwt = require("express-jwt");
const { SECRET_KEY } = require("../config");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const passHash = await hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      hash: passHash,
    });
    const userData = { email: newUser.email, username: newUser.username };
    const token = jwt.sign(userData, SECRET_KEY);
    res.json({ token: token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
