const express = require("express");
const MessageController = require("../Controllers/message.controller");
const passport = require("../Middleware/userMiddleware");
const Authorization = require("../Middleware/authorization");

const { messageSend, getAllMessages } = MessageController;

const messageRoutes = express.Router();

messageRoutes.post("/sendMessage", messageSend);

messageRoutes.get(
    "/allMessages",
    passport.authenticate("jwt", { session: false }),
    Authorization(["ADMIN"]),
    getAllMessages
);

module.exports = messageRoutes;
