const mongoose = require("mongoose");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Tweets = require("../models/model.tweets");
const { hash } = require("bcrypt");
const checkJwt = require("express-jwt");
const router = Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const tokenVer = await jwt
      .verify(req.token, "Proyecto-final")
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        return res.sendStatus(403).json(err);
      });

    const newTweets = await Tweets.create({
      text: req.body.text,
      author: { username: userJson.username },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const findTweet = await Tweets.find();
    res.json(findTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VERIFY FUNCTION

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"].split(" ")[1];
  // hacer validaciones si pinta
  req.token = bearerHeader;
  next();
}

module.exports = router;


//! VIDEO JWT: https://youtu.be/7nafaH9SddU?t=1004