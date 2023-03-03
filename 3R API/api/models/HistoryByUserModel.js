const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoryByUserModel = mongoose.model("HistoryByUser", {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  quantity: Number,
  type: String,
});

module.exports = HistoryByUserModel;
