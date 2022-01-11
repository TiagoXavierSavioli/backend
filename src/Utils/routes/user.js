const {Router} = require('express')
const AuthController = require('../../Controllers/AuthController')
const UserController = require('../../Controllers/UserController')
const FansController = require('../../Controllers/FansController')
const InformationsController = require('../../Controllers/InformationsController')

const userRouter = Router()

//Auth
userRouter.post('/account/register', AuthController.store)
userRouter.post('/account/login', AuthController.index)
userRouter.get('/verifyExists/:username', AuthController.verifyUserExists)
userRouter.get('/find', AuthController.find)

//App
userRouter.get('/find/:user_id', UserController.findBy)

//Fans
userRouter.post('/user/follow', FansController.store)
userRouter.delete('/user/unfollow/:follow_id/:fan_id', FansController.delete)
userRouter.get('/user/fans/:user_id', FansController.index)

//profile
userRouter.put('/user/informations/update/:user_id', InformationsController.editProfile)
userRouter.put('/user/picture/update/:user_id', UserController.pictureUpload)
userRouter.delete('/user/delete/:user_id', UserController.delete)

module.exports = userRouter