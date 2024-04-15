const exp = require("express");
const { createMessage } = require("../controllers/message");

const router = exp.Router();
router.post("/", createMessage);

module.exports = router;
