require("dotenv").config();

exports.SECRET_KEY = process.env.SECRET_KEY;
exports.SERVER_PORT = 5000;
exports.MONGODB_CONNECTION = "mongodb://localhost/twitter";