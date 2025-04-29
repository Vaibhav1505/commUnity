const jwt = require('jsonwebtoken');

module.exports = async function verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing or malformed"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = verifiedToken;
        next();
    } catch (error) {
        console.error("JWT Verify Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
