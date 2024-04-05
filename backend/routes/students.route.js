const exp = require('express');
const { registerStudent, authenticate, readProjectsForUsers, setupProject, removeProject, readTypes } = require('../controllers/student.control');
const router = exp.Router();

router.get("/readTypes", readTypes);
router.get("/projects/:id", readProjectsForUsers);
router.get("/:id_card/:password", authenticate);

router.delete("/remove/:projectId/:studentId", removeProject);
router.post("/", registerStudent);
router.post("/submitProject", setupProject);




module.exports = router