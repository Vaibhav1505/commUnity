var express = require('express');
var router = express.Router();
const projectController = require('../controllers/projectController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../helpers/multerConfig');


router.get('/', verifyAccessToken, projectController.fetch_project);

router.get('/:projectId', verifyAccessToken, projectController.fetch_project_ById);

router.post('/create', verifyAccessToken, projectController.create_project);

router.post('/getMessageHistory', verifyAccessToken, projectController.get_project_chats_history)

router.post('/uploadedFileInProject', verifyAccessToken, upload.single('file'), projectController.upload_file)

router.post('/fetchProjectFiles',verifyAccessToken,projectController.fetch_project_file)

router.post('/deleteProjectFile',verifyAccessToken,projectController.delete_project_file)


module.exports = router;