const express = require('express');
const app=express();

//middleare 
// handlers till actual resp req hanlder are middleware 
app.use("/",(req,res,next)=>{
    next();                              //    middleware                                          
})

app.get('/user',(req,res,next)=>{
    console.log("user route");          //middleware
    next();
},(req,res)=>{
    res.send("hanlder 2");            //actual response req, handler
});


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})