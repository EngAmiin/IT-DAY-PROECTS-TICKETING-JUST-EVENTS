const exp = require('express');
const { registerStudent, authenticate, readProjectsForUsers, setupProject } = require('../controllers/student.control');
const router = exp.Router();


router.get("/projects/:id", readProjectsForUsers);
router.get("/:id_card/:password", authenticate);
router.post("/", registerStudent);
router.post("/submitProject", setupProject);




module.exports = router