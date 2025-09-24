const express = require('express');
const app = express();
const connectDB = require('./config/database');  // db connect krne k liye

const User = require("./models/user"); //impporting model user

const { validateSignUpData } = require("./utils/validation");
const bcyrpt = require("bcrypt");

const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const {userAuth}=require("./middlware/auth");

app.use(express.json()); //middleware to parse json data from req body // convert json to js obj⭐ else req.body will be undefined
app.use(cookieParser()); // to parse cookie from req header ,to be able to read cookies


app.post("/signup", async (req, res) => {
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
        const passwordHash = await bcyrpt.hash(password, 10);  //10 is salt rounds
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


app.post("/login", async(req, res) => {
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
            res.send("login successful");
        }
    }    catch (err) {
             return res.status(400).send("error in login" + err.message);
    }   
})

//to access profile route verify token ,if user exist then only give info
app.get("/profile",userAuth, async(req, res) => {
    try{
        const user =req.user;     //user info is attached to req by mdidleware
        res.send(user); //token is valdiated ,returning user data
    } catch(err){
        res.status(400).message("error"+err.message);
    }
})

app.post("/sendConnectionRequest",userAuth,(req,res)=>{

    try{
        // const {user }=req.user; //logged in user
        const user=req.user ;
        res.send(user.firstName +" sent connection request");
    }
    catch(err){
        res.status(400).message("error"+err.message);
    }
})

//connect to db then start server
connectDB()              // fn returns promise return krta hai
    .then(() => {
        console.log("Connected to db, now listen to server");
        app.listen(7777, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.log("Error in connecting to db", err);
    });

