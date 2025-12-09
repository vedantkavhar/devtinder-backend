require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require('./config/database');  // db connect krne k liye

const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter= require("./routes/requests");
const userRouter = require('./routes/user');
const cors= require("cors");



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json()); //middleware to parse json data from req body // convert json to js obj⭐ else req.body will be undefined
app.use(cookieParser()); // to parse cookie from req header ,to be able to read cookies

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);




//connect to db then start server
connectDB()              // fn returns promise return krta hai
    .then(() => {
        console.log("Connected to db, now listen to server");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error in connecting to db", err);
    });

