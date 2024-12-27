const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controller/authController");

// Sign-up route
router.post("/signup", signUp);

// Login route
router.post("/login", login);

module.exports = router;
