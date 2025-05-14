require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json()); // Middleware parse JSON

// Các route auth
app.use("/api/auth", authRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
