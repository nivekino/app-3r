const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AchievementsPerUserModel = mongoose.model("AchievementsPerUser", {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  achievementId: {
    type: Schema.Types.ObjectId,
    ref: "Achievements",
    required: true,
  },
});

module.exports = AchievementsPerUserModel;
