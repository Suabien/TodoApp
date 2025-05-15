const pool = require("../config/db");

// Tạo user mới
const createUser = async (name, passwordHash, email) => {
  const [rows] = await pool.execute(
    "INSERT INTO user (name, password, email) VALUES (?, ?, ?)",
    [name, passwordHash, email]
  );
  return rows;
};

// Tìm user theo tên
const findUserByName = async (name) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE name = ?", [
    name,
  ]);
  return rows[0];
};

module.exports = { createUser, findUserByName };
