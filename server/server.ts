import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { kanbanRouter } from './routes/kanban_routes';
import { authRouter } from './routes/auth_routes';
import { authMiddleware } from './middlewares/auth_middleware';
import cookieParser from 'cookie-parser';

dotenv.config();

// express app.
export const app = express()

// middlewares start
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update with your frontend URL
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//   if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//   } else {
//       next();
//   }
// });

app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin: 'https://100x-devs-kg65.vercel.app',
}));
// middlewares end

// routes consuming start
app.use('/auth', authRouter)
app.use('/kanban', authMiddleware, kanbanRouter)
// routes consuming start


// DB connection and server initialization start
mongoose.connect(process.env.MONGO_URI ?? '').then(() => {

  console.log("--------DB connection established")
  app.listen(process.env.PORT, () => {
    console.log(`--------Listening on port ${process.env.PORT}`);
  });
}).catch((error:any) => {
  console.error('MongoDB connection error:', error);
});

// DB connection and server initialization end