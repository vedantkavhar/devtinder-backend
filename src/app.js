const express = require('express');
const app=express();

//this will handle anythin comes after /,/abc/nko,/hello 
// /anything 
// app.use("/",(req,res)=>{
//     res.send("first for /");
// })


//this will hanlde naything comes after /hello,/hello/123
// /hello/anything 
app.use("/hello",(req,res)=>{
    res.send("second for /hello");
})

//this will handle anything comes after /test,/test/123
// /test/anything
app.use("/test",(req,res)=>{
    res.send("third test");
})




app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})