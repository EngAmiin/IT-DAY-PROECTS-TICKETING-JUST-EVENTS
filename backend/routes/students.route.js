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
  readCurrentUser,
  updateProfile,
  geCurrentPassword,
  fetchProjectsByType,
  fetchCurrentStudentsByEvent,
  fetchEventReport,
  deleteStudent,
  getNumberOfProjectsByStudent,
} = require("../controllers/student.control");
const router = exp.Router();

router.get("/projects/:id", readProjectsForUsers);
router.get("/checkPass/:id", geCurrentPassword);
router.get("/current/:id", readCurrentUser);
router.get("/eventRange/:id", fetchStudentRangeByEvent);
router.get("/:id_card/:password", authenticate);
router.get("/checkProject/:eventId/:studentId", getNumberOfProjectsByStudent);
router.delete("/remove/:student", deleteStudent);


router.get("/semesters", readSemesters);
router.get("/chart/projects/projectTypes", fetchProjectsByType);
router.get("/chart/projects/event", fetchCurrentStudentsByEvent);
router.get("/chart/projects/event-report", fetchEventReport);
router.get("/readTypes", readTypes);
router.get("/active-event", readActiveEvent);
router.get("/view-projects", readProjectsForAdmins);


router.post("/registerStudent", registerStudent);
router.post("/submitProject", setupProject);
router.post("/updateStatus", updateStatus);
router.post("/profile", updateProfile);

router.delete("/remove/:projectId/:studentId", removeProject);

module.exports = router;
