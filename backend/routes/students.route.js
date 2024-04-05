const exp = require('express');
const { registerStudent } = require('../controllers/student.control');
const router = exp.Router();



router.post("/", registerStudent);


module.exports = router