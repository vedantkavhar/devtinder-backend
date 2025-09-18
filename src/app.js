const express = require('express');
const app=express();

//single rle handler
app.get("/user",(req,res)=>{
    console.log("Route handler 1");
    res.send("Route handler 1");
})

// 1 route can have multiple route handlers
// 2 route hanlers for single route
app.get("/user",
    (req,res)=>{
    console.log("console 1");
    res.send("Route handler 1");
   },
   (req,res)=>{
    console.log("consoele 2");
    res.send("Route handler 2");
   }
)
// output 
// console 1
// Route handler 1

//perfext route handler
app.get("/user",
    (req,res,next)=>{
    console.log("console 1");        //run
    next();                             //control goes to next route handler
   },
   (req,res)=>{
    console.log("consoele 2");      //run
    res.send("Route handler 2");            //run
   }    
)


//if we want to call next route handler 
// we have to use next() function
// due to next() conrol goes to next route handler
// line by line run but only 1 res allowed
//flow c1,r1,next(),c2,but for r2 error because resp already sen tby r1 
app.get("/user",
    (req,res,next)=>{
    console.log("console 1");               //run
    res.send("Route handler 1");       //run//first res
    next();                             //run  //control goes to next route handler 
   },       
   (req,res,next)=>{
    console.log("consoele 2");      //run
    res.send("Route handler 2");    //error because resp already sent by r1
   }
)


//now
// before first resp conrol goes to rl2 wait fot it ,com bak run rl1 resp1
// 49 run ,50 run ,54 run ,55 run,then 51 got chance buterror as alreasy respn have 
app.get("/user",
    (req,res,next)=>{
    console.log("console 1");               //run 1
    next();                             //run 2 //control goes to next route handler ,wa
    res.send("Route handler 1");       //5 but erro
   },       
   (req,res,next)=>{
    console.log("consoele 2");      //run 3
    res.send("Route handler 2");    //4 
   }
)


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})