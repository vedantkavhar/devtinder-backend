const express = require('express');
const app=express();

regex lit confusin g both works versionn issue

//? optional b
app.get(/ab?c/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})
app.get(/ab+c/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})
app.get(/ab*c/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})