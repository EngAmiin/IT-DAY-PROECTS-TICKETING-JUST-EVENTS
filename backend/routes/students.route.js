const exp = require("express");
const {
  registerStudent,
  authenticate,
  readProjectsForUsers,
  setupProject,
  removeProject,
  readTypes,
  readProjectsForAdmins,
  updateStatus,
  readActiveEvent,
  fetchStudentRangeByEvent,
  readSemesters,
} = require("../controllers/student.control");
const router = exp.Router();


router.get("/projects/:id", readProjectsForUsers);
router.get("/eventRange/:id", fetchStudentRangeByEvent);
router.get("/:id_card/:password", authenticate);
router.delete("/remove/:projectId/:studentId", removeProject);


router.get("/semesters", readSemesters);
router.get("/readTypes", readTypes);
router.get("/active-event", readActiveEvent);
router.get("/view-projects", readProjectsForAdmins);
router.post("/", registerStudent);
router.post("/submitProject", setupProject);
router.post("/updateStatus", updateStatus);

module.exports = router;
