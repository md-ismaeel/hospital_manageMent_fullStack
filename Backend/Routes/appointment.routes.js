const express = require("express");

const AppointmentController = require("../Controllers/appointment.controller");
const { createAppointment, getAllAppointments } = AppointmentController;

const passport = require("../Middleware/userMiddleware");
const Authorization = require("../Middleware/authorization");

const appointmentRoutes = express.Router();

appointmentRoutes.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    createAppointment
);

appointmentRoutes.post(
    "/allAppointments",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN", "DOCTOR", "PATIENT"]),
    getAllAppointments
);

module.exports = appointmentRoutes;
