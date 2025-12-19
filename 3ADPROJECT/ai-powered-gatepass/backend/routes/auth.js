// backend/routes/auth.js
const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  registerFaculty,
  loginFaculty,
  registerGatekeeper,
  loginGatekeeper
} = require("../controllers/authController");

// COMMON REGISTER
router.post("/register", (req, res) => {
  const { role } = req.body;
  if (role === "student") return registerStudent(req, res);
  return res.status(400).json({ message: "Invalid role" });
});

// FACULTY REGISTER
router.post("/faculty-register", registerFaculty);

// GATEKEEPER REGISTER
router.post("/gatekeeper-register", registerGatekeeper);

// COMMON LOGIN
router.post("/login", (req, res) => {
  const { role } = req.body;
  if (role === "student") return loginStudent(req, res);
  return res.status(400).json({ message: "Invalid role" });
});

// FACULTY LOGIN
router.post("/faculty-login", loginFaculty);

// GATEKEEPER LOGIN
router.post("/gatekeeper-login", loginGatekeeper);

module.exports = router;
