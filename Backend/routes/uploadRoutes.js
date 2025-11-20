const express = require("express");
const upload = require("../middlewares/upload.js");

const router = express.Router();

router.post("/file", upload.single("image"), (req, res) => {
  return res.status(200).json({
    message: "File uploaded successfully",
    file: req.file
  });
});

module.exports = router;
