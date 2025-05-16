require("dotenv").config();
const mysql = require("mysql2/promise");

// Tạo kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Kiểm tra kết nối MySQL
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Kết nối MySQL thành công!");
    connection.release();
  } catch (err) {
    console.error("Kết nối MySQL thất bại:", err.message);
  }
})();

module.exports = pool;
