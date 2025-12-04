const { LeaveRequest, User } = require("../models");

// Get all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.findAll({
      include: { model: User, as: "user", attributes: ["name", "rollNo", "branch", "email"] },
      order: [["createdAt", "DESC"]],
    });

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

    const leave = await LeaveRequest.findByPk(id, {
      include: { model: User, as: "user", attributes: ["name", "email"] },
    });

    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    leave.status = status;
    await leave.save();

    // Notify student (console log for now)
    const student = leave.user;
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
