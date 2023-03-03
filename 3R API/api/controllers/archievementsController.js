const AchievementsModel = require("../models/AchievementsModel");
const AchievementsPerUser = require("../models/AchievementsPerUser");
const { uploadFile } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");

const createAchievement = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const file = req.file;

    const { title, points, quantity } = req.body;

    if (!title || !points || !file || !quantity) {
      reject(res.status(400).json({ message: "Missing data" }));
    } else {
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      const imageSrc = `https://${req.get("host")}/images/${result.key}`;
      let newAchievement = new AchievementsModel({
        title: req.sanitize(title),
        points: req.sanitize(points),
        quantity: req.sanitize(quantity),
        image: imageSrc,
      });

      newAchievement.save();
      resolve(res.status(200).json({ message: "Achievement added" }));
    }
  });
};

const getAllAchievements = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(AchievementsModel.find());
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ achievement: result }));
  });
};

const getAchievementById = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(AchievementsModel.findById(id));
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ achievement: result }));
  });
};

const getAchievementByUserId = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(AchievementsPerUser.find({ userId: id }).populate("achievementId"));
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ achievement: result }));
  });
};

exports.createAchievement = createAchievement;
exports.getAllAchievements = getAllAchievements;
exports.getAchievementById = getAchievementById;
exports.getAchievementByUserId = getAchievementByUserId;
