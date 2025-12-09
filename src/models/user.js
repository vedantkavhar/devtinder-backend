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
        enum:{
            values: ["male","female","others"],
            message: `{VALUE} is not a valid gender type`,
        }
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("enter valud gender");
        //     }
        // },
    },
    photoUrl:{
        type:String,
        default:"data:image/png;base64,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",
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("invalid url");
        //     }
        // },
    },
    about:{
        type:String,
        default:"Hey there! I am using DevConnect",
    },
    skills:{
        type:[String],  // array of strings
    }
},{
    timestamps:true,  //createdAt and updatedAt
});

userSchema.methods.getJWT= async function(){
    const user= this ;//if ved is login then this will point to ved user details/document

    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
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