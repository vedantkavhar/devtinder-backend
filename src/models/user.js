const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String, 
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("enter valud gender");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    about:{
        type:String,
        default:"Hey there! I am using DevTinder",
    },
    skills:{
        type:[String],  // array of strings
    }
},{
    timestamps:true,  //createdAt and updatedAt
})

// User is model name,must be capitalized
module.exports=mongoose.model("User",userSchema);  // User model create krke export kr rhe hai to use in app.js