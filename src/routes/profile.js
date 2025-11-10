
const express= require("express");
const profileRouter= express.Router();

const { userAuth } = require("../middlware/auth");
const { validateEditProfileData } = require("../utils/validation");


//to access profile route verify token ,if user exist then only give info
profileRouter.get("/profile/view",userAuth, async(req, res) => {
    try{
        const user =req.user;     //user info is attached to req by mdidleware
        res.send(user); //token is valdiated ,returning user data
    } catch(err){
+        res.status(400).json({ error: err.message });
    }
})

//check if data are allowe dto edit if yes,
// only pass not allowed to upda 
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invlaid edit req ,it si not allowed");
        }

        const looggedInUser=req.user;           //user auth attaches curr login user to req
        console.log(looggedInUser);

        //replacing each field acc to new incoming data from req.body to loggin user earlier data
        // looggedInUser.firstName=req.body.firstName similary for all fiesld
        Object.keys(req.body).forEach((key)=>(looggedInUser[key] = req.body[key])) //cc
        console.log(looggedInUser);

        await looggedInUser.save();

        res.json({
            message:`${looggedInUser.firstName}, your profile is udapted successfully`,
            data : looggedInUser,            
        })
    }catch(err){
+        res.status(400).json({ error: err.message });

    }
})


module.exports= profileRouter;