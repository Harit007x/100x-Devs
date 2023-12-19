import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { todoRouter } from './routes/todo_routes';

dotenv.config();

// express app.
const app = express()


// middlewares start
app.use(bodyParser.json());
app.use((req:Request, res:Response, next:NextFunction)=>{
    console.log("hi from middleware")
    next()
})
// middlewares start


// routes consuming start
app.use('/todo', todoRouter)
// routes consuming start


// DB connection and server initialization start
console.log("oh wo wo w =", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI ?? '').then(() => {

  console.log("--------DB connection established")
  app.listen(process.env.PORT, () => {
    console.log(`--------Listening on port ${process.env.PORT}`);
  });
}).catch((error:any) => {
  console.error('MongoDB connection error:', error);
});

// DB connection and server initialization end