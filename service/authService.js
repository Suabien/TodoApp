const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByName } = require("../repository/userRepository");
const { User, userSchema } = require("../models/userModel");

// Hàm validate
function validateUserInput({ name, email, password }) {
  if (userSchema.name.required && (!name || typeof name !== "string")) {
    return "Tên là bắt buộc";
  }
  if (
    name.length < userSchema.name.minLength ||
    name.length > userSchema.name.maxLength
  ) {
    return `Tên phải tối thiểu ${userSchema.name.minLength} đến ${userSchema.name.maxLength} ký tự`;
  }
  if (userSchema.email.required && (!email || typeof email !== "string")) {
    return "Email là bắt buộc";
  }
  if (
    email.length === 0 ||
    email.length > userSchema.email.maxLength ||
    !userSchema.email.pattern.test(email)
  ) {
    return "Email không hợp lệ!";
  }
  if (
    userSchema.password.required &&
    (!password || typeof password !== "string")
  ) {
    return "Mật khẩu là bắt buộc";
  }
  if (
    password.length < userSchema.password.minLength ||
    password.length > userSchema.password.maxLength
  ) {
    return `Mật khẩu phải tối thiểu ${userSchema.password.minLength} đến ${userSchema.password.maxLength} ký tự`;
  }
  return null;
}

exports.registerUser = async (name, password, email) => {
  const error = validateUserInput({ name, email, password });
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
