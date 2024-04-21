const exp = require("express");
const { readEvents, projectsByEvent, readAllProjects, checkRegistrationDueDate, readAllEvents, createEvent, updateEventStatus } = require("../controllers/events");

const router = exp.Router();

router.get("/event/:id/:type", projectsByEvent);
router.get("/", readEvents);
router.get("/all", readAllProjects);
router.get("/allEvents", readAllEvents);
router.get("/checkDueDate", checkRegistrationDueDate);
router.post("/create", createEvent);
router.post("/status", updateEventStatus);

module.exports = router;
