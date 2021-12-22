const express = require('express');
const app = express();

// dotenv 
require('dotenv').config()

const multer = require('multer')

const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/newspaper";

const connection =async ()=>{
    return  await mongoose.connect(url)
    .then(
         ()=> console.log('DB connection established')
     ).catch(
         ()=>console.log('Cant connect')
     )
};

connection();

// parse automatic
app.use(express.json())

const port = process.env.PORT;

const newsRouter = require('./routers/news');
const repRouter = require('./routers/reporter');
app.use(repRouter);
app.use(newsRouter);




app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})