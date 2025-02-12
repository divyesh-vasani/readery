const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwtToken; // Read token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! No token found." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user data to request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};

module.exports = authMiddleware;
