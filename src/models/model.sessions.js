const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const sessionsSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [(email) => isEmail(email), "correo invalido"],
  },
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

module.exports = model("Seccion", sessionsSchema);
