const express = require("express");
const authController = require("../controller/authController");
const  authRouter = express.Router();

authRouter.use("/login", authController.login);
authRouter.use("/register", authController.register);
authRouter.use("/logout", authController.logout);

module.exports = authRouter;