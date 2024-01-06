// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user_model';
import * as dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: any; // Add user property to Request
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {

  // Get the token from the cookie
  const token = req.cookies['access_token'];    
  const refreshToken = req.cookies['refresh_token'];

  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No access token provided.' });
  }

  try {

    const access_decoded:any = jwt.verify(token, process.env.JWT_SECRET || '');

    // fetching and attaching the use obj with request
    const user_obj = await UserModel.findById(access_decoded['user']._id);
    if (!user_obj) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user_obj;

    next();

  } catch (error) {

    if (!refreshToken) {
      return res.status(401).json({ error: 'Access Denied. No refresh token provided.' });
    }

    try{

      const refresh_decoded:any = jwt.verify(refreshToken, process.env.JWT_SECRET || '');

      // fetching and attaching the use obj with request
      const user_obj = await UserModel.findById(refresh_decoded['user']._id);
      if (!user_obj) {
        return res.status(401).json({ error: 'User not found' });
      }
      req.user = user_obj;

      // 1 hour in seconds
      const accessExpiresIn = 1 * 60 * 60; // 3600 seconds
      const accessToken = jwt.sign({ user: refresh_decoded['user'] }, process.env.JWT_SECRET || '', { expiresIn: accessExpiresIn });

      res.clearCookie('access_token');
      res.cookie('access_token', accessToken,{
        httpOnly: true,
        sameSite: 'none',
        secure:true,
      })
      next();

    }catch(error){
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      
      console.error('Error in authMiddleware:', error);
      return res.status(401).json({ error: 'Session Timed-out.', redirectsTo: '/'});
    }
  }
};