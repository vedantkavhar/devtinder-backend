const mongoose = require('mongoose');
const validator= require('validator');

const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt");

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id");
            }
        },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong enough");
            }
        },
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url");
            }
        },
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
});

userSchema.methods.getJWT= async function(){
    const user= this ;//if ved is login then this will point to ved user details/document

    const token = await jwt.sign({_id:user._id},"MydevtindersecretJwtKey",{
        expiresIn:"7d",
    });

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this ; //point to curr user doc in db
    const passwordHash= user.password; //user hash pass

    const isPasswordValid= await bcrypt.compare(passwordInputByUser, passwordHash);// cehck incoming pass,and db pass

    return isPasswordValid;
}

// User is model name,must be capitalized
module.exports=mongoose.model("User",userSchema);  // User model create krke export kr rhe hai to use in app.js