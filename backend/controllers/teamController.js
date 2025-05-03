const bcrypt = require('bcrypt')
const { client } = require('../database/databaseConnection')
const jwt = require("jsonwebtoken")

exports.create_team = async (req, res, next) => {
    const { name, description, } = req.body;

    try {

        const creationQuery = `INSERT INTO team (teamname, teamdescription) VALUES ($1, $2) RETURNING *`
        const creationValues = [name, description];

        const queryResult = await client.query(creationQuery, creationValues);

        if (queryResult.rows.length) {
           return res.status(200).json({
                success: true,
                message: "Team Created",
                teamData: queryResult.rows[0]
            })
        } else {
           return res.status(500).json({
                success: false,
                message: "Unable to create Team"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errorMessage: error.message
        })
    }

}

exports.fetch_all_teams = async (req, res, next) => {
    try {
        const searchTeamQuery = await client.query(`SELECT * FROM team`)

        if (searchTeamQuery.rows.length == 0) {
           return res.status(404).json({
                success: false,
                message: "No Team Found"
            })
        }

       return res.status(200).json({
            success: true,
            message: "Team Fetched successfully",
            teamData: searchTeamQuery.rows.map((team) => ({
                id: team.teamid,
                name: team.teamname,
                description: team.teamdescription,
                hostedBy: team.hostedby,
                status: team.status,
                participants: team.members

            }))
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            messaeg: "Unable to fetch Teams",
            errorMessage: error.message
        })
    }
}