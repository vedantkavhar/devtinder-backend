const express = require('express');
const app=express();

// import middleeare 
const {AuthAdmin}=require("./middlware/auth");

//middleare 
// work for admin/ all route
//way1  
app.use("/admin",AuthAdmin);
//way 2 inside route
app.get("/admin/dashboard",AuthAdmin,(req,res)=>{
    res.send("Admin Dashboard");
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})