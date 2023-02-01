import express from 'express';

import { signin, signup, googleSignIn, refresh, logout } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/signin', signin);
userRoute.post('/signup', signup);
userRoute.post("/googleSignIn", googleSignIn);
userRoute.get('/refresh', refresh)
userRoute.post('/logout', logout)

export default userRoute;