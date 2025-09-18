const express = require('express');
const app=express();

// rh1 
// app.get('/',(req,res)=>{
//     res.send("Hello World");
// })

// both works same 
app.get('/user',[ rh1,rh2,rh3,rh4 ]) 
app.get('/user', rh1,[rh2,rh3],rh4 ) 

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})