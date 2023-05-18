const express = require("express");
const chatController = require("../controller/chatController");
const  chatRouter = express.Router();

chatRouter.use("/userName", chatController.userName);
chatRouter.use("/messages", chatController.messages);
chatRouter.use("/addToHistory", chatController.addToHistory);

module.exports = chatRouter;