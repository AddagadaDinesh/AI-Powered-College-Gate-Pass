// backend/controllers/gatekeeperController.js
const { LeaveRequest, User, QRLog } = require("../models");

exports.scanQr = async (req, res) => {
  try {
    const { qr_token } = req.body;
    if (!qr_token) return res.status(400).json({ error: "qr_token required" });

    // Find leave request by qr_token with user
    const leave = await LeaveRequest.findOne({
      where: { qr_token },
      include: [{ model: User, as: "user", attributes: ["id", "name", "email", "rollNo", "branch"] }],
    });

    if (!leave) return res.status(404).json({ error: "Invalid QR" });

    // Check status and expiry
    if (leave.status !== "approved") {
      return res.status(403).json({ error: `Leave not approved (status: ${leave.status})` });
    }
    if (leave.expires_at && new Date(leave.expires_at) < new Date()) {
      return res.status(403).json({ error: "QR token expired" });
    }

    // Log the scan (leaveId and student userId)
    await QRLog.create({
      qr_token,
      userId: leave.studentId,
      leaveId: leave.id,
    });

    // Return leave + student details (to show on gatekeeper UI)
    res.json({
      message: "QR valid",
      leave: {
        id: leave.id,
        from_date: leave.from_date,
        to_date: leave.to_date,
        reason: leave.reason,
        status: leave.status,
        qr_token: leave.qr_token,
        expires_at: leave.expires_at,
      },
      student: leave.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during QR scan" });
  }
};

// Optionally list recent scans (for gatekeeper dashboard)
exports.listScans = async (req, res) => {
  try {
    const logs = await QRLog.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "rollNo"] },
        { model: LeaveRequest, as: "leave", attributes: ["id", "from_date", "to_date", "status"] },
      ],
      order: [["scanned_at", "DESC"]],
      limit: 100,
    });
    res.json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
