const pool = require("../config/db");

exports.getAllTodos = async () => {
  const [rows] = await pool.execute("SELECT * FROM todo");
  return rows;
};

exports.getPaginateTodo = async (limit, offset) => {
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);
  const [rows] = await pool.execute(
    `SELECT * FROM todo LIMIT ${limit} OFFSET ${offset}`
  );
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

exports.findTypeById = async (type_id) => {
  const [rows] = await pool.execute("SELECT * FROM type WHERE id = ?", [
    type_id,
  ]);
  return rows.length > 0;
};

exports.getTodoById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM todo WHERE id = ?", [id]);
  return rows[0];
};

exports.countTodos = async () => {
  const [rows] = await pool.execute("SELECT COUNT(*) as total FROM todo");
  return rows[0].total;
};
