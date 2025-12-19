const { LeaveRequest, User } = require("../models");

// Get all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate("studentId", "name rollNo branch email")
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching leaves" });
  }
};

// Update leave status by faculty
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const leave = await LeaveRequest.findById(id).populate("studentId", "name email");

    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    leave.status = status;
    await leave.save();

    // Notify student (console log for now)
    const student = leave.studentId;
    const studentMessage = `Your leave from ${leave.from_date} to ${leave.to_date} has been ${status}.`;
    console.log(`Notify student ${student.name} (${student.email}): ${studentMessage}`);

    res.json({
      message: `Leave ${status} successfully`,
      studentMessage,
      leave,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
