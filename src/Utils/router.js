const {Router} = require('express');
const AuthController = require('../Controllers/AuthController');
const UserController = require('../Controllers/UserController');
const CoordinatesController = require('../Controllers/CoordinatesController');
const UserAuthentication = require('../middlewares/UserAuthentication')

const router = Router();

//Auth
router.post('/account/register', AuthController.createAccount);
router.post('/account/login', AuthController.login);
router.get('/verifyExists/:username', AuthController.verifyUserExists);

//User
router.get('/user/findid/:id',UserAuthentication, UserController.findUserById);
router.get('/user/find/:username', UserAuthentication,  UserController.findUser);
router.post('/user/follow',UserAuthentication, UserController.followUser);
router.delete('/user/unfollow',UserAuthentication, UserController.unfollowUser);
router.get('/user/followings/:id',UserAuthentication, UserController.listFollowings);
router.get('/user/fans/:id',UserAuthentication, UserController.listFans);
router.get('/user/fans/search/:id/:username',UserAuthentication, UserController.searchFans);
router.get('/user/followings/search/:id/:username',UserAuthentication, UserController.searchFollowings);
router.get('/user/list/follows', UserController.listAllfollows);

//Coordinates
router.post('/coordinates/send',UserAuthentication, CoordinatesController.SendLocation);
router.get('/coordinates/list/all', CoordinatesController.ListLocation);
router.get('/coordinates/list/proxims',UserAuthentication, CoordinatesController.ListProximLocations);


module.exports = router