require('dotenv').config()
const server_express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
 

// routes import
const todos = require('./routes/todo_route')


// express app.
const app = server_express()


// middlewares start
app.use(bodyParser.json());
app.use((req:any, res:any, next:any)=>{
    console.log("hi from middleware")
    next()
})
// middlewares start


// routes consuming start
app.use('/todo', todos)
// routes consuming start


// DB connection and server initialization start
mongoose.connect(process.env.MONGO_URI).then(() => {

  console.log("--------DB connection established")
  app.listen(process.env.PORT, () => {
    console.log(`--------Listening on port ${process.env.PORT}`);
  });
}).catch((error:any) => {
  console.error('MongoDB connection error:', error);
});

// DB connection and server initialization end