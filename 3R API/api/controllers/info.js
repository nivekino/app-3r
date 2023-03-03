const UserModel = require("../models/UserModel");
const ReduceModel = require("../models/ReduceModel");
const ReuseModel = require("../models/ReuseModel");

const { uploadFile, uploadThumb } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");

const getInfoUser = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(UserModel.findOne({ _id: id }).exec());
    if (err) {
      reject(err);
    }
    resolve(res.status(200).json({ info: result }));
  });
};

const updateInfoUser = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const file = req.file;
    const { username, email } = req.body;

    const resultImg = await uploadFile(file);
    const imageSrc = `https://${req.get("host")}/images/${
      resultImg.Key
    }`;
    await unlinkFile(file.path);

    console.log(id);
    //update user
    let [err, result] = await to(
      UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            username: username,
            email: email,
            image: imageSrc,
          },
        },
        { new: true }
      ).exec()
    );
    if (err) {
      reject(err);
    }
    resolve(res.status(200).json({ message: "User updated" }));
  });
};

const getAll = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    //get all reduces and reuses
    let [err, result] = await to(ReduceModel.find().exec());
    if (err) {
      reject(err);
    }
    let [err2, result2] = await to(ReuseModel.find().exec());
    if (err2) {
      reject(err2);
    }

    //concat 2 result
    let resultAll = result.concat(result2);
    resolve(res.status(200).json({ info: resultAll }));
  });
};

exports.getInfoUser = getInfoUser;
exports.updateInfoUser = updateInfoUser;
exports.getAll = getAll;
