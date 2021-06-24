const {Router} = require('express');
const AuthController = require('../Controllers/AuthController');
const UserController = require('../Controllers/UserController');
const CoordinatesController = require('../Controllers/CoordinatesController');

const router = Router();

//Auth
router.post('/account/register', AuthController.createAccount);
router.get('/account/login', AuthController.login);
router.get('/verifyExists/:username', AuthController.verifyUserExists);

//User
router.get('/user/findid/:id', UserController.findUserById);
router.get('/user/find/:username', UserController.findUser);
router.post('/user/follow', UserController.followUser);
router.delete('/user/unfollow', UserController.unfollowUser);
router.get('/user/followings/:id', UserController.listFollowings);
router.get('/user/fans/:id', UserController.listFans);
router.get('/user/list/follows', UserController.listAllfollows);

//Coordinates
router.post('/coordinates/send', CoordinatesController.SendLocation);
router.get('/coordinates/list/all', CoordinatesController.ListLocation);
router.get('/coordinates/list/proxims', CoordinatesController.ListProximLocations);


module.exports = router;