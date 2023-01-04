import express from 'express';
import { getPropertyBySearch, getProperties, createProperty, updateProperty, deleteProperty, getProperty, getPropertyByAgent, companyPropertySearch, getPropertyBySearchByBuy, getPropertyBySearchByRent } from '../controllers/propertyController.js';
import companyAuth from '../middleware/companyAuth.js';
import agentAuth from '../middleware/agentAuth.js';
import userAuth from '../middleware/userAuth.js';

//agentAuth,
const propertyRoute = express.Router();

propertyRoute.get('/search', getPropertyBySearch);
propertyRoute.get('/buy', getPropertyBySearchByBuy);
propertyRoute.get('/rent', getPropertyBySearchByRent);
propertyRoute.get('/', getProperties);
propertyRoute.post('/', agentAuth, createProperty);
propertyRoute.get('/:id', getProperty );
propertyRoute.patch('/:id', agentAuth, updateProperty);
propertyRoute.delete('/:id',  agentAuth, deleteProperty);
propertyRoute.get('/agentProperties/:id', agentAuth, getPropertyByAgent);
propertyRoute.get('/adminHomepage/propertyList/:id', companyPropertySearch);
// propertyRoute.get('/searches/:id', companyPropertySearch);
export default propertyRoute; 