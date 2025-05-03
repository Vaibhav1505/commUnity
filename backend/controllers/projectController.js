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

    const assignedToArray = Array.isArray(assigned_to) && assigned_to.length > 0
        ? assigned_to.map(Number)
        : [id];

    const insertQuery = `INSERT INTO projects 
    (project_title,
    project_description,
    assigned_to,
    completion
    ,status,
    budget,
    startdate,
    enddate) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [project_title,
        project_company,
        assignedToArray,
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
            return res.status(404).json({
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

exports.upload_file = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(404).json({
                success: false,
                message: "No File Selected"
            });
        }

        
            const { userid, projectid } = req.body;

            const fileUploadQuery = 'INSERT INTO files (filename, uploadedby, projectid, eventid, filepath) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [
                req.file.originalname,
                userid,
                projectid,
                null,
                req.file.path
            ];

            const result = await client.query(fileUploadQuery, values);

            res.status(200).json({
                success: true,
                message: "File uploaded Successfully",
                file: {
                    id: result.rows[0].fileid,
                    name: result.rows[0].filename,
                    path: result.rows[0].filepath,
                    size: req.file.size,
                    uploadedAt: result.rows[0].createdat
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Error in uploading Files: " + error.message
            });
        }
    };



exports.fetch_project_file = async (req, res, next) => {
    const { projectId } = req.body;

    try {
        const fetchFileQuery = 'SELECT * FROM files WHERE projectid = $1';
        const values = [projectId];

        const queryResult = await client.query(fetchFileQuery, values);

        if (queryResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No files found for this project"
            });
        }

        res.status(200).json({
            success: true,
            message: "Files fetched successfully",
            files: queryResult.rows.map((file) => ({
                id: file.fileid,
                name: file.filename,
                uploadedBy: file.uploadedby,
                createdAt: file.createdat,
                filePath: file.filepath
            }))
        });
    } catch (error) {
        console.error("Fetch Project Files Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Unable to fetch Project Files",
            error: error.message
        });
    }
};


exports.delete_project_file = async (req, res, next) => {
    try {
        const { fileId } = req.body;
        if (!fileId) {
            return res.status(400).json({ success: false, message: "fileId is required" });
        }

        const deleteQuery = 'DELETE FROM files WHERE fileid = $1 RETURNING *';
        const result = await client.query(deleteQuery, [fileId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        return res.status(200).json({ success: true, message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message,
        });
    }
};
