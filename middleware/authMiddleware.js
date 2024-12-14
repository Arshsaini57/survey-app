

// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Get the token from headers

    if (!token) {
        return res.status(401).json({ error: 'Access denied' }); // No token provided
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded user payload to req.user
        console.log('Authenticated user:', req.user); // Log the decoded user payload (useful for debugging)
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err); // Log the error for debugging
        res.status(400).json({ error: 'Invalid token' }); // Token is invalid
    }
};

module.exports = authMiddleware;


// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']; // Retrieve the token from the header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Remove "Bearer " prefix if present
  const bearerToken = token.split(' ')[1]; // Assumes "Bearer <token>"
  
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // If token is valid, attach the decoded user data to the request object
    req.user = decoded;  // Attach user data (e.g., userId) to the request object
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
