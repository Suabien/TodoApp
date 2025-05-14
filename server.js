require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

// Middleware parse JSON
app.use(express.json());

// Các route auth
app.use("/api/auth", authRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
