const express = require('express');

const { addNewAdmin, addNewDoctor, addNewPatient, signInUser } = require('../Controllers/user.controller')

const userRouter = express.Router();

userRouter.post('/signUp/admin', addNewAdmin);
userRouter.post('/signUp/doctor', addNewDoctor);
userRouter.post('/signUp/patient', addNewPatient);
userRouter.post('/login/user', signInUser);

module.exports = userRouter;