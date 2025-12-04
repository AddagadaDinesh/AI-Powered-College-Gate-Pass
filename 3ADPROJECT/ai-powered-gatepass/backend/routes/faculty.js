const express = require("express");
const router = express.Router();
const { getAllLeaves, updateLeaveStatus } = require("../controllers/facultyController");
const { authenticateFaculty } = require("../middleware/authMiddleware");

// Get all leave requests
router.get("/leaves", authenticateFaculty, getAllLeaves);

// Update leave status (approve/reject) and notify student
router.put("/leave/:id", authenticateFaculty, updateLeaveStatus);

module.exports = router;
