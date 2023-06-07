const express = require("express");
const { notes: ctrl } = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, ctrl.getNotes);

router.post("/", auth, ctrl.addNote);

router.delete("/:taskId", auth, ctrl.deleteNote);

router.put("/:taskId/", auth, ctrl.updateTask);

router.patch("/:taskId/status", auth, ctrl.updateTaskStatus);

module.exports = router;
