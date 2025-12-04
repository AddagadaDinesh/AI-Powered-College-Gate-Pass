// backend/routes/gatekeeper.js
const express = require("express");
const router = express.Router();
const gatekeeperController = require("../controllers/gatekeeperController");
const authController = require("../controllers/authController");
const { authenticateGatekeeper } = require("../middleware/authMiddleware");

// Registration & login for gatekeeper (public)
router.post("/register", authController.registerGatekeeper);
router.post("/login", authController.loginGatekeeper);

// Protected scan endpoint (gatekeeper must be authenticated)
router.post("/scan", authenticateGatekeeper, gatekeeperController.scanQr);

// Recent logs
router.get("/scans", authenticateGatekeeper, gatekeeperController.listScans);

module.exports = router;
