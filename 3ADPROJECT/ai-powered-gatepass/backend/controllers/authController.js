// backend/controllers/authController.js
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Student registration/login (existing)
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, rollNo, branch } = req.body;
    if (!name || !email || !password || !rollNo) return res.status(400).json({ error: "Missing required fields" });

    if (await User.findOne({ where: { email } })) return res.status(400).json({ error: "Email exists" });
    if (rollNo && (await User.findOne({ where: { rollNo } }))) return res.status(400).json({ error: "Roll no exists" });

    const newUser = await User.create({ name, email, password, rollNo, branch, role: "student" });
    const token = createToken(newUser);

    res.status(201).json({ message: "Student registered", token, user: { id: newUser.id, name: newUser.name, email: newUser.email, rollNo: newUser.rollNo, branch: newUser.branch } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: "student" } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    const token = createToken(user);
    res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, rollNo: user.rollNo, branch: user.branch } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Faculty registration/login (existing)
exports.registerFaculty = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    if (await User.findOne({ where: { email } })) return res.status(400).json({ error: "Email exists" });

    const newUser = await User.create({ name, email, password, role: "faculty" });
    res.status(201).json({ message: "Faculty registered", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: "faculty" } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    const token = createToken(user);
    res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Gatekeeper registration/login
exports.registerGatekeeper = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    if (await User.findOne({ where: { email } })) return res.status(400).json({ error: "Email exists" });

    const newUser = await User.create({ name, email, password, role: "gatekeeper" });
    res.status(201).json({ message: "Gatekeeper registered", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginGatekeeper = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: "gatekeeper" } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    const token = createToken(user);
    res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
