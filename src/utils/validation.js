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

module.exports = {
    validateSignUpData,
}