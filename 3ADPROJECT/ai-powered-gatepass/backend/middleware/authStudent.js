    const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateStudent = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await User.findByPk(decoded.id); // use id from token
    if (!student) {
      return res.status(401).json({ error: 'Unauthorized: Student not found' });
    }

    req.user = student; // attach student info to request
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateStudent;
