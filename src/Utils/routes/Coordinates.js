const {Router} = require('express');
const CoordinatesController = require('../../Controllers/CoordinatesController')

const coordinatesRouter = Router();

coordinatesRouter.get('/coordinates/find', CoordinatesController.index);
coordinatesRouter.post('/coordinates/:user_id/store', CoordinatesController.store);
coordinatesRouter.get('/coordinates/find/proxims', CoordinatesController.findProximUsers);

module.exports = coordinatesRouter