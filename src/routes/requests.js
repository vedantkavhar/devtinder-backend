const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlware/auth");
const ConnectionRequest = require("../models/connectionRequest"); //conn model
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");//for sending emails

//interested/ignored
//this curr user should able to send req to tohter user
requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        //get data from req
        const fromUserId = req.user._id; //curr login user will send conn req to other user right?
        const toUserId = req.params.userId;
        const status = req.params.status; //ignored or interested

        // status must be ignored or interested only
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: " invalid status type: ", status });
        }
        //user cannot send req to himself// handled in schema level pre save 

        //cehck if user if are valid ,they are in db or not ,ids must be in db to send req
        //find valid user // user cannot send req to invalid useerid ,the receiver must be in db
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).send({ message: " user not found in db" });
        }

        //if connection alreadyy exists 1 to 2 or 2 to 1 ,vice versa
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });
        if (existingConnectionRequest) {
            return res.status(400).send({ message: " connection req already EXISTS!!!" });
        }

        // new connnection req saave to db usngi model
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();


        //sedngin email
        // whenever there is conn req ,email sent
        const emailRes=await sendEmail.run("A new friend request for you on devConnect","You have a new connection request from "+ req.user.firstName +" "+ req.user.lastName+ ". Log in to your account to review the request.");
        console.log("email sent response:",emailRes);

        // try {
        //     const emailRes = await sendEmail.run();
        //     console.log("email sent response:", emailRes);
        // } catch (emailErr) {
        //     console.error("SES/sendEmail.run ERROR (non-fatal):", emailErr && emailErr.stack ? emailErr.stack : emailErr);
        //     // don't rethrow — respond success to client
        // }  

        res.json({
            message: 
            req.user.firstName + "is" + status+" in"+ toUser.firstName,
            data,
        });
    }
    catch (err) {
        res.status(400).send("error" + err.message);
    }
})

//accpeted rejected
//this curr user shoule be able to accep or rejc request coming to himself/incomin req
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "status not allowed !! " })
        }

        //filtering interested req
        // earlier must be interested only 
        //status must be acc,or rej// we have to find interested req from db
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })
        //if req not found or req othere thatn interested cannot be acc/rej
        if (!connectionRequest) {
            return res.status(404).json({ message: "connection request not found" })
        }
        //sender should able to acce/rej only reciecver(to user id) should do acc/rej
        //the req are comin to login user ,that is touserid==lgoged in user\
        //req id should be valid

        //all req are interested ,lets update status as user wants acc/rej 
        connectionRequest.status = status;

        //saving updated info the req sent from user 1 to user 2,user 2 marked the req
        const data = await connectionRequest.save();
        res.json({ message: "connection request " + status, data });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = requestRouter;