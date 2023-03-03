const dictionaryModel = require("../models/DictionaryModel");
const { uploadFile } = require("../libs/bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { to } = require("../libs/to/to");

const createDictionary = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const file = req.file;
    const { name, whatis, reuse, reduce, recycle, category } = req.body;

    if (!name || !whatis || !reuse || !reduce || !recycle || !category) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      let resultUpload = await uploadFile(file);
      await unlinkFile(file.path);

      const image = `https://${req.get("host")}/images/${
        resultUpload.key
      }`;
      let dictionary = new dictionaryModel({
        name,
        whatis,
        reuse,
        reduce,
        recycle,
        category,
        image,
      });
      const [err, result] = await to(dictionary.save());
      if (err) {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      }
      resolve(res.status(200).json({ message: "Dictionary created" }));
    }
  });
};

const getAllDictionary = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { search } = req.body;
    let query = {};

    if (search) {
      //seach by name or whatis or reuse or reduce or recycle regex
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { whatis: { $regex: search, $options: "i" } },
          { reuse: { $regex: search, $options: "i" } },
          { reduce: { $regex: search, $options: "i" } },
          { recycle: { $regex: search, $options: "i" } },
        ],
      };
    }
    const [err, result] = await to(dictionaryModel.find(query));
    if (err) {
      reject(
        res
          .status(500)
          .json({ message: "Internal server error", details: err.message })
      );
    }
    resolve(res.status(200).json({ dictionary: result }));
  });
};

const deleteDictionaryById = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const [err, result] = await to(dictionaryModel.findByIdAndDelete(id));
    if (err) {
      reject(
        res
          .status(500)
          .json({ message: "Internal server error", details: err.message })
      );
    }
    resolve(res.status(200).json({ message: "Dictionary deleted" }));
  });
};

const getDictionaryById = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const [err, result] = await to(dictionaryModel.findById(id));
    if (err) {
      reject(
        res
          .status(500)
          .json({ message: "Internal server error", details: err.message })
      );
    }
    resolve(res.status(200).json({ dictionary: result }));
  });
};

exports.createDictionary = createDictionary;
exports.getAllDictionary = getAllDictionary;
exports.deleteDictionaryById = deleteDictionaryById;
exports.getDictionaryById = getDictionaryById;
