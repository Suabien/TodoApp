const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers");

router.get("/all", todoController.getAllTodos); // Get all todos
router.get("/todos", todoController.getPaginateTodo); // Get todos with pagination (?page=1&limit=10)
router.post("/create", todoController.createTodo); // Create a new todo
router.put("/update/:id", todoController.updateTodo); // Update a todo by id
router.delete("/delete/:id", todoController.deleteTodo); // Delete a todo by id

module.exports = router;
