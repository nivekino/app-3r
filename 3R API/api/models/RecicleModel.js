const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recicleModel = mongoose.model("RecicleItems", {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  name: String,
  typeProduct: String,
  amount: Number,
  place: String,
  created_at: { type: Date, default: Date.now },
  image: String,
});

module.exports = recicleModel;
