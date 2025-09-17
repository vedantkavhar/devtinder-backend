const express = require('express');
const app=express();

//request req.query ,req.params access

// query access
// http://localhost:7777/user?id=101
//  { id: '101' }
// Url/user?userId=101&paas=123
// { id: '101', pass: '123' }
app.get('/user',(req,res)=>{
    console.log(req.query);
    res.send("Hello World");
})

// params access
// http://localhost:7777/user/111111
// { userId: '111111' }
app.get('/user/:userId',(req,res)=>{
    console.log(req.params);
    res.send("Hello from express");
}
)

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})