var express = require('express');
var router = express.Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const teamController = require('../controllers/teamController')
const upload = require('../helpers/multerConfig');


router.get('/', verifyAccessToken, teamController.fetch_all_teams);

router.post('/create', verifyAccessToken, teamController.create_team);

module.exports = router;