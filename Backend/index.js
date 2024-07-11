const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./Routes/user.routes");
const appointmentRoutes = require("./Routes/appointment.routes");
const { errorHandler } = require("./Middleware/errorHandler");

const app = express();
app.use(express.json());

const Port = process.env.PORT || 10000;

mongoose
    .connect("mongodb://localhost:27017/hospitalManagement")
    .then(() => console.log("MongoDb connection stablish successfully"))
    .catch(() => console.log("Error, while connecting with mongoDb"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/appointment", appointmentRoutes);

app.use(errorHandler);

app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "path not found",
    });
});

app.listen(Port, () => console.log(`Server is up and running on port ${Port}`));
