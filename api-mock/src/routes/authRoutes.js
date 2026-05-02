var express = require("express");
var jwt = require("jsonwebtoken");
var authConfig = require("../auth/authConfig");

var router = express.Router();

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  if (username !== authConfig.demoUser.username || password !== authConfig.demoUser.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  var token = jwt.sign(
    {
      username: authConfig.demoUser.username,
      name: authConfig.demoUser.name
    },
    authConfig.jwtSecret,
    { expiresIn: authConfig.tokenExpiresIn }
  );

  return res.json({
    token: token,
    user: {
      username: authConfig.demoUser.username,
      name: authConfig.demoUser.name
    }
  });
});

module.exports = router;
