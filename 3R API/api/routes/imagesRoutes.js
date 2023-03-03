const express = require("express");
const router = express.Router();
const { downloadFile } = require("../libs/bucket/s3");

/* A route that is listening for a get request. */
router.route("/:key").get((req, res) => {
  const key = req.params.key;
  const readStream = downloadFile(key);
  /* Piping the readStream to the response. */
  readStream.pipe(res);
});


exports.router = router;
