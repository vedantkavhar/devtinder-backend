const express = require('express');
const app=express();

app.use("/",(req,res)=>{
    res.send("hello from http express server");
})

app.use("/hello",(req,res)=>{
    res.send("this is hello route 2n d handler");
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})