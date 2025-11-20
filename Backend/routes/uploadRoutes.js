const express = require("express");
const upload = require("../middlewares/upload.js");
const {singleUpload , multipleUpload} = require("../controllers/uploadControllers.js")

const router = express.Router();

router.post("/file", upload.single("image"), singleUpload);

router.post("/multiple-files" , upload.array("photos" , 5),multipleUpload)

module.exports = router;
