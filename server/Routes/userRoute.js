const express = require("express");
const { registeruser } = require("../Controller/userController");

const router = express.Router();

router.post("/register" , registeruser);

module.exports = router;
