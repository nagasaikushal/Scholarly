const express = require("express");
const router = express.Router();
const { register, login, registerGuide } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/registerGuide",registerGuide)
module.exports = router;
