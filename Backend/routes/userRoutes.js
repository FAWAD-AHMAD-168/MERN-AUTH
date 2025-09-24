const express = require("express");
const router = express.Router();
const {
getUserData
} = require("../controllers/userControllers.js");
const userAuth = require("../middlewares/userAuth.js");


router.get("/user-data",userAuth,getUserData);




module.exports = router;
