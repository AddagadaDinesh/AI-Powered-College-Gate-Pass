const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// =====================
// Routes
// =====================
app.get("/", (req, res) => {
  res.send("AI Powered Gate Pass Backend Running 🚀");
});

// TODO: Add your routes here
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/student", require("./routes/student"));
// app.use("/api/faculty", require("./routes/faculty"));
// app.use("/api/gatekeeper", require("./routes/gatekeeper"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
