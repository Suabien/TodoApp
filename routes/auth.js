const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

// Đăng ký tài khoản mới
router.post("/signup", authController.signup);

// Đăng nhập
router.post("/login", authController.login);

module.exports = router;