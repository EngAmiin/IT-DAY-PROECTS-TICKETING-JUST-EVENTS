const exp = require("express");
const { readAllProjectTypes } = require("../controllers/projectTypes");

const router = exp.Router();

router.get("/types/all", readAllProjectTypes);
module.exports = router;
