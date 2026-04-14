const jwt = require('jsonwebtoken');

// Helper function to extract token from Authorization header
const getToken = (req) => {
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  return null;
};

// Helper function to verify JWT token
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Main authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from request
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({
        message: 'Access denied. No token provided.'
      });
    }

    // Verify the token
    const decoded = verifyJWT(token);

    // Attach user information to request object
    req.user = decoded;

    // Proceed to next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Access denied. Invalid token.'
    });
  }
};

module.exports = authMiddleware;