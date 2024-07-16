const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config();

const userRoutes = require("./Routes/user.routes");
const appointmentRoutes = require("./Routes/appointment.routes");
const messageRoutes = require("./Routes/message.routes")
const { errorHandler } = require("./Middleware/errorHandler");

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://hospital-management-pearl-alpha.vercel.app",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())

// Added this line to handle preflight requests
app.options('*', cors(corsOptions));

const Port = process.env.PORT || 10000;
const mongoDbUri = process.env.MONGODB_URI

mongoose
    .connect(mongoDbUri)
    .then(() => console.log("MongoDb connection stablish successfully"))
    .catch(() => console.log("Error, while connecting with mongoDb"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/appointment", appointmentRoutes);
app.use("/api/v1/user/", messageRoutes)

app.use(errorHandler);

app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "path not found",
    });
});

app.listen(Port, () => console.log(`Server is up and running on port ${Port}`));
