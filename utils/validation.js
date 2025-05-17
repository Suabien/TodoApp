const { todoSchema } = require("../models/todoModels");

function validateTodoInput(data) {
  for (const key in todoSchema) {
    const rule = todoSchema[key];
    const value = data[key];

    if (rule.type === "string" && value && typeof value !== "string") {
      return { valid: false, message: `${key} must be a string` };
    }

    if (
      rule.type === "number" &&
      value !== undefined &&
      value !== null &&
      isNaN(Number(value))
    ) {
      return { valid: false, message: `${key} must be a number` };
    }

    if (
      key === "isDone" &&
      value !== undefined &&
      value !== null &&
      !(value === 0 || value === 1)
    ) {
      return { valid: false, message: "isDone must be 0 or 1" };
    }
  }

  return { valid: true };
}

module.exports = { validateTodoInput };
