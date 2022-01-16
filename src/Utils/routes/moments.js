const {Router} = require('express')
const MomentController = require('../../Controllers/MomentController')
const TagController = require('../../Controllers/TagController')

const momentRouter = Router();

//Moments
momentRouter.get('/moments/:user_id/find', MomentController.index)
momentRouter.post('/moments/:user_id', MomentController.store)
momentRouter.get('/moments/find', MomentController.find) 
momentRouter.put('/moments/picture/update/:user_id/:moment_id', MomentController.pictureUpload)
momentRouter.delete('/moments/delete/:user_id/:moment_id', MomentController.delete)

//Tags
momentRouter.post('tags/:user_id')

//Actions
momentRouter.post('/moments/like/:user_id/:moment_id', MomentController.like)
momentRouter.delete('/moments/dislike/:user_id/:moment_id', MomentController.dislike)
momentRouter.post('/moments/view/:user_id/:moment_id', MomentController.viewed)

module.exports = momentRouter