var express = require('express');
var router = express.Router();
const projectController = require('../controllers/projectController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


router.get('/', verifyAccessToken, projectController.fetch_project);

router.get('/:projectId', verifyAccessToken, projectController.fetch_project_ById);

router.post('/create', verifyAccessToken, projectController.create_project);

router.post('/getMessageHistory', verifyAccessToken, projectController.get_project_chats_history)


module.exports = router;