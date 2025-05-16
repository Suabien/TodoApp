class Todo {
  constructor({ id, content, description, type_id, isDone }) {
    this.id = id;
    this.content = content;
    this.description = description;
    this.type_id = type_id;
    this.isDone = isDone;
  }
}

module.exports = Todo;
