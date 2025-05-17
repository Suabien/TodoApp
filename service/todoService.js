const todoRepo = require("../repository/todoRepository");
const { validateTodoInput } = require("../utils/validation");

exports.getAllTodos = async () => {
  return await todoRepo.getAllTodos();
};

exports.getPaginateTodo = async (page, limit) => {
  page = Number(page);
  limit = Number(limit);
  if (isNaN(page) || page < 1) {
    return { status: 400, message: "Invalid page value" };
  }
  if (isNaN(limit) || limit < 1) {
    return { status: 400, message: "Invalid limit value" };
  }
  const offset = (page - 1) * limit;
  const todos = await todoRepo.getPaginateTodo(limit, offset);
  return { status: 200, data: todos, page, limit };
};

exports.createTodo = async (content, description, type_id, isDone) => {
  const validation = validateTodoInput({
    content,
    description,
    type_id,
    isDone,
  });
  if (!validation.valid) return { status: 400, message: validation.message };

  if (type_id) {
    const typeExists = await todoRepo.findTypeById(type_id);
    if (!typeExists) return { status: 400, message: "Type_id does not exist" };
  }
  try {
    await todoRepo.createTodo(content, description, type_id, isDone ?? 0);
    return { status: 201, message: "Todo created" };
  } catch (err) {
    return { status: 500, message: "Database error" };
  }
};

exports.updateTodo = async (id, content, description, type_id, isDone) => {
  const validation = validateTodoInput({
    content,
    description,
    type_id,
    isDone,
  });
  if (!validation.valid) return { status: 400, message: validation.message };

  const todo = await todoRepo.getTodoById(id);
  if (!todo) {
    return { status: 404, message: "Todo not found" };
  }
  if (type_id) {
    const typeExists = await todoRepo.findTypeById(type_id);
    if (!typeExists) {
      return { status: 400, message: "Type_id does not exist" };
    }
  }
  try {
    await todoRepo.updateTodo(id, content, description, type_id, isDone);
    return { status: 200, message: "Todo updated" };
  } catch (err) {
    return { status: 500, message: "Database error" };
  }
};

exports.deleteTodo = async (id) => {
  const todo = await todoRepo.getTodoById(id);
  if (!todo) {
    return { status: 404, message: "Todo not found" };
  }
  try {
    await todoRepo.deleteTodo(id);
    return { status: 200, message: "Todo deleted" };
  } catch (err) {
    return { status: 500, message: "Database error" };
  }
};
