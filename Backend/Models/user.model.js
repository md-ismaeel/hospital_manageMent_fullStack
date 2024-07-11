const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"],
        minLength: [2, "First Name Must Contain At Least 2 Characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 2 Characters!"],
    },
    email: {
        type: String,
        required: true,
        validator: [validator.isEmail, "Provide a valid Email!"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password minimum-Length should be 8 characters!"],
    },
    phone: {
        type: String,
        required: [true, "Password is Required!"],
        minLength: [10, "Phone Number Should be 10 Digits!"],
        maxLength: [10, "Phone Number Should be 10 Digits!"],
    },
    uid: {
        type: String,
        required: false,
        default: "",
    },
    dob: {
        type: Date,
        required: [true, "DOB is Required!"],
    },
    role: {
        type: String,
        required: [true, "Role is Required!"],
        enum: ["ADMIN", "DOCTOR", "PATIENT"],
    },
    gender: {
        type: String,
        required: [true, "Gender is Required!"],
        enum: ["M", "F", "T", "O"],
    },

    docDepartment: {
        type: String,
        required: false,
    },
    docAvatar: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: false,
        default: null,
    },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
