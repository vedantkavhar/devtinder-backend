const express = require('express');
const app=express();


app.get("/user",(req,res)=>{
    console.log("get user api")
    res.send({"name":"vedamt","age":22});
})

app.post("/user",(req,res)=>{
    console.log("post user api");
    res.send("user saved to db");
})

app.delete("/user",(req,res)=>{
    console.log("del user api");
    res.send("user deleted from db");
})

//this will handle anything comes after /test,/test/123
// /test/anything  
app.use("/test",(req,res)=>{
    res.send("third test");
})




app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})