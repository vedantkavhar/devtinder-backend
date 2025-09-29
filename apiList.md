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
- get /feed                    #get all new profiles feed

# pagination
/feed?page=1&limit=10           => 1 to 10
/feed?page=2&limit=10           => 11 to 20

/feed
use req.query.page

status: interested,ignored,accepted,rejected