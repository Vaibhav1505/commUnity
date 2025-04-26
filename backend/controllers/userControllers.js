const bcrypt = require('bcrypt')
const { client } = require('../database/databaseConnection')
const jwt = require("jsonwebtoken")

exports.fetch_users = async function (req, res, next) {

    try {
        const fetchUserQuery = await client.query("SELECT * FROM users")

        res.status(200).json({
            success: "true",
            message: fetchUserQuery.rows.length == 0 ? "There is no User to Fetch" : "Fetch user Successful",
            NumberOfUser: fetchUserQuery.rows.length,
            User: fetchUserQuery.rows.map((user) => ({
                userId: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                phone: user.phone,
                about: user.about,
                role: user.role,
                team: user.team,
                status: user.status
            }))
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: error.message
        })
    }

}

exports.fetch_user_byId = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const searchUserById = await client.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        );

        if (searchUserById.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `User not Found with ID:${userId}`
            })
        }
        return res.status(200).json({
            success: true,
            message: "user Found Successfully",
            userInfo: searchUserById.rows[0]
        })
    } catch (error) {
        console.log("Error finding user with ID:", userId);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Example using Express.js
exports.getUsersInBulk = async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
        return res.status(400).json({ message: "IDs must be an array." });
    }

    try {
        const users = await client.query(
            `SELECT id, firstname, lastname, email FROM users WHERE id = ANY($1)`,
            [ids]
        );

        res.json({ users: users.rows });
    } catch (error) {
        console.error("Error fetching users in bulk:", error);
        res.status(500).json({ message: "Server error fetching users" });
    }
};


exports.user_signup = async function (req, res, next) {
    const { firstName, lastName, phone, email, password } = req.body;
    try {
        const existingUserQuery = await client.query('SELECT * FROM users where email= $1 or phone= $2', [email, phone])

        if (existingUserQuery.rows.length > 0) {
            res.status(409).json({
                success: "false",
                message: "User already exist with email or Phone Number"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const resultQuery = await client.query(
                'INSERT INTO users (firstName, lastName, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [firstName, lastName, phone, email, hashedPassword]
            );
            if (resultQuery.rows.length) {
                res.status(201).json({
                    success: "true",
                    message: "User created successfully",
                    user: resultQuery.rows[0]

                })
            } else {
                console.log("User creation Failed")
                res.status(500).json({
                    message: "Unable to create User"
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: error.message
        })

    }
}


exports.user_signin = async function (req, res, next) {
    try {
        const { identifier, password } = req.body;

        // Await the query to get the user by email or phone
        const existingUserQuery = await client.query(
            'SELECT * FROM users WHERE email = $1 OR phone = $2',
            [identifier, identifier]
        );

        if (existingUserQuery.rows.length === 0) {
            return res.status(404).json({
                success: "false",
                message: "User does not exist"
            });
        }

        const user = existingUserQuery.rows[0];

        const passwordMatched = await bcrypt.compare(password, user.password);

        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname
        }

        if (!passwordMatched) {
            return res.status(401).json({
                success: "false",
                message: "Invalid credentials"
            });
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1y" })


        res.status(200).json({
            success: "true",
            message: "Login successful",
            user: {
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                phone: user.phone,
                email: user.email
            },
            token: accessToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            message: "There was an error logging in the user: " + error.message
        });
    }
};

exports.user_logout = async function (req, res, next) {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    })
    res.status(200).json({
        success: true,
        message: "Logout Successful"
    })
}