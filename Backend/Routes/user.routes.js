const express = require("express");

const { addNewAdmin, addNewDoctor, addNewPatient, getProfile, loginUser, logoutUser, allDoctors,
} = require("../Controllers/user.controller");

const passport = require("../Middleware/userMiddleware");
const Authorization = require("../Middleware/authorization");
const { upload } = require("../Services/services");

const userRouter = express.Router();

userRouter.post(
    "/register/admin",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN"]),
    addNewAdmin
);

userRouter.post(
    "/register/doctor",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN"]),
    upload.single("file"),
    addNewDoctor
);

userRouter.get(
    "allDoctors",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN"]),
    allDoctors
);

userRouter.post("/register/patient", addNewPatient);

userRouter.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    getProfile
);

userRouter.post("/login", loginUser);

userRouter.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    logoutUser
);

module.exports = userRouter;
