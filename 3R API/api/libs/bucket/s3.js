const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

/* Creating a new instance of the S3 class, and passing in the accessKeyId, secretAccessKey, and region
as arguments. */
const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  region,
});

/**
 * It takes a file object, creates a read stream from the file's path, and then uploads the file to the
 * S3 bucket
 * @param file - The file object that was passed to the uploadFile function.
 * @returns The promise of the upload.
 */
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: bucketName,
    Key: file.filename,
    Body: fileStream,
  };
  return s3.upload(params).promise();
};

const uploadThumb = async (filePath, filename) => {
  const fileStream = fs.createReadStream(filePath);
  const params = {
    Bucket: bucketName,
    Key: filename,
    Body: fileStream,
  };
  return s3.upload(params).promise();
};

/**
 * It takes a key as an argument, and returns a read stream of the file associated with that key
 * @param key - The name of the file you want to download.
 * @returns A read stream of the file.
 */
const downloadFile = (key) => {
  const params = {
    Key: key,
    Bucket: bucketName,
  };
  return s3.getObject(params).createReadStream();
};
exports.uploadFile = uploadFile;
exports.downloadFile = downloadFile;
exports.uploadThumb = uploadThumb;
