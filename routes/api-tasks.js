const express = require("express");
const { tasks: ctrl } = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, ctrl.getTasks);

router.post("/", auth, ctrl.addTask);

router.delete("/:taskId", auth, ctrl.deleteTask);

router.put("/:taskId/", auth, ctrl.updateTask);

router.patch("/:taskId/status", auth, ctrl.updateTaskStatus);

module.exports = router;
