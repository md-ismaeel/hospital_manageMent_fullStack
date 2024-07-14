const MessageModel = require("../Models/message.model");
const { catchAsyncFun } = require("../Middleware/errorHandler")

const messageSend = async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: "All field is required!!"
        })
    }

    const newMessage = await MessageModel.create({
        ...req.body
    })

    res.status(200).json({
        success: true,
        message: "message sent successfully!!",
        results: newMessage
    })
}

const getAllMessages = async (req, res) => {
    const messages = await MessageModel.find();

    res.status(200).json({
        success: true,
        message: "All message fetched!!",
        results: messages
    })
}

const MessageController = {
    messageSend: catchAsyncFun(messageSend),
    getAllMessages: catchAsyncFun(getAllMessages)
}

module.exports = MessageController;
