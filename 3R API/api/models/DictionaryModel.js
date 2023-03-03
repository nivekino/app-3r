const mongoose = require("mongoose");

const dictionaryModel = mongoose.model("Dictionary", {
  name: String,
  whatis: String,
  reuse: String,
  reduce: String,
  recycle: String,
  image: String,
  category: String,
});

module.exports = dictionaryModel;
