- e3 express setup
- ![alt text](image-1.png)
- git setup
- ![alt text](image.png)
- app.use
![alt text](image-2.png)
- httmp methods
-![alt text](image-3.png)
- routing +,?,*
![alt text](image-4.png)
-![alt text](image-5.png)     4
- both above works
- req.query ,req.params
![alt text](image-6.png)

- e5 middlwares error handlers onnlu img rem in onenote
-   playing with route hanlers ,next () fun for moving to next rl
- ![alt text](image-9.png)
- ![alt text](image-8.png)
-![alt text](image-10.png)
- wrap in array also same work ![alt text](image-11.png)![alt text](image-12.png)
- same work ,diff syntax![alt text](image-13.png)
- midllware ![alt text](image-14.png)![alt text](image-15.png)
- ![alt text](image-16.png)![alt text](image-17.png)
- error handling


- e6 connecting to db ,mongodb,cluster,schema,model,collection
- perfect connection ![alt text](image-18.png)![alt text](image-19.png)
- model and schema ![alt text](image-20.png)
- saving hard coded manually data to users colletion/model inside db ![alt text](image-21.png) 

- e7 apis detail
- post api
- psotman req.body ,express.json midlleware ,savinf to db ![alt text](image-22.png)
- get api
- getinng user by email id ,user.find({eamil}) ![alt text](image-23.png)
- getting all users ,feed api,user.find({}) ![alt text](image-24.png)
- if dup email id ,get only one using user.findOne({email}) ![alt text](image-25.png)
- delete api ![alt text](image-26.png) , 
- update api  ![alt text](image-27.png) its ooptions before,after![alt text](image-28.png) ![alt text](image-29.png)

- e8 data sanitization
- part1: schema level checks in schema file
- schema checks ![alt text](image-30.png)![alt text](image-31.png)
- runvalidators true ![alt text](image-32.png)
- required,unique,lowercase,trim,default,min,minLength,custom validations,runvalidators,timestamps
- part 2: api level checks
- allowing only particular thing to update ![alt text](image-33.png)
- getting userid form req, allowing max 10 skils only ![alt text](image-34.png)
- validator ![alt text](image-35.png)

- e9 encrypting passwords
- validate password ![alt text](image-37.png)
- encrypt pass by hashing them then hashed pass save to db ![alt text](image-36.png)
- login route ![alt text](image-38.png)

- e10 authenctication ,jwt,cookies
- stroing jwt inside cookies and retrurning back to client ![alt text](image-39.png)![alt text](image-40.png)
- /login final creating ,storing jwt in cookies ![alt text](image-41.png)
- validating upcoming jwt from cookies and sending bajc user info ![alt text](image-42.png)
- user auth midellware ![alt text](image-44.png)
- usser auth use in /profile route ![alt text](image-43.png)
- /sendConnectionRequest user auth and expires ![alt text](image-45.png)
- difficul
- refactotring code moving logic of jwt generation and pass compare in userschema ![alt text](image-47.png) ![alt text](image-46.png)


- e11 diving into api,expreses router
- apilist ![alt text](image-48.png)
- moving routes from app.js to router ![](image-49.png) ![alt text](image-50.png) ![alt text](image-51.png)
- using it itn app.js ![alt text](image-52.png)
- logout api
- difficul
- profile/view,profile/edit api ,validateedit fields valdiation fn ![alt text](image-53.png) ![alt text](image-54.png)
- 

- e12 logical db query and compound indexes
- gender schema update ![alt text](image-57.png)
- connection request schema ![alt text](image-58.png)
- send request route api /request/send/:Status/:userID ![alt text](image-56.png)
- compound indexing ![alt text](image-59.png) 