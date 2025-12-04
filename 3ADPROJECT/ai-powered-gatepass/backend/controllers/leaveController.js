const { LeaveRequest, User } = require("../models");

exports.applyLeave = async (req, res) => {
  try {
    const studentId = req.user.id; // from JWT middleware
    const { from_date, to_date, reason, branch } = req.body;

    if (!from_date || !to_date || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const student = await User.findByPk(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const leave = await LeaveRequest.create({
      studentId,
      branch: branch || student.branch,
      from_date,
      to_date,
      reason,
    });

    res.json({ message: "Leave request submitted successfully", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
