const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/task');



const taskModel = require('./models/task');

require('dotenv').config();


const port =  process.env.PORT || 3000;

const app = express();

const url = "mongodb://localhost:27017/nti";

const connection =async ()=>{
    return  await mongoose.connect(url)
    .then(
         ()=> console.log('DB connection established')
     ).catch(
         ()=>console.log('Cant connect')
     )
};

connection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(router);
// app.post('')



app.listen(port, ()=>{
    console.log(`Now listen on ${port}`);
});
