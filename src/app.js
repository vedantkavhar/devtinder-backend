const express = require('express');
const app=express();


// must 
// 1. next () fun is imp to move to next rl
// 2. if we send response in one rl then we cant send in next rl
// means 1 route onlu 1 response
// if nore resp in route ifnite loop of res

app.get('/user',
    (req,res,next)=>{
    console.log("console 1");
    next();
},
    (req,res,next)=>{
    console.log("console 2");
    next();
},
    (req,res,next)=>{
    console.log("console 3");
    next();
},
    (req,res)=>{
    console.log("console 4");
    res.send(" hanler 4");
},
);

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})