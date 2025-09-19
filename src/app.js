const express = require('express');
const app=express();


const connectDB=require('./config/database');  // db connect krne k liye

connectDB()              // fn returns promise return krta hai
.then(()=>{                                     
    console.log("Connected to db, now listen to server");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
    });
})
.catch((err)=>{
    console.log("Error in connecting to db",err);
});

