const express = require('express');
const app = express();
const connectDB = require('./config/database');  // db connect krne k liye

const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter= require("./routes/requests");

app.use(express.json()); //middleware to parse json data from req body // convert json to js obj⭐ else req.body will be undefined
app.use(cookieParser()); // to parse cookie from req header ,to be able to read cookies

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);





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

