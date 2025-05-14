const http = require("http");
const fs = require("fs");
const path = require("path");
const connection = require("./mysql");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    // Đọc file HTML và gửi về
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.url === "/login" && req.method === "POST") {
    // Xử lý login
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      const query = "SELECT * FROM user WHERE name = ? AND password = ?";
      connection.query(query, [username, password], (err, results) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }
        if (results.length > 0) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Login successful" }));
        } else {
          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Invalid credentials" }));
        }
      });
    });
  } else if (req.url === "/signup" && req.method === "POST") {
    // Xử lý signup
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, email, password } = JSON.parse(body);
      const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      connection.query(query, [username, email, password], (err, results) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Signup successful" }));
      });
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
