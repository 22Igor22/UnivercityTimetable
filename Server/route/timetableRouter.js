const express = require("express");
const timetableController = require("../controller/timetableController.js");
const router = express.Router();

router.use("/admin/updTT", timetableController.checkAdminRole(), timetableController.updTimeTable)
router.use("/admin/addTT", timetableController.checkAdminRole(), timetableController.addTimeTable)
router.use("/admin/delTT", timetableController.checkAdminRole(), timetableController.delTimeTable)
router.use("/timetable", timetableController.checkRole(), timetableController.timeTable);
router.use("/searchInTT", timetableController.checkRole(), timetableController.searchInTT);
router.use("/note", timetableController.checkUserRole(), timetableController.note);
router.use("/doNote", timetableController.checkUserRole(), timetableController.doNote);

module.exports = router;