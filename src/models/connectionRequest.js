const mongoose =require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "User",    //ref to user collection
        required: true ,

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User", 
        required: true, 
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect statue type `,
        },
    },
},{
    timestamps: true,
})

//connectionRequest.find({fromUserId: 234567, toUserId:2345678});
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

// kind of middleware method in schema
// always run before saving an entry to db
// will check whether the user is trying to send conn req to himself or not 
connectionRequestSchema.pre("save", function(next){
    const connectionRequest= this;
     //check if form user id is same as to user id,user is not allowed to send req to himself
     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error(" Cannot send connection request to yourself");
     }
     next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;