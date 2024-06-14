const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

const userModel = require("../Models/user.model");

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRETE_KEY;
console.log(jwtSecretKey);


const addNewAdmin = async (req, res) => {

  try {
    console.log(req.body);
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);



    // await userModel.create(userDetails);
    const userDetails = new userModel({
      ...req.body,
      password: hasPassword,
      role: 'ADMIN'
    });

    const info = await userDetails.save()
    res.json({
      success: true,
      message: "admin signUp successfully",
      results: info._id
    })

  } catch (err) {

    res.json({
      success: false,
      message: "user signUp successfully", err
    });
  }

};


const addNewDoctor = async (req, res) => {

  try {
    console.log(req.body);
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);

    const userDetails = {
      ...req.body,
      password: hasPassword,
      role: 'DOCTOR'
    }

    await userModel.create(userDetails);
    res.json({
      success: true,
      message: "doctor signUp successfully"
    })

  } catch (err) {

    res.json({
      success: false,
      message: "user not register please try again",
    });
  }

};


const addNewPatient = async (req, res) => {

  try {
    console.log(req.body);
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);

    const userDetails = {
      ...req.body,
      password: hasPassword,
      role: 'PATIENT'
    }

    await userModel.create(userDetails);
    res.json({
      success: true,
      message: "doctor signUp successfully"
    })

  } catch (err) {

    res.json({
      success: false,
      message: "user signUp successfully", err
    });
  }

};

const signInUser = async (req, res) => {
  console.log(req.body);
};


module.exports = { addNewAdmin, addNewDoctor, addNewPatient, signInUser };

// const userController = {
//     signInUser,
//     signInUser
// }
// module.exports = userController;