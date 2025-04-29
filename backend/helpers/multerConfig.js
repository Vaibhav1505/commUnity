// multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const meetingFilesDir = './uploads/meeting-files';
const projectFilesDir = './uploads/project-files';

// Create directories if they don't exist
if (!fs.existsSync(meetingFilesDir)) {
    fs.mkdirSync(meetingFilesDir, { recursive: true });
}
if (!fs.existsSync(projectFilesDir)) {
    fs.mkdirSync(projectFilesDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if it's a meeting file or project file
        const folder = req.body.eventid ? meetingFilesDir : projectFilesDir;
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        // Create a unique filename while preserving the original extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Create and export the multer middleware directly
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // 50MB limit
    }
});

module.exports = upload;
