const mongoose = require("mongoose");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/model.user");
const Tweets = require("../models/model.tweets");
const { hash } = require("bcrypt");
const checkJwt = require("express-jwt");
const router = Router();
 
router.post("/", async (req, res) => {
  try {
    const passHash = await hash(req.body.password, 10);
    const newTweets = await Tweets.create({
      email: req.body.email,
      username: req.body.username,
      hash: passHash,
    });
    const userData = { email: newTweets.email, username: newTweets.username };
    const token = jwt.sign(userData, "Proyecto_final");
    res.json({ token: token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
