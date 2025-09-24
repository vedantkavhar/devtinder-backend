# apis

# authRouter
- POST /signup
- Post /login
- post /logout

## profileRouter
- get /profil/view
- patch /profile/edit
- patch /profile/password

## connncetionRequestRouter
- post /request/send/interested/:userId
- post /request/send/ignored/:userId
- post /request/send/review/accepted/:userId
- post /request/send/review/rejected/:userId


## userRouter
- get /user/connections
- get /user/requests
- get /user/feed          #get all profiles feed


status: interested,ignored,accepted,rejected