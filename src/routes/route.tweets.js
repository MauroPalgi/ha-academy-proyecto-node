const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Tweets = require("../models/model.tweets");
const User = require("../models/model.user");
const checkJwt = require("express-jwt");
const { SECRET_KEY } = require("../config");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenVer = await jwt.verify(token, SECRET_KEY);
    const userData = await User.findOne({ email: tokenVer.email });
    const newTweets = await Tweets.create({
      text: req.body.text,
      author: { username: userData.username },
    });
    res.status(200).json(newTweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const findTweet = await Tweets.find();
    res.status(200).json(findTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VERIFY FUNCTION

module.exports = router;
