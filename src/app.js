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

// ⭐db operations are perfromed on model User.find,model.find  

//get user by email id
// left side must be same as schema /field name in db 
// right side is incoming from req body /client/fe
// returns arr of all matching entries with that incoming email id so chekc arr length empty or not
app.get("/user",async(req,res)=>{
    console.log(req.body.emailId);
    const userEmail = req.body.emailId;

    try{
        const user= await User.findOne({emailId:userEmail}); // return single matching enty ,if duplicate entries then first match return krta hai
        if(!user){
            return res.status(404).send("No user found with this email id");
        }
        res.send(user);  // single obj
       
    //    // alternative    way return arr of all matching entries with that incoming email

    //    const users= await User.find({emailId: userEmail}); //retrun arr of all matchin entries with that incoming email
    //    if(users.length===0){
    //     return res.status(404).send("No user found with this email id");
    //    }
    //    else{
    //        res.send(users);  
    //     }
    }
    catch(err){
        res.status(400).send("error in fetching user by email id"+ err.message);
    }
})

//get feed api 
app.get("/feed",async(req,res)=>{
    console.log("feed route hitted");
    try{
       const users=  await User.find({});
       res.send(users);
    }catch(err){
        res.status(400).send("error in fetching all users"+ err.message);
    }
})

//delete user by id
// left side must be same as schema /field name in db here_id
// right side is incoming from req body /client/fe
app.delete("/user",async(req,res)=>{
    console.log(req.body.userId);
    const userIdreq=req.body.userId;
    try{
        // await User.findByIdAndDelete({_id:userIdreq });    //or
        await User.findByIdAndDelete(userIdreq);        //both works same
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("error in deleting user by id"+ err.message);
    }
});


app.patch("/user",async(req,res)=>{
    console.log(req.body.userId);
    const userIdreq=req.body.userId;        
    const data=req.body;               //new data to update
    try{
        // await User.findByIdAndUpdate({_id:userIdreq},data );   //both works same  ,by def is before
        const user =await User.findByIdAndUpdate(userIdreq,data,{
            returnDocument:"after",   // return updated doc for after ,by def is before
            runValidators:true,       // to run validators while updating also by def it only validation work on creating new user,but to make it run on update also use runValidators:true
        } );                                                        
        console.log(user);
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send("error in updating user by id"+ err.message);
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

