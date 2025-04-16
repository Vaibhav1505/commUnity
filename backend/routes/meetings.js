var express = require('express');
var router = express.Router();
const meetingController = require('../controllers/meetingController')
const verifyAccessToken = require('../middlewares/verifyAccessToken');


router.get('/', verifyAccessToken, meetingController.fetch_meeting)

router.get('/:meetingId', verifyAccessToken, meetingController.get_meeting_detail_with_Id)

router.post('/create', verifyAccessToken, meetingController.create_meeting)

router.post('/delete', verifyAccessToken, meetingController.delete_meeting_by_id)

module.exports = router;