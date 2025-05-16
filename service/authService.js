const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByName } = require("../repository/userRepository");
const { User, userSchema } = require("../models/userModel");

// Hàm validate
function validateUserInput({ name, email, password }) {
  if (userSchema.name.required && (!name || typeof name !== "string")) {
    return { status: 400, message: "Tên là bắt buộc" };
  }
  if (
    name.length < userSchema.name.minLength ||
    name.length > userSchema.name.maxLength
  ) {
    return {
      status: 400,
      message: `Tên phải tối thiểu ${userSchema.name.minLength} đến ${userSchema.name.maxLength} ký tự`,
    };
  }
  if (userSchema.email.required && (!email || typeof email !== "string")) {
    return { status: 400, message: "Email là bắt buộc" };
  }
  if (
    email.length === 0 ||
    email.length > userSchema.email.maxLength ||
    !userSchema.email.pattern.test(email)
  ) {
    return { status: 400, error: "Email không hợp lệ!" };
  }
  if (
    userSchema.password.required &&
    (!password || typeof password !== "string")
  ) {
    return { status: 400, message: "Mật khẩu là bắt buộc" };
  }
  if (
    password.length < userSchema.password.minLength ||
    password.length > userSchema.password.maxLength
  ) {
    return {
      status: 400,
      message: `Mật khẩu phải tối thiểu ${userSchema.password.minLength} đến ${userSchema.password.maxLength} ký tự`,
    };
  }
  return null;
}

exports.registerUser = async (name, password, email) => {
  const validation = validateUserInput({ name, email, password });
  if (validation) {
    return validation;
  }
  const existingUser = await findUserByName(name);
  if (existingUser) {
    return { status: 409, error: "Tên người dùng đã tồn tại" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(name, hashedPassword, email);
  return { status: 201, message: "Đăng ký thành công" };
};

exports.loginUser = async (name, password) => {
  const userData = await findUserByName(name);
  if (!userData) {
    return { status: 400, error: "Sai tên đăng nhập hoặc mật khẩu" };
  }
  const user = new User(userData);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 400, error: "Sai tên đăng nhập hoặc mật khẩu" };
  }
  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  return { status: 200, token, message: "Đăng nhập thành công!" };
};
