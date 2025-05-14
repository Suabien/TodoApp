require("dotenv").config();
const mysql = require("mysql2/promise");

// Tạo kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const createUser = async (name, passwordHash, email) => {
  const [rows] = await pool.execute(
    "INSERT INTO user (name, password, email) VALUES (?, ?, ?)",
    [name, passwordHash, email]
  );
  return rows;
};

const findUserByName = async (name) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE name = ?", [
    name,
  ]);
  return rows[0];
};

module.exports = { createUser, findUserByName };
