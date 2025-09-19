const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String, 
    },
    password:{
        type:String,
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
    },
})

// User is model name,must be capitalized
module.exports=mongoose.model("User",userSchema);  // User model create krke export kr rhe hai to use in app.js