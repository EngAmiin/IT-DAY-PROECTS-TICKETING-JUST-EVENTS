const exp = require("express");
const { readEvents, projectsByEvent, readAllProjects } = require("../controllers/events");

const router = exp.Router();

router.get("/event/:id", projectsByEvent);
router.get("/", readEvents);
router.get("/all", readAllProjects);

module.exports = router;
