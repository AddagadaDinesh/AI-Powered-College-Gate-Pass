const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  registerFaculty,
  loginFaculty,
  registerGatekeeper,  // ✅ add this
  loginGatekeeper,      // ✅ add this too
} = require("../controllers/authController");

// Student routes
router.post("/student-register", registerStudent);
router.post("/student-login", loginStudent);

// Faculty routes
router.post("/faculty-register", registerFaculty);
router.post("/faculty-login", loginFaculty); // use destructured function

// Existing Student & Faculty routes...

// Gatekeeper routes
router.post("/gatekeeper-register",registerGatekeeper);
router.post("/gatekeeper-login", loginGatekeeper);

module.exports = router;
