const mongoose= require("mongoose");


const conncetDB=async()=>{

    await mongoose.connect("mongodb+srv://vedantk1912_db_user:y9LzSTEL9K6RwsAb@cluster1.na5a2gx.mongodb.net/finaldb?retryWrites=true&w=majority&appName=Cluster1")
}

module.exports=conncetDB; //export kr rhe hai taki app.js me use kr ske