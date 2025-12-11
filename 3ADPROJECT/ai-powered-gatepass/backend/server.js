const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const path = require("path");

const app = express();

// CORS (for development – you can remove this after deployment)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/gatekeeper", require("./routes/gatekeeper"));

// 👉 Serve React build folder (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "build")));

// 👉 Handle any other route (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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
