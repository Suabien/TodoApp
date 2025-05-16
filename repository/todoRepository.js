const pool = require("../config/db");

exports.getAllTodo = async () => {
  const [rows] = await pool.execute("SELECT * FROM todo");
  return rows;
};

exports.getTodo = async (limit, offset) => {
  const [rows] = await pool.execute("SELECT * FROM todo LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
  return rows;
};

exports.createTodo = async (content, description, type_id, isDone = 0) => {
  const [result] = await pool.execute(
    "INSERT INTO todo (content, description, type_id, isDone) VALUES (?, ?, ?, ?)",
    [content, description, type_id, isDone]
  );
  return result;
};

exports.updateTodo = async (id, content, description, type_id, isDone) => {
  const [result] = await pool.execute(
    "UPDATE todo SET content = ?, description = ?, type_id = ?, isDone = ? WHERE id = ?",
    [content, description, type_id, isDone, id]
  );
  return result;
};

exports.deleteTodo = async (id) => {
  const [result] = await pool.execute("DELETE FROM todo WHERE id = ?", [id]);
  return result;
};

exports.checkTypeIdExists = async (type_id) => {
  const [rows] = await pool.execute("SELECT id FROM type WHERE id = ?", [
    type_id,
  ]);
  return rows.length > 0;
};
