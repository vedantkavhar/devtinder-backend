const jwt = require("jsonwebtoken");
const User=require("../models/user")

//auth middleware to protect routes ,validate every incoming req if has valid jwt
const userAuth= async (req, res, next) => {
    try{

        console.log("inside userAuth middleware,lets valdiadate token");
        
        // reqd tokne from cookeis incoming
        const {token}= req.cookies ; //token is inside cookeiw in incoming req
        if(!token){
            return res.status(401).send("token not present ,user not authenticated");
        }
        
        //verify token 
        const decodedObj=await jwt.verify(token,"MydevtindersecretJwtKey"); // contains id
        
        const {_id}=decodedObj;

        const user=await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        }
        
        req.user=user ;    //attach founded user detils to req ⭐
        next(); // after checking all move next to controller
    } catch(err){
        throw new Error("ERROR:" + err.message);
    }

}

module.exports ={
    userAuth,
};