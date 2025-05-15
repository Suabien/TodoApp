const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByName } = require("../repository/userRepo");
const User = require("../models/usermodels");

exports.registerUser = async (name, password, email) => {
  const error = User.validate({ name, email, password });
  if (error) {
    return { error };
  }
  const existingUser = await findUserByName(name);
  if (existingUser) {
    return { error: "Tên người dùng đã tồn tại" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(name, hashedPassword, email);
  return { message: "Đăng ký thành công" };
};

exports.loginUser = async (name, password) => {
  const userData = await findUserByName(name);
  if (!userData) {
    return { error: "Sai tên đăng nhập hoặc mật khẩu" };
  }
  const user = new User(userData);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "Sai tên đăng nhập hoặc mật khẩu" };
  }
  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  return { token, message: "Đăng nhập thành công!" };
};
