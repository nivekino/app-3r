const ReuseModel = require("../models/ReuseModel");
const { uploadFile, uploadThumb } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");
const thumbsupply = require("thumbsupply");

const createReuse = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const file = req.file;

    const { title, description, hashtag1, hashtag2 } = req.body;

    if (!title || !description || !hashtag1 || !hashtag2 || !file) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      let thumbSrc = "";

      if (file.mimetype === "video/mp4") {
        const [err, thumb] = await to(
          thumbsupply.generateThumbnail(file.path, {
            width: 600,
            height: 600,
            quality: 100,
            mimetype: "video/mp4",
            cacheDir: "./uploads/thumbnail/",
            filename: file.filename,
          })
        );

        if (err) {
          resolve(
            res
              .status(400)
              .json({ message: "Error while generating thumbnail" })
          );
        }

        const thumbName = `thumb-${file.filename}`;
        const thumbResult = await uploadThumb(thumb, thumbName);
        thumbSrc = `https://${req.get("host")}/images/${
          thumbResult.key
        }`;
        await unlinkFile(thumb);
      }

      const result = await uploadFile(file);
      const imageSrc = `https://${req.get("host")}/images/${
        result.Key
      }`;
      let newReuse = new ReuseModel({
        title: req.sanitize(title),
        description: req.sanitize(description),
        source: imageSrc,
        thumbnail: thumbSrc,
        hashtag1: req.sanitize(hashtag1),
        hashtag2: req.sanitize(hashtag2),
        type: "reuse",
      });

      newReuse.save();
      resolve(res.status(200).json({ message: "Reuse added" }));
    }
    await unlinkFile(file.path);
  });
};

const getAllReuse = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(ReuseModel.find());
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ reuse: result }));
  });
};

const getReuseById = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(ReuseModel.findById(id));
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ reuse: result }));
  });
};

const deleteReuse = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(ReuseModel.findByIdAndDelete(id));
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ message: "Reuse deleted" }));
  });
};

const updateReuse = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const file = req.file;

    const { title, description, hashtag1, hashtag2 } = req.body;
    if (!title || !description || !hashtag1 || !hashtag2 || !file) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      const resultImg = await uploadFile(file);
      await unlinkFile(file.path);
      const imageSrc = `images/${resultImg.key}`;
      let newReuse = new ReuseModel({
        title: req.sanitize(title),
        description: req.sanitize(description),
        image: imageSrc,
        hashtag1: req.sanitize(hashtag1),
        hashtag2: req.sanitize(hashtag2),
      });

      let [err, result] = await to(ReuseModel.findByIdAndUpdate(id, newReuse));
      if (err) {
        resolve(
          res
            .status(400)
            .json({ message: "Internal server error", error: err.message })
        );
      }
      resolve(res.status(200).json({ message: "Reuse updated" }));
    }
  });
};

exports.createReuse = createReuse;
exports.getAllReuse = getAllReuse;
exports.getReuseById = getReuseById;
exports.deleteReuse = deleteReuse;
exports.updateReuse = updateReuse;
