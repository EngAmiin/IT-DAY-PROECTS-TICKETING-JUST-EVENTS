const exp = require("express");
const { readEvents, projectsByEvent, readAllProjects, checkRegistrationDueDate } = require("../controllers/events");

const router = exp.Router();

router.get("/event/:id", projectsByEvent);
router.get("/", readEvents);
router.get("/all", readAllProjects);
router.get("/checkDueDate", checkRegistrationDueDate);

module.exports = router;
