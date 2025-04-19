// SOCKET CONNECTION FILE
const jwt = require('jsonwebtoken');
const { client } = require('../database/databaseConnection');

module.exports = (io) => {
    io.use((socket, next) => {
        if (socket.handshake.auth && socket.handshake.auth.token) {
            jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return next(new Error("Authentication Error"));
                socket.decoded = decoded;
                next();
            });
        } else {
            next(new Error("Authentication Error: No token"));
        }
    }).on('connection', (socket) => {
        console.log('User connected', socket.decoded.id);


        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.decoded.id} joined room ${roomId}`);
        })

        socket.on("newMessage", (data) => {
            const { content, meetingId, projectId } = data;
            let roomId;
            let query;
            let values;

            if (projectId) {
                roomId = projectId;
                query = `
                    INSERT INTO message (senderid, messagecontent, projectid, createdat)
                    VALUES ($1, $2, $3, NOW())
                    RETURNING *;
                `;
                values = [socket.decoded.id, content, projectId];
            }
            else if (meetingId) {
                roomId = meetingId;
                query = `
                    INSERT INTO message (senderid, messagecontent, meetingid, createdat)
                    VALUES ($1, $2, $3, NOW())
                    RETURNING *;
                `;
                values = [socket.decoded.id, content, meetingId];
            } else {
                socket.emit("messageError", "No projectId or meetingId provided");
                return;
            }

            client.query(query, values)
                .then(result => {
                    const message = result.rows[0];
                    io.to(roomId).emit("message", {
                        content: message.messagecontent,
                        senderId: message.senderid,
                        projectId: message.projectid,
                        meetingId: message.meetingid,
                        timestamp: message.createdat
                    });
                })
                .catch(err => {
                    console.error("Database error:", err);
                    socket.emit("messageError", "Failed to save message");
                });
        });




        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
