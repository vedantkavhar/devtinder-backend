const express = require('express');
const app=express();


//? optional b
app.get(/^\/ab?c$/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})
// + muliple of b
// /abbbbbc
app.get(/^\/ab+c$/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})

// * for anything 
// abxyxzc
app.get(/^\/ab.*c$/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})

//antyuing ending with cover
// /raincover
app.get(/^\/.*cover$/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})

app.get(/ab?c/,(req,res)=>{
    console.log("get user api");
    res.send({"name":"vedamt","age":22});
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})