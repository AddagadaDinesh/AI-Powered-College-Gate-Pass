const jwt = require("jsonwebtoken");
const { User } = require("../models");

// General authentication middleware
const authenticateUser = (role) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user || user.role !== role) {
      return res.status(403).json({ error: "Forbidden: Invalid user role" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Specific middlewares
exports.authenticateStudent = authenticateUser("student");
exports.authenticateFaculty = authenticateUser("faculty");
exports.authenticateAdmin = authenticateUser("admin");
