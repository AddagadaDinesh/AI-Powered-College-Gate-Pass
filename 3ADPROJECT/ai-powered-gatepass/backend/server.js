const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and auth headers
  })
);

// Parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/gatekeeper", require("./routes/gatekeeper"));

const PORT = process.env.PORT || 5000;

// Sequelize sync and server start
(async () => {
  try {
    // Use alter:true in development to automatically adjust tables
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database connected and synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
