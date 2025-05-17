const todoService = require("../service/todoService");
const { validateTodoInput } = require("../utils/validation");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPaginateTodo = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);
    const result = await todoService.getPaginateTodo(page, limit);
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content, description, type_id, isDone } = req.body;

    const validation = validateTodoInput({
      content,
      description,
      type_id,
      isDone,
    });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const result = await todoService.createTodo(
      content,
      description,
      type_id,
      isDone
    );

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(201).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, description, type_id, isDone } = req.body;

    const validation = validateTodoInput({
      content,
      description,
      type_id,
      isDone,
    });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const result = await todoService.updateTodo(
      id,
      content,
      description,
      type_id,
      isDone
    );

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodo(id);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
