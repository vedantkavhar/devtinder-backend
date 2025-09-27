# apis

# authRouter
- POST /signup
- Post /login
- post /logout                  //e11
 
## profileRouter                 //e11
- get /profil/view                 
- patch /profile/edit
- patch /profile/password               //hw

## connncetionRequestRouter
- post /request/send/interested/:userId      //e12
- post /request/send/ignored/:userId         //e12
- Post /request/send/:status/:userId      ✅

- post /request/send/review/accepted/:userId
- post /request/send/review/rejected/:userId
- post /reqquest/send/review/:status/:requestId    ✅ //e13

## userRouter
- get /user/requests/received 
- get /user/connections
- get /user/feed          #get all profiles feed


status: interested,ignored,accepted,rejected