var express = require("express");
var cors = require("cors");
var authRoutes = require("./routes/authRoutes");
var contentRoutes = require("./routes/contentRoutes");
var authMiddleware = require("./middleware/authMiddleware");

var app = express();
var port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", function (req, res) {
  res.json({ ok: true, service: "latinad-cms-mock-api" });
});

app.use("/auth", authRoutes);
app.use("/api", authMiddleware, contentRoutes);

app.use(function (req, res) {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, function () {
  console.log("Mock API running on http://localhost:" + port);
});
