const RecicleModel = require("../models/RecicleModel");
const HistoryByUserModel = require("../models/HistoryByUserModel");
const AchievementsModel = require("../models/AchievementsModel");
const AchievementsPerUserModel = require("../models/AchievementsPerUser");
const { uploadFile } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");

const createRecicle = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { name, typeProduct, amount, place } = req.body;

    if (!name || !typeProduct || !amount || !place) {
      reject(res.status(400).json({ message: "Missing data" }));
    } else {
      const file = req.file;
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      const imageSrc = `https://${req.get("host")}/images/${result.key}`;

      let [err, result4] = await to(
        validateAchievement({ userId: req.user.userId })
      );

      let newRecicle = new RecicleModel({
        userId: req.user.userId,
        name: req.sanitize(name),
        typeProduct: req.sanitize(typeProduct),
        amount: req.sanitize(amount),
        place: req.sanitize(place),
        image: imageSrc,
      });

      newRecicle.save();
      resolve(res.status(200).json({ message: "Recicle added" }));
    }
  });
};

const getAllRecicles = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(RecicleModel.find());
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ recicle: result }));
  });
};

const getAllReciclesByUserId = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(RecicleModel.find({ userId: req.params.id }));
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ recicle: result }));
  });
};

const deleteRecicleById = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(RecicleModel.findByIdAndDelete(id));
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }

    resolve(res.status(200).json({ message: "Recicle deleted" }));
  });
};

const validateAchievement = (data) => {
  return new Promise(async (resolve, reject) => {
    const { userId } = data;
    let historyRes = {
      quantity: 1,
    };
    //validate if HistoryByUserModel exists
    let [err, result] = await to(HistoryByUserModel.find({ userId: userId }));
    if (err) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    } else if (result.length === 0) {
      //create new HistoryByUserModel
      let newHistoryByUser = new HistoryByUserModel({
        userId: userId,
        quantity: 1,
      });

      newHistoryByUser.save();
    } else {
      [err, historyRes] = await to(
        HistoryByUserModel.findOneAndUpdate(
          { userId: userId },
          { $inc: { quantity: 1 } }
        )
      );

      if (err) {
        reject(
          res
            .status(400)
            .json({ message: "Internal server error", error: err.message })
        );
      }
      historyRes = {
        quantity: historyRes.quantity + 1,
      };
    }
    //search on collection achievements if the user has achieved the achievement
    let [err2, result2] = await to(
      AchievementsModel.findOne({ quantity: historyRes.quantity })
    );

    if (err2) {
      reject(
        res
          .status(400)
          .json({ message: "Internal server error", error: err2.message })
      );
    } else if (result2) {
      //if the user has achieved the achievement, then create a new achievementPerUser

      let newAchievementPerUser = new AchievementsPerUserModel({
        userId: userId,
        achievementId: result2._id,
      });

      newAchievementPerUser.save();
    }
    resolve(historyRes);
  });
};

exports.createRecicle = createRecicle;
exports.getAllRecicles = getAllRecicles;
exports.getAllReciclesByUserId = getAllReciclesByUserId;
exports.deleteRecicleById = deleteRecicleById;
