const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  rollNo: String,
  branch: String,
  role: { type: String, enum: ["student", "faculty", "gatekeeper"] }
});

module.exports = mongoose.model("User", userSchema);
