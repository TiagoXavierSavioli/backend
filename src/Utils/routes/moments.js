const {Router} = require('express');
const MomentController = require('../../Controllers/MomentController')
const TagController = require('../../Controllers/TagController')

const momentRouter = Router();

//Moments
momentRouter.get('/moments/:user_id/find', MomentController.index);
momentRouter.post('/moments/:user_id', MomentController.store);

//Tags
momentRouter.post('tags/:user_id')

module.exports = momentRouter