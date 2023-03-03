const ReduceModel = require("../models/ReduceModel");
const { uploadFile, uploadThumb } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");
const thumbsupply = require("thumbsupply");

const createReduce = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const file = req.file;

    const { title, hashtag1, hashtag2, description } = req.body;

    if (!title || !hashtag1 || !hashtag2 || !file || !description) {
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
        thumbSrc = `https://${req.get("host")}/images/${thumbResult.key}`;
        await unlinkFile(thumb);
      }

      const result = await uploadFile(file);
      const imageSrc = `https://${req.get("host")}/images/${result.Key}`;
      await unlinkFile(file.path);

      let newReduce = new ReduceModel({
        title: req.sanitize(title),
        source: imageSrc,
        thumbnail: thumbSrc,
        hashtag1: req.sanitize(hashtag1),
        hashtag2: req.sanitize(hashtag2),
        description: req.sanitize(description),
        type: "reduce",
      });

      newReduce.save();
      resolve(res.status(200).json({ message: "Reduce added" }));
    }
  });
};

const getAllReduce = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(ReduceModel.find());
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ reduce: result }));
  });
};

const getReduceById = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(ReduceModel.findById(id));
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ reduce: result }));
  });
};

const deleteReduce = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    let [err, result] = await to(ReduceModel.findByIdAndDelete(id));
    if (err) {
      resolve(
        res
          .status(400)
          .json({ message: "Internal server error", error: err.message })
      );
    }
    resolve(res.status(200).json({ message: "Reduce deleted" }));
  });
};

const updateReduce = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const file = req.file;
    const { title, hashtag1, hashtag2 } = req.body;
    if (!title || !hashtag1 || !hashtag2 || !file) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      const imageSrc = `https://${req.get("host")}/images/${result.key}`;
      let newReduce = new ReduceModel({
        title: req.sanitize(title),
        video: imageSrc,
        hashtag1: req.sanitize(hashtag1),
        hashtag2: req.sanitize(hashtag2),
      });

      let [err, result2] = await to(
        ReduceModel.findByIdAndUpdate(id, newReduce)
      );
      if (err) {
        resolve(
          res
            .status(400)
            .json({ message: "Internal server error", error: err.message })
        );
      }
      resolve(res.status(200).json({ message: "Reduce updated" }));
    }
  });
};

exports.createReduce = createReduce;
exports.getAllReduce = getAllReduce;
exports.getReduceById = getReduceById;
exports.deleteReduce = deleteReduce;
exports.updateReduce = updateReduce;
