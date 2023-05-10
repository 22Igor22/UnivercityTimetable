const express = require("express");
const timetableController = require("../controller/timetableController.js");
const router = express.Router();

router.use("/user/checkInfo", timetableController.checkInfo);
router.use("/user/updInfo", timetableController.updInfo);
router.use("/admin/updTT", timetableController.updTimeTable)
router.use("/timetable", timetableController.timeTable);
router.use("/searchInTT", timetableController.searchInTT);

module.exports = router;