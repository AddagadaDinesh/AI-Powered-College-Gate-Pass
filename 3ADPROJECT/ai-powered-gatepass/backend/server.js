const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const path = require("path");

const app = express();

// CORS (optional — for development)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/gatekeeper", require("./routes/gatekeeper"));

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));

// SPA fallback route (IMPORTANT FIX for Render)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Port
const PORT = process.env.PORT || 5000;

// Start server + database
(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database connected and synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
