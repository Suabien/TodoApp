const todoSchema = {
  id: {
    type: "number",
    required: false,
  },
  content: {
    type: "string",
    required: true,
    maxLength: 255,
  },
  description: {
    type: "string",
    required: false,
  },
  type_id: {
    type: "number",
    required: false,
  },
  isDone: {
    type: "number",
    required: false,
    default: 0,
  },
};

module.exports = { todoSchema };
