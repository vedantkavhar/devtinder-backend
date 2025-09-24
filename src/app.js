const express = require('express');
const app = express();
const connectDB = require('./config/database');  // db connect krne k liye

const User = require("./models/user"); //impporting model user

const { validateSignUpData } = require("./utils/validation");
const bcyrpt = require("bcrypt");

const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")

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


app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    

    try {
        //1.find user by email id
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).send("Invalid credentials");
        }
        //2.compare incoming password with hashed password in db
        const isPasswordMatch = await bcyrpt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send("Incorrect password");
        } else {

            //token generation using jwt encoding _id in it ⭐
            const token= await jwt.sign({_id:user._id},"MydevtindersecretJwtKey");
            console.log(token);

            res.cookie("token",token); //name,value//putiing token inside cookew,sending cookee backt to client/user/browser
            res.send("login successful");
        }
    }    catch (err) {
        return res.status(400).send("error in login" + err.message);
    }   
})

//to access profile route verify token ,if user exist then only give info
app.get("/profile", async(req, res) => {
    try{
        const cookies = req.cookies;
        console.log("all cookies",cookies);
        
        const {token}=cookies ;
        if(!token){
            throw new Error("invalid token");
        } 

        const decodedMessage= await jwt.verify(token,"MydevtindersecretJwtKey"); // contains id
        console.log("decoded msg"+decodedMessage); 

        const {_id}= decodedMessage;                  //extracting id from token
        console.log("logged in user is wwtih id: "+_id);

        const user= await User.findById(_id);            // find user with that id in db
        if(!user){
            throw new Error("user does not exist")
        }
        res.send(user); //token is valdiated ,returning user data
    } catch(err){
        res.status(400).message("error"+err.message);
    }
})


// ⭐db operations are perfromed on model User.find,model.find  

//get user by email id
// left side must be same as schema /field name in db 
// right side is incoming from req body /client/fe
// returns arr of all matching entries with that incoming email id so chekc arr length empty or not
app.get("/user", async (req, res) => {
    console.log(req.body.emailId);
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmail }); // return single matching enty ,if duplicate entries then first match return krta hai
        if (!user) {
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
    catch (err) {
        res.status(400).send("error in fetching user by email id" + err.message);
    }
})

//get feed api 
app.get("/feed", async (req, res) => {
    console.log("feed route hitted");
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("error in fetching all users" + err.message);
    }
})

//delete user by id
// left side must be same as schema /field name in db here_id
// right side is incoming from req body /client/fe
app.delete("/user", async (req, res) => {
    console.log(req.body.userId);
    const userIdreq = req.body.userId;
    try {
        // await User.findByIdAndDelete({_id:userIdreq });    //or
        await User.findByIdAndDelete(userIdreq);        //both works same
        res.send("user deleted successfully");
    }
    catch (err) {
        res.status(400).send("error in deleting user by id" + err.message);
    }
});


app.patch("/user/:userId", async (req, res) => {
    console.log(req.params?.userId);
    const userIdreq = req.params?.userId;
    const data = req.body;               //new data to update
    try {
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((key) =>
            ALLOWED_UPDATES.includes(key)
        );
        if (!isUpdateAllowed) {
            return res.status(400).send("invalid updates , you can only update " + ALLOWED_UPDATES);
        }
        if (data?.skills.length > 10) {
            return res.status(400).send("you can add max 10 skills");
        }

        // await User.findByIdAndUpdate({_id:userIdreq},data );   //both works same  ,by def is before
        const user = await User.findByIdAndUpdate(userIdreq, data, {
            returnDocument: "after",   // return updated doc for after ,by def is before
            runValidators: true,       // to run validators while updating also by def it only validation work on creating new user,but to make it run on update also use runValidators:true
        });
        console.log(user);
        res.send("user updated successfully");
    } catch (err) {
        res.status(400).send("error in updating user by id" + err.message);
    }
});

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

