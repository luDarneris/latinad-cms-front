var jwt = require("jsonwebtoken");
var authConfig = require("../auth/authConfig");

function authMiddleware(req, res, next) {
  var authHeader = req.headers.authorization;
  var token;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  if (authHeader.indexOf("Bearer ") !== 0) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  token = authHeader.replace("Bearer ", "").trim();

  try {
    req.user = jwt.verify(token, authConfig.jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
