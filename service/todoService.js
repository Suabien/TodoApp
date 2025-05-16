const todoRepo = require("../repository/todoRepository");

exports.getAllTodo = async () => {
  return await todoRepo.getAllTodo();
};

exports.getTodo = async (page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);
  const offset = (page - 1) * limit;
  return await todoRepo.getTodo(limit, offset);
};

exports.createTodo = async (content, description, type_id, isDone) => {
  if (!content) return { status: 400, error: "Content is required" };
  if (type_id) {
    const typeExists = await todoRepo.checkTypeIdExists(type_id);
    if (!typeExists) return { status: 400, error: "Type_id does not exist" };
  }
  try {
    await todoRepo.createTodo(content, description, type_id, isDone ?? 0);
    return { status: 201, message: "Todo created" };
  } catch (err) {
    return { status: 500, error: "Database error" };
  }
};

exports.updateTodo = async (id, content, description, type_id, isDone) => {
  try {
    const result = await todoRepo.updateTodo(
      id,
      content,
      description,
      type_id,
      isDone
    );
    if (result.affectedRows === 0) {
      return { status: 404, error: "Todo not found" };
    }
    return { status: 200, message: "Todo updated" };
  } catch (err) {
    return { status: 500, error: "Database error" };
  }
};

exports.deleteTodo = async (id) => {
  try {
    const result = await todoRepo.deleteTodo(id);
    if (result.affectedRows === 0) {
      return { status: 404, error: "Todo not found" };
    }
    return { status: 200, message: "Todo deleted" };
  } catch (err) {
    return { status: 500, error: "Database error" };
  }
};
