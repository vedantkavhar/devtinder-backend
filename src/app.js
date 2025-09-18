const express = require('express');
const app=express();

// error jandling
// way 1 try cath
app.get("/",(req,res)=>{
    console.log("In the root route");
    // try{
    //     throw new Error("Some error occured");
    //     res.send("Hello World");

    // }catch{
    //     res.status(500).send("Internal server error");
    // }
});

// way 2  err in req 
app.get("/user",(err,req,res,next)=>{
    if(err){
        res.status(500).send(" error");
    }
}
);

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})