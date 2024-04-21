const exp = require("express");
const { createMessage, readMessages, deleteMessage } = require("../controllers/message");

const router = exp.Router();
router.get("/", readMessages);
router.delete("/:id", deleteMessage);
router.post("/", createMessage);

module.exports = router;
