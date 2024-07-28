const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = require("../Models/user.model");
const { catchAsyncFun } = require("../Middleware/errorHandler");
const { uploadFile } = require("../Services/services");

const jwtSecretKey = process.env.JWT_SECRETE_KEY;

/* add new admin */
const addNewAdmin = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password, phone, dob, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !dob || !gender) {
    return res.status(409).json({
      success: false,
      message: "Please fill All Fields!",
    });
  }

  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    return res.json({
      success: false,
      message: "user already registered",
    });
  }

  // const result = await uploadFile(req)

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);

  // const userDetails = new UserModel({
  //   ...req.body,
  //   password: hasPassword,
  //   role: 'ADMIN'
  // });
  // const info = await userDetails.save()

  const adminUser = await UserModel.create({
    ...req.body,
    password: hasPassword,
    role: "ADMIN",
  });

  res.status(201).json({
    success: true,
    message: "admin created signUp successfully",
    results: adminUser._id,
  });
};

/* add new doctor */
const addNewDoctor = async (req, res) => {
  // console.log(req.body);
  console.log("something");
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    docDepartment,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Upload image for the avatar",
    });
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !gender ||
    !docDepartment
  ) {
    return res.status(409).json({
      success: false,
      message: "Please fill All Fields!",
    });
  }

  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    return res.json({
      success: false,
      message: "user already registered",
    });
  }

  const result = await uploadFile(req);
  // console.log(result);

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);

  const doctorUser = await UserModel.create({
    ...req.body,
    password: hasPassword,
    role: "DOCTOR",
    docAvatar: result.secure_url,
  });

  res.status(201).json({
    success: true,
    message: "doctor created signUp successfully",
    results: doctorUser._id,
  });
};

/* add new patient */
const addNewPatient = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password, phone, dob, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !dob || !gender) {
    return res.status(400).json({
      success: false,
      message: "Please fill All Fields!",
    });
  }

  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    return res.json({
      success: false,
      message: "user already registered",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);

  const patientUser = await UserModel.create({
    ...req.body,
    password: hasPassword,
    role: "PATIENT",
  });

  res.status(201).json({
    success: true,
    message: "Patient created signUp successfully",
    results: patientUser._id,
  });
};

/* get all doctors*/
const allDoctors = async (req, res) => {


  const doctors = UserModel.find({ role: "DOCTOR" })

  if (doctors.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No doctors found!!"
    })
  }

  res.status(200).json({
    success: true,
    message: "all doctors fetched"
  })
}

/* add getProfile */
const getProfile = async (req, res) => {
  console.log(req.user);

  const genders = {
    M: "Male",
    F: "Female",
    T: "Transgender",
    O: "Other",
  };

  const userData = {
    userId: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    phone: req.user.phone,
    dob: req.user.dob,
    gender: genders[req.user.gender],
    docDepartment: req.user.docDepartment,
    docAvatar: req.user.docAvatar,
  };

  res.status(200).json({
    success: true,
    message: "profile data fetched",
    userData,
  });
};

/* user Login */
const loginUser = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: "Invalid username or password",
    });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({
      sucess: false,
      message: "Invalid username or password",
    });
  }

  const jwt_payload = {
    role: user.role,
    userId: user._id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    exp: Math.ceil(new Date().getTime() / 1000 + 7200),
  };

  const token = jwt.sign(jwt_payload, jwtSecretKey);

  await UserModel.updateOne({ token: `Bearer ${token}` });

  res.cookie("token", token, {
    // httpOnly: true,
    secure: true, // for HTTPS
    sameSite: "none", // for cross-site cookies
    path: "/",
    maxAge: 7200000, // 2 hours in milliseconds
  });

  res.status(200).json({
    sucess: true,
    message: "User Login Successfully",
    token: `Bearer ${token}`,
  });
};

/* user Logout */
const logoutUser = async (req, res) => {

  console.log("logout not working..??");

  console.log(req.user);
  await UserModel.findByIdAndUpdate(req.user._id, { token: null });

  res.clearCookie("token", {
    secure: true, // for HTTPS
    sameSite: "none", // for cross-site cookies
    path: "/",
  });

  res.json({
    success: true,
    message: "User LogOut Successfully",
  });
};

const userController = {
  addNewAdmin: catchAsyncFun(addNewAdmin),
  addNewDoctor: catchAsyncFun(addNewDoctor),
  addNewPatient: catchAsyncFun(addNewPatient),
  getProfile: catchAsyncFun(getProfile),
  loginUser: catchAsyncFun(loginUser),
  logoutUser: catchAsyncFun(logoutUser),
  allDoctors: catchAsyncFun(allDoctors)
};

module.exports = userController;
