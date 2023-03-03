const mongoose = require("mongoose");

const ReuseModel = mongoose.model("Reuses", {
  title: String,
  description: String,
  thumbnail: String,
  source: String,
  hashtag1: String,
  hashtag2: String,
  type: String,
});

module.exports = ReuseModel;
