const exp = require('express');
const { registerStudent, authenticate } = require('../controllers/student.control');
const router = exp.Router();



router.post("/", registerStudent);
router.get("/:id_card/:password", authenticate);


module.exports = router