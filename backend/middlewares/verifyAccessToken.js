const jwt = require('jsonwebtoken')

module.exports = async function verifyAccessToken(req, res, next) {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (verifiedToken) {
            req.payload = verifiedToken;
            next();
        } else {
            res.status(400).json({
                status: "Unauthorized",
                message: "Invalid Token"
            })
        }
    } catch (error) {
        console.error("There is an Error in VerifyAccessToken", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }


}