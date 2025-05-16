const pool = require("../config/db");

exports.createUser = async (name, passwordHash, email) => {
  const [result] = await pool.execute(
    "INSERT INTO user (name, password, email) VALUES (?, ?, ?)",
    [name, passwordHash, email]
  );
  return result;
};

exports.findUserByName = async (name) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE name = ?", [
    name,
  ]);
  return rows[0];
};
