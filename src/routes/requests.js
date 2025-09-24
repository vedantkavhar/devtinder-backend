const express= require("express");
const requestRouter= express.Router();
const  {userAuth}=require("../middlware/auth");

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{

    try{
        const user=req.user ;
        res.send(user.firstName +" sent connection request");
    }
    catch(err){
        res.status(400).message("error"+err.message);
    }
})

module.exports= requestRouter;