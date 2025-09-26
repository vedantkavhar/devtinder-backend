const express= require("express");
const requestRouter= express.Router();
const  {userAuth}=require("../middlware/auth");
const ConnectionRequest= require("../models/connectionRequest"); //conn model
const User = require("../models/user");

requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        //get data from req
        const fromUserId= req.user._id; //curr login user will send conn req to other user right?
        const toUserId = req.params.userId ;
        const status = req.params.status; //ignored or interested

        // status must be ignored or interested only
        const allowedStatus= ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:" invalid status type: ",status});
        }
        //user cannot send req to himself// handled in schema level pre save 

        //cehck if user if are valid ,they are in db or not ,ids must be in db to send req
        //find valid user // user cannot send req to invalid useerid ,the receiver must be in db
        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send({message:" user not found in db"});
        }

        //if connection alreadyy exists 1 to 2 or 2 to 1 ,vice versa
        const existingConnectionRequest= await ConnectionRequest.findOne({
           $or:[
            { fromUserId: fromUserId ,toUserId: toUserId},
            { fromUserId: toUserId   ,toUserId: fromUserId },
           ]
        });
        if(existingConnectionRequest){
            return res.status(400).send({message:" connection req already EXISTS!!!"});
        }

        // new connnection req saave to db usngi model
        const connectionRequest= new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

       const data= await connectionRequest.save(); 

        res.json({
            message: "connection request sent successfully !",
            data,
        });
    }
    catch(err){
        res.status(400).send("error"+err.message);
    }
})

module.exports= requestRouter;