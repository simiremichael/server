import express from 'express';

import { signin, signup, refresh, logout } from '../controllers/companyController.js';

const companyRoute = express.Router();

companyRoute.post('/signin', signin);
companyRoute.post('/signup', signup);
companyRoute.get('/refresh', refresh)
companyRoute.post('/logout', logout)

export default companyRoute;