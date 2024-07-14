const mongoose = require("mongoose");
const validator = require("validator");

const appointmentSchema = new mongoose.Schema(
    {
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
        phone: {
            type: String,
            required: [true, "Password is Required!"],
            minLength: [10, "Phone Number Should be 10 Digits!"],
            maxLength: [10, "Phone Number Should be 10 Digits!"],
        },
        dob: {
            type: Date,
            required: [true, "DOB is Required!"],
        },
        gender: {
            type: String,
            required: [true, "Gender is Required!"],
            enum: ["M", "F", "T", "O"],
        },
        doctor: {
            firstName: {
                type: String,
                required: [true, "FirstName Required!!"]
            },
            lastName: {
                type: String,
                required: [true, "LastName Required!!"]
            }
        },
        uid: {
            type: String,
            required: false,
            default: "",
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            required: [true, "userId require!"],
            ref: "users",
        },
        doctorId: {
            type: mongoose.Schema.ObjectId,
            required: [true, "doctorId require!"],
            ref: "users",
        },
        address: {
            type: String,
            required: [true, "Address is Required!"],
        },
        department: {
            type: String,
            required: [true, "department is required!"],
        },
        appointmentDate: {
            type: Date,
            required: [true, "appoint"],
        },
        hasVisited: {
            type: Boolean,
            required: [true, "hasVisited is a required field!"],
        },
        status: {
            type: String,
            enum: ["Accepted", "Pending", "Rejected", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = AppointmentModel;
