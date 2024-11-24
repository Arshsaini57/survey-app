

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



module.exports = authMiddleware;
