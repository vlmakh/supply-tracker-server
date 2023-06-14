const getTasks = require("./getTasks");
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const updateTask = require("./updateTask");
const updateTaskStatus = require("./updateTaskStatus");
const getTasksByRange = require("./getTasksByRange");

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  getTasksByRange,
};
