import express from 'express';
import { signin, signup, refresh, logout, getAgentCompany, updateAgent ,deleteAgent, getAgent} from '../controllers/agentController.js';
import companyAuth from '../middleware/companyAuth.js';

const agentRoute = express.Router();

agentRoute.post('/signin', signin);
agentRoute.post('/signup', companyAuth, signup);
agentRoute.get('/refresh', refresh);
agentRoute.post('/logout', logout);
agentRoute.get('/:id', getAgent);
agentRoute.patch('/:id',   companyAuth, updateAgent);
agentRoute.delete('/:id',  companyAuth, deleteAgent);
agentRoute.get('/agentCompany/:id', getAgentCompany );


export default agentRoute;

// companyAuth,