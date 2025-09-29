const express = require("express");
const { userAuth } = require("../middlware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName age gender about skills";


//user incoming pending req api
// from feetchign from db we need to check user valid ===user auth 
// only return interested req because ignored not right 
//return only enoguh data dont overshare from db
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Here fromuserid refs that is user table ,the user who sent the req only firstname,lastname,age,gender,about akills are returned

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate(
            "fromUserId",
            "firstName lastName age gender about skills"
        );
        // ["firstName","lastName","age","gender","about","skills"]
        //only certain infor we are fetchibng

        res.json({ message: "data fetched successfully", data: connectionRequest });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})



// api  to find user connceteion//accepted
// i sent to someone or someone sent to me 
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        //req is sent by user or sent to user
        //if setn by user ,user is fromuserid so we will return info about receciver, touserid,to whom req is sent
        //if sent to user ,user is touserId so we will retrun info about send ,formuserid
        const data = connectionRequests.map(entry => {
            if (entry.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return entry.toUserId; //wehn cur user send the req
            }
            return entry.fromUserId; // when curr user receive req from sender
        });

        res.json({ message: "connections fetched succesfullt", data });


    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})



//feed api
//ussers should see cards of new users
// those ingored/interested ,acc,rej should not come agian 
// fresh cards == new users
// exclude 
// loggedin user Card 
// thos whose req receved 
// tohse whome i sent req 

// ignore those cards 
// to whom u sent req or req comes/received 
// we basically have to exlude req wher loggedInUser is fromuser id or to user id from connreq collection
// adn loggedinuser himself

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        // user should see all the usr cards except
        // 0.his own card 
        // 1.his connections 
        // 2.ignored people 
        // 3 . already sent the connectiion request 

        const loggedInUser= req.user;

        const page= parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit= limit >50 ?50 : limit ;

        const skip=(page-1) * limit ;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId"); //ret only this things

        const hideUsersFromFeed = new Set();

        //putting users in set for non duplication
        // all thos we connected somehow ,wher curr
        //  user is either sendder(fromuser id) or RTCRtpReceiver(touserid) ,are put in set,to exlcude
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        // find all users whose id is NOTIN hideUsersFromFeed arr  and NOTEQUAL to the user himself
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id }},
            ]
        }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.json({ message: "all users feed data",page,limit, users });
        // return res.json({
        //     page,
        //     limit,
        //    users 
        // });
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

module.exports = userRouter;