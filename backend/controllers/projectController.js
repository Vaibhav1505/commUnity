const { Client } = require('pg');
const { client } = require('../database/databaseConnection');

exports.fetch_project = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM projects');

        return res.status(200).json({
            success: true,
            message: rows.length ? "Projects retrieved successfully." : "No projects found.",
            projects: rows.map(project => ({
                projectId: project.project_id,
                title: project.project_title,
                company: project.project_company,
                completion: project.completion,
                assignedTo: project.assigned_to,
                status: project.status,
                startDate: project.startdate,
                endDate: project.enddate,
                budget: project.budget
            }))
        });
    } catch (error) {
        console.error("Error fetching all projects:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching projects.",
            error: error.message
        });
    }
};


exports.fetch_project_ById = async (req, res) => {
    const { projectId } = req.params;

    try {
        const { rows, rowCount } = await client.query("SELECT * FROM projects WHERE project_id = $1", [projectId]);

        if (rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `No project found with ID: ${projectId}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Project found with ID: ${projectId}`,
            project: rows[0]
        });
    } catch (error) {
        console.error(`Error fetching project by ID (${projectId}):`, error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching project by ID.",
            error: error.message
        });
    }
};


exports.create_project = async (req, res, next) => {
    const { id } = req.payload;

    const {
        project_title,
        project_company,
        assigned_to = [],
        completion,
        status,
        budget,
        startdate,
        enddate
    } = req.body;

    const insertQuery = `INSERT INTO projects 
    (project_title,
    project_description,
    assign_to,
    completion
    ,status,
    budget,
    startdate,
    enddate) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [project_title,
        project_company,
        assigned_to = [],
        completion,
        status,
        budget,
        startdate,
        enddate];

    try {
        const { rows } = await client.query(insertQuery, values)

        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            project: rows[0]
        });
    } catch (error) {
        console.error("Error in Creating Project");
        res.status(500).json({
            success: true,
            message: "Error in creating Project",
            error: error.message
        })
    }
}

exports.get_project_chats_history = async (req, res, next) => {
    const { projectId } = req.body;

    try {
        const query = `SELECT * FROM message WHERE projectid=$1`


        const chatHistoryResponse = await client.query(query, [projectId]);


        if (chatHistoryResponse.rows.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No Chat Fonud"
            })
        }
        res.status(200).json({
            success: true,
            message: "Messages retrieved successful",
            messages: chatHistoryResponse.rows.map((message) => ({
                content: message.messagecontent,
                senderId: message.senderid,
                createdat: message.createdat
            }))
        })
    } catch (error) {
        console.log("Error in fetching Project Chat History", error.message);
        res.status(404).json({
            success: false,
            message: "Error in fetching Chats",
            error: error.message
        })
    }
}


