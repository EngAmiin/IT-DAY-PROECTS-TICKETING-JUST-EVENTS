const exp = require("express");
const { readUsers, removeUser, findUser, readStudents } = require("../controllers/users.controller");
const router = exp.Router();
router.get("/:username/:password", findUser);
router.delete("/:uid", removeUser);
router.get("/read", readStudents);
router.get("/", readUsers);

module.exports = router;
