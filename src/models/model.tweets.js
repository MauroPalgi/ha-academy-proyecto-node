const { Schema, model } = require("mongoose");

const teewtsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    username: { type: String },
  },
});

module.exports = model("Tweets", teewtsSchema);
