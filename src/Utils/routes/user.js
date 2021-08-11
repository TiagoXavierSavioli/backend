const {Router} = require('express');
const AuthController = require('../../Controllers/AuthController');

const userRouter = Router();

//Auth
userRouter.post('/account/register', AuthController.store);
userRouter.post('/account/login', AuthController.index);
userRouter.get('/verifyExists/:username', AuthController.verifyUserExists);
userRouter.get('/find', AuthController.find);

module.exports = userRouter