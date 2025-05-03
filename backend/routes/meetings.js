var express = require('express');
var router = express.Router();
const meetingController = require('../controllers/meetingController')
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const { send_message_in_project } = require('../controllers/projectController');
const upload = require('../helpers/multerConfig');


router.get('/', verifyAccessToken, meetingController.fetch_meeting)

router.get('/:meetingId', verifyAccessToken, meetingController.get_meeting_detail_with_Id)

router.post('/create', verifyAccessToken, meetingController.create_meeting)

router.post('/delete', verifyAccessToken, meetingController.delete_meeting_by_id)

router.post('/getMessageHistory', verifyAccessToken, meetingController.get_meeting_chats_history)

router.post('/uploadFileInMeeting', verifyAccessToken, upload.single('file'), meetingController.upload_file)

router.post('/fetchMeetingFiles', verifyAccessToken, meetingController.fetch_meeting_files)

router.post('/deleteMeetingFile', verifyAccessToken, meetingController.delete_meeting_file)


module.exports = router;