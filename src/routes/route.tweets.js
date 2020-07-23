const mongoose = require("mongoose");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Tweets = require("../models/model.tweets");
const { hash } = require("bcrypt");
const checkJwt = require("express-jwt");
const router = Router();

router.post("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let userJson;
  jwt.verify(token, "Proyecto-final", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    userJson = user;
  });
  try {
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

module.exports = router;
