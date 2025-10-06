const express = require("express");
const authRouter= express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt= require("bcrypt");
const User= require("../models/user")

authRouter.post("/signup", async (req, res) => {
    //way1
    // const data = {
    //     firstName:"ved",
    //     lastName:"kavhar",
    //     emailId:"vedant@gmail.com",
    //     password:"veda@123",
    // }

    //create instance of model ,and pass data into it
    // const user = new User(data);

    //way 2
    // console.log("signup route hitted");
    // const user = new User({          //this is js obj
    //     firstName:"ved",
    //     lastName:"kavhar",
    //     emailId:"vedant@gmail.com",
    //     password:"veda@123",
    // });

    // {                                             === req.body
    //     firstName:"ved",
    //     lastName:"kavhar",
    //     emailId:"vedant@gmail.com",
    //     password:"veda@123",
    // }
    //way 3 modern
    console.log("signup route hitted");
    console.log(req.body);
    const { firstName, lastName, emailId, password } = req.body; //destructuring of incoming data



    try {
        //1validations on incoming data
        validateSignUpData(req);

        //2hasing password usign bcrypt
        const passwordHash = await bcrypt.hash(password, 10);  //10 is salt rounds
        //3saving hashed pass
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        })

        await user.save();
        console.log("user saved to db");
        res.send("user saved succesfully to db");
    } catch (err) {
        res.status(400).send("error savinfg info to db :: " + err.message);
    }

});


authRouter.post("/login", async(req, res) => {
    const { emailId, password } = req.body;
    

    try {
        //1.find user by email id
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).send("Invalid credentials");
        }
        //2.compare incoming password with hashed password in db
        const isPasswordMatch =await user.validatePassword(password);//logic in userschema
        if (!isPasswordMatch) {
            return res.status(401).send("Incorrect password");
        } else {

            //token generation using jwt encoding _id in it ⭐
            const token= await user.getJWT();            //logic in userschema
            console.log(token);

            res.cookie("token",token,{
                expires:new Date(Date.now()+ 8*3600000), //cookie expire time 8hr
            }); //name,value//putiing token inside cookew,sending cookee backt to client/user/browser
            
            res.send(user);
        }
    }    catch (err) {
             return res.status(400).send("error in login" + err.message);
    }   
})


authRouter.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out successfully' });

    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("logout successfull");

});


module.exports= authRouter;