const express = require("express");
const { tasks: ctrl } = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, ctrl.getTasks);

router.get("/range", auth, ctrl.getTasksByRange);
router.get("/uncompleted", auth, ctrl.getUncompletedTasksByRange);
router.get("/dateOrder", auth, ctrl.getTasksByDateOrder);
router.get("/dateInvoice", auth, ctrl.getTasksByDateInvoice);
router.get("/datePayment", auth, ctrl.getTasksByDatePayment);
router.get("/dateETD", auth, ctrl.getTasksByDateETD);
router.get("/dateETA", auth, ctrl.getTasksByDateETA);

router.post("/", auth, ctrl.addTask);

router.delete("/:taskId", auth, ctrl.deleteTask);

router.put("/:taskId/", auth, ctrl.updateTask);

router.patch("/:taskId/status", auth, ctrl.updateTaskStatus);

module.exports = router;
