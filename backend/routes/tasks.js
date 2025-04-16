var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


router.get('/', verifyAccessToken, taskController.fetch_tasks)

router.post('/create', verifyAccessToken, taskController.create_task);

router.post('/addParticipant', verifyAccessToken, taskController.add_participants)

router.post('/delete/', verifyAccessToken, taskController.delete_task_by_id);

router.put('/update/:taskId', verifyAccessToken, taskController.update_status)

// router.put('/updateTaskDetails',taskController.)

module.exports = router;