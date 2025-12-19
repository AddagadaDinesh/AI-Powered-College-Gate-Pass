const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from_date: { type: Date, required: true },
    to_date: { type: Date, required: true },
    reason: { type: String, required: true },
    branch: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    qr_token: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
