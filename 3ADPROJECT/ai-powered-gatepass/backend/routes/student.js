const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { authenticateStudent } = require("../middleware/auth");

// Apply leave
router.post("/leave", authenticateStudent, studentController.submitLeave);

// Get my leaves
router.get("/leaves", authenticateStudent, studentController.getLeaves);

module.exports = router;
