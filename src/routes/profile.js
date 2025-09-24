
const express= require("express");
const profileRouter= express.Router();

const { userAuth } = require("../middlware/auth");


//to access profile route verify token ,if user exist then only give info
profileRouter.get("/profile",userAuth, async(req, res) => {
    try{
        const user =req.user;     //user info is attached to req by mdidleware
        res.send(user); //token is valdiated ,returning user data
    } catch(err){
        res.status(400).message("error"+err.message);
    }
})

module.exports= profileRouter;