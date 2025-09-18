const AuthAdmin = (req, res, next) => {
    console.log("In the admin middleware");
    const token="sdfghjk";          //client oken
    const isAdmin= token==="abc";
    if(isAdmin){
        next();
    }else{
        res.status(403).send("Access denied");
    }
}

module.exports = AuthAdmin;