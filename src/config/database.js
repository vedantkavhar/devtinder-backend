const mongoose= require("mongoose");


const conncetDB=async()=>{

    await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

module.exports=conncetDB; //export kr rhe hai taki app.js me use kr ske