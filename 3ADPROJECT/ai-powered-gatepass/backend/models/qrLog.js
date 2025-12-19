const mongoose = require("mongoose");

const qrLogSchema = new mongoose.Schema({
  qr_token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leaveId: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest", required: true },
  scanned_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QRLog", qrLogSchema);
