class User {
  constructor({ id, name, password, email }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
  }

  static validate({ name, email, password }) {
    if (
      !name ||
      typeof name !== "string" ||
      name.length < 5 ||
      name.length > 100
    ) {
      return "Tên tối thiểu 5 ký tự và tối đa 100 ký tự";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== "string" ||
      email.length === 0 ||
      email.length > 255 ||
      !emailRegex.test(email)
    ) {
      return "Email không hợp lệ!";
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255
    ) {
      return "Mật khẩu tối thiểu 6 ký tự và tối đa 255 ký tự";
    }
    return null;
  }
}

module.exports = User;
