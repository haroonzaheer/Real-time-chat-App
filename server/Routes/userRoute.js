const express = require("express");
const { registeruser, loginuser, findUser, getusers, } = require("../Controller/userController");

const router = express.Router();

router.post("/register" , registeruser);
router.post("/login" , loginuser);
router.get("/find/:userId", findUser);
router.get("/", getusers);

module.exports = router;
