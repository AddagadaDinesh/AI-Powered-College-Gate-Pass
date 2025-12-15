const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const path = require("path");

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// JSON parsing
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/gatekeeper", require("./routes/gatekeeper"));

// =======================
// SERVE REACT FRONTEND
// =======================
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../frontend/build/index.html')
  );
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connected and synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
