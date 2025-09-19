const express = require('express');
const app=express();
const connectDB=require('./config/database');  // db connect krne k liye

const User =require("./models/user"); //impporting model user

app.use(express.json()); //middleware to parse json data from req body // convert json to js obj⭐ else req.body will be undefined

app.post("/signup",async(req,res)=>{
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
    const user = new User(req.body);  // assuming req.body has the user data from postman req body

    try{
        await user.save();
        console.log("user saved to db");
        res.send("user saved succesfully to db");
    }catch(err){
        res.status(400).send("error savinfg info to db :: " +err.message);
    }

});



connectDB()              // fn returns promise return krta hai
.then(()=>{                                     
    console.log("Connected to db, now listen to server");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
    });
})
.catch((err)=>{
    console.log("Error in connecting to db",err);
});

