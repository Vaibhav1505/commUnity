var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


/* GET users listing. */


router.get('/', verifyAccessToken, userController.fetch_users)

router.post("/bulk", verifyAccessToken, userController.getUsersInBulk);

router.get('/:userId',verifyAccessToken, userController.fetch_user_byId);

router.post('/signup', userController.user_signup)

router.post('/signin', userController.user_signin)

router.post('/logout',verifyAccessToken,userController.user_logout);

module.exports = router;
