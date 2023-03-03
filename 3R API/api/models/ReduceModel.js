const mongoose = require("mongoose");

const reduceModel = mongoose.model("Reduce", {
  title: String,
  source: String,
  thumbnail: String,
  hashtag1: String,
  hashtag2: String,
  description: String,
  type: String,
});

module.exports = reduceModel;
