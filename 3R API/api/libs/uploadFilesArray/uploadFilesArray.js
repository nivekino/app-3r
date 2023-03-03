const { uploadFile } = require("../bucket/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
let each = require("async-each");

const uploadFilesArray = async (files) => {
  return new Promise(async (resolve, reject) => {
    const arrayIdsImages = {};
    let array = Object.keys(files);
    let num = 0;
    each(array, async (key) => {
      const file = files[key][0];
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      const imageSrc = `images/${result.Key}`;
      arrayIdsImages[key] = imageSrc;
      num++;
      if (num === Object.keys(files).length) {
        resolve(arrayIdsImages);
      }
    });
  });
};

exports.uploadFilesArray = uploadFilesArray;
