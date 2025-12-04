// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateUser = (allowedRole) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized: No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: "Unauthorized: Invalid token" });

    // allow if role matches or if allowedRole is an array include user's role
    if (Array.isArray(allowedRole)) {
      if (!allowedRole.includes(user.role)) return res.status(403).json({ error: "Forbidden: Invalid role" });
    } else {
      if (user.role !== allowedRole) return res.status(403).json({ error: "Forbidden: Invalid role" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

exports.authenticateStudent = authenticateUser("student");
exports.authenticateFaculty = authenticateUser("faculty");
exports.authenticateAdmin = authenticateUser("admin");
exports.authenticateGatekeeper = authenticateUser("gatekeeper");

// helper to accept any authenticated user
exports.authenticateAny = authenticateUser([]);
