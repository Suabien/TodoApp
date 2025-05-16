const todoService = require("../service/todoService");

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await todoService.getAllTodo();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const todos = await todoService.getTodo(page, limit);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content, description, type_id, isDone } = req.body;
    const result = await todoService.createTodo(
      content,
      description,
      type_id,
      isDone
    );
    if (!result.status || result.status !== 201) {
      return res
        .status(result.status || 400)
        .json({ message: result.error || result.message });
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
    const result = await todoService.updateTodo(
      id,
      content,
      description,
      type_id,
      isDone
    );
    if (!result.status || result.status !== 200) {
      return res
        .status(result.status || 400)
        .json({ message: result.error || result.message });
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
    if (!result.status || result.status !== 200) {
      return res
        .status(result.status || 400)
        .json({ message: result.error || result.message });
    }
    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
