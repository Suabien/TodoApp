const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers");

router.get("/all", todoController.getAllTodo); // Lấy tất cả todo
router.get("/", todoController.getTodo); // Lấy todo có phân trang: ?page=1&limit=10
router.post("/", todoController.createTodo); // Tạo todo
router.put("/:id", todoController.updateTodo); // Sửa todo
router.delete("/:id", todoController.deleteTodo); // Xoá todo

module.exports = router;