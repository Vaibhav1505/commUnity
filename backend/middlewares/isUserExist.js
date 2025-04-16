const { Client } = require('pg');
const { client } = require('../database/databaseConnection');


module.exports = async function isUserExist(req, res, next) {
    const { userId } = req.payload;
    const { emails } = req.body;
    try {
        const existedUser = await client.query("SELECT * FROM users WHERE emails =ANY($1)", [emails]);

        if (existedUser.length === 0) {
            res.status(404).json({
                success: false,
                message: "No users are found with these emails"
            })
        } else {
            console.log("Users Found:", existedUser.map(user => user.emails));
            next();
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: error.message
        })
    }
}