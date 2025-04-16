var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


/* GET users listing. */


router.get('/', verifyAccessToken, userController.fetch_users)

router.post("/bulk", verifyAccessToken, userController.getUsersInBulk);  //helps to fetch users in buly

router.get('/:userId',verifyAccessToken, userController.fetch_user_byId);

router.post('/signup', userController.user_signup)

router.post('/signin', userController.user_signin)

module.exports = router;
