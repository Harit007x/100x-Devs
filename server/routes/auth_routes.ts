import express from 'express';
import { authController } from '../controllers/auth_contoller';

export const authRouter = express.Router()

// todo controller
const {
    signUp,
    login,
} = authController;

authRouter.post('/signup', signUp)
authRouter.post('/login', login)