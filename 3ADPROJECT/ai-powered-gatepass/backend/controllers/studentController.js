const { LeaveRequest } = require("../models"); // Assuming you have a LeaveRequest model
const { User } = require("../models");

// Submit leave request
exports.submitLeave = async (req, res) => {
  try {
    const { from_date, to_date, reason, branch } = req.body;

    if (!from_date || !to_date || !reason || !branch) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create leave request
    const leave = await LeaveRequest.create({
      studentId: req.user.id,
      from_date,
      to_date,
      reason,
      branch,
      status: "pending",
      qr_token: null,
    });

    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while submitting leave" });
  }
};

// Get all leaves for student
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.findAll({
      where: { studentId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ leaves });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching leaves" });
  }
};
