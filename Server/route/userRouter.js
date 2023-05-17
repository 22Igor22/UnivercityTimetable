const express = require("express");
const userController = require("../controller/userController.js");
const { checkUserRole } = require("../controller/timetableController.js");
const router = express.Router();

router.use("/checkInfo", userController.checkUserRole(), userController.checkInfo);
router.use("/updInfo", userController.checkUserRole(), userController.updInfo);

module.exports = router;