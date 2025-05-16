class User {
  constructor({ id, name, password, email }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
  }
}

const userSchema = {
  name: {
    type: "string",
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  email: {
    type: "string",
    required: true,
    maxLength: 255,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: "string",
    required: true,
    minLength: 6,
    maxLength: 255,
  },
};

module.exports = { User, userSchema };
