require("dotenv").config();
const userService = require("../service/authService");

// Xử lý đăng ký
exports.signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const result = await userService.registerUser(name, password, email);
    if (result.error) {
      return res.status(result.status || 400).json({ message: result.error });
    }
    res.status(result.status || 201).json({ message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xử lý đăng nhập
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await userService.loginUser(name, password);
    if (result.error) {
      return res.status(result.status || 400).json({ message: result.error });
    }
    res.status(result.status || 200).json({ token: result.token, message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
