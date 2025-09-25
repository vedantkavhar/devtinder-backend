const validator = require("validator");

const validateSignUpData = (req) => {
    console.log(req.body);

    const { firstName, lastName, emailId, password } = req.body; //destructuring of incoming data

    if (!firstName || !lastName) {
        throw new Error("Empty name not allowed");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("please enter correct email id");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password");
    }
}


const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];

    // Object.keys()
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
};


module.exports = {
    validateSignUpData,
    validateEditProfileData,
}