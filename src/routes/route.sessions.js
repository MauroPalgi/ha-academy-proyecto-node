const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Seccion = require("../models/model.sessions");
const User = require("../models/model.user");
const { hash, compare } = require("bcrypt");
const checkJwt = require("express-jwt");
const { SECRET_KEY } = require("../config");
const router = Router();

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, accessTokenSecret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

//! TODO - TODA ESTA PARTE

router.post("/", async (req, res, next) => {
  try {
    const session = await User.findOne({ email: req.body.email });
    console.log(session);

    // const match = await compare(req.body.password, session.hash, (err, res) => {
    //   if (err) {
    //     res.json(err.message);
    //   }
    //   console.log(res);
    // });

    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/",
  checkJwt({ secret: "Proyecto-final", algorithms: ["HS256"] }),
  (req, res) => {
    console.log(req.user);
    res.json(req.user);
  }
);

module.exports = router;



//! TODO - TODA ESTA PARTE