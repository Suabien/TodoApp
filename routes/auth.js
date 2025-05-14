require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByName } = require("../models/usermodels");

const router = express.Router();

// Đăng ký
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, password, email } = req.body;
  try {
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
    }
    // Kiểm tra xem đã có người dùng tên này chưa
    const existingUser = await findUserByName(name);
    if (existingUser) {
      return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, hashedPassword, email);
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await findUserByName(name);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
