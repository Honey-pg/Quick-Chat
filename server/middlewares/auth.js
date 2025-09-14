const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Middleware to protect routes using JWT sent via header 'token' or 'Authorization: Bearer <token>'
exports.protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const headerToken = req.headers.token;
    const token = headerToken || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};