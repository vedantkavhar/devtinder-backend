const express= require("express");
const { userAuth } = require("../middlware/auth");
const userRouter=express.Router();
const ConnectionRequest= require("../models/connectionRequest");

//user incoming pending req api
// from feetchign from db we need to check user valid ===user auth 
// only return interested req because ignored not right 
//return only enoguh data dont overshare from db
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser= req.user ;

        // Here fromuserid refs that is user table ,the user who sent the req only firstname,lastname,age,gender,about akills are returned

        const connectionRequest= await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate(
            "fromUserId",
            "firstName lastName age gender about skills"
        );
        // ["firstName","lastName","age","gender","about","skills"]
        //only certain infor we are fetchibng

        res.json({message:"data fetched successfully",data : connectionRequest});
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})


module.exports = userRouter ;