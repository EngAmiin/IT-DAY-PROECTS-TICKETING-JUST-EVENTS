const exp = require('express');
const { registerStudent, authenticate, readProjectsForUsers, setupProject, removeProject, readTypes, readProjectsForAdmins, updateStatus } = require('../controllers/student.control');
const router = exp.Router();

router.get("/readTypes", readTypes);
router.get("/view-projects", readProjectsForAdmins);
router.get("/projects/:id", readProjectsForUsers);
router.get("/:id_card/:password", authenticate);

router.delete("/remove/:projectId/:studentId", removeProject);
router.post("/", registerStudent);
router.post("/submitProject", setupProject);
router.post("/updateStatus", updateStatus);




module.exports = router