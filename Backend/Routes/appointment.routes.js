const express = require("express");

const AppointmentController = require("../Controllers/appointment.controller");
const { createAppointment, getAllAppointments, appointmentEdit } = AppointmentController;

const passport = require("../Middleware/userMiddleware");
const Authorization = require("../Middleware/authorization");

const appointmentRoutes = express.Router();

appointmentRoutes.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    createAppointment
);

appointmentRoutes.get(
    "/allAppointments",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN", "DOCTOR"]),
    getAllAppointments
);

appointmentRoutes.put(
    "/edit/:id",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN", "DOCTOR", "PATIENT"]),
    appointmentEdit
);

module.exports = appointmentRoutes;
