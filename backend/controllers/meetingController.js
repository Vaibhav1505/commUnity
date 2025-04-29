
const { Client } = require('pg');
const { client } = require('../database/databaseConnection');
const upload = require('../helpers/multerConfig');

exports.fetch_meeting = async (req, res, next) => {
    try {

        const fetchEventQuery = await client.query('SELECT * FROM meeting')

        if (fetchEventQuery.rows.length == 0) {
            res.status(404).json({
                success: "true",
                message: "No Events Available"
            })
        } else {
            return res.status(200).json({
                success: 'true',
                message: 'Event retrieved Successfully',
                event: fetchEventQuery.rows.map((event) => ({
                    meeting_id: event.meeting_id,
                    meeting_title: event.meeting_title,
                    meeting_description: event.meeting_description,
                    participants: event.participants,
                    venue: event.venue,
                    hostid: event.hostid,
                    startDate: event.startdate,
                    endDate: event.enddate
                }))
            })
        }
    } catch (error) {
        console.error("Error Loading Events:", error);
        res.status(500).json({
            success: false,
            message: "Error in loading Events",
            error: error.message
        });
    }
}

exports.get_meeting_detail_with_Id = async (req, res, next) => {

    const { meetingId } = req.params;

    if (!meetingId || isNaN(parseInt(meetingId))) {
        res.status(400).json({
            success: false,
            message: "Meeting Id must be a valid integer"
        })
    }

    try {
        const searchMeetingQuery = await client.query("SELECT * FROM meeting WHERE meeting_id=$1", [meetingId]);

        if (searchMeetingQuery.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `Meeting not Found with ID:${meetingId}`
            })
        }
        return res.status(200).json({
            success: true,
            message: "Meeting Found succssfully",
            meetingInfo: searchMeetingQuery.rows[0]
        })
    } catch (error) {
        console.log("No Meeting found with ID ", meetingId)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.create_meeting = async (req, res, next) => {

    const { name, subject, description, venue, participants, startDate, endDate, host } = req.body;

    console.log('Req.body:' + JSON.stringify(req.body))

    const participantsArray = Array.isArray(participants) ? participants : participants.split(',');

    try {
        const createEventQuery = await client.query('INSERT INTO meeting (meeting_title,subject, meeting_description, participants, startDate, endDate, venue, hostid) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
            [name, subject, description, participantsArray, startDate, endDate, venue, host]);

        if (createEventQuery.rows.length > 0) {
            return res.status(200).json({
                success: "true",
                meesage: "Event created Successfully",
                event: createEventQuery.rows[0]
            })
        } else {
            return res.status(500).json({
                success: "false",
                message: "Unable to create Event",
            })
        }
    } catch (error) {
        console.error("Error creating Event:", error);
        res.status(500).json({
            success: false,
            message: "Unable to create Event",
            error: error.message,
        });
    }
}


exports.delete_meeting_by_id = async (req, res, next) => {

    const { meetingId } = req.body

    console.log("MeetingId in backend request:", meetingId)

    if (!meetingId || isNaN(parseInt(meetingId))) {
        return res.status(400).json({
            success: false,
            message: "Meeting Id must be a valid integer"
        })
    }

    try {

        const deleteMeetingQuery = await client.query("DELETE FROM meeting WHERE meeting_id =$1 RETURNING *", [meetingId])

        if (deleteMeetingQuery.rowCount == 0) {
            return res.status(404).json({
                success: false,
                message: "Meeting or Event not Found with ID", meetingId,
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Meeting or Event Successfully Deleted"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Meeting or Event with ID", meetingId,
            error: error.message
        })
    }


}

exports.get_meeting_chats_history = async (req, res, next) => {
    const { meetingId } = req.body;

    try {
        const query = `SELECT * FROM message WHERE meetingid=$1`


        const chatHistoryResponse = await client.query(query, [meetingId]);


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
        console.log("Error in fetching Meeting Chat History", error.message);
        res.status(500).json({
            success: false,
            message: "Error in fetching Chats",
            error: error.message
        })
    }
}

exports.upload_file = async (req, res, next) => {
    try {
        // req.file is already available here because multer middleware is used in the route
        if (!req.file) {
            return res.status(404).json({
                success: false,
                message: "No File Selected"
            });
        }

        const fileUploadQuery = 'INSERT INTO files (filename, uploadedby, projectid, eventid, filepath) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [
            req.file.originalname,
            req.body.userid,
            req.body.projectid || null,
            req.body.eventid,
            req.file.path
        ];

        const query = await client.query(fileUploadQuery, values);

        res.status(200).json({
            success: true,
            message: "File uploaded Successfully",
            file: {
                id: query.rows[0].fileid,
                name: query.rows[0].filename,
                path: query.rows[0].filepath,
                size: req.file.size,
                uploadedAt: query.rows[0].createdat
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in uploading Files: " + error.message
        });
    }
};


exports.fetch_meeting_files = async (req, res, next) => {
    const { meetingId } = req.body;

    try {
        const fetchFileQuery = 'SELECT * FROM files WHERE eventid = $1';
        const values = [meetingId];

        const queryResult = await client.query(fetchFileQuery, values);

        if (queryResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No files found for this meeting"
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
        console.error("Fetch Meeting Files Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Unable to fetch Meeting Files",
            error: error.message
        });
    }
};


exports.delete_meeting_file = async (req, res, next) => {
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
