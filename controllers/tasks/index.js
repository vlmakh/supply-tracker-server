const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const getTasksByRange = require("./getTasksByRange");
const getUncompletedTasksByRange = require("./getUncompletedTasksByRange");
const getTasksByDateOrder = require("./getTasksByDateOrder");
const getTasksByDateInvoice = require("./getTasksByDateInvoice");
const getTasksByDatePayment = require("./getTasksByDatePayment");
const getTasksByDateETD = require("./getTasksByDateETD");
const getTasksByDateETA = require("./getTasksByDateETA");
const updateTask = require("./updateTask");
const updateTaskStatus = require("./updateTaskStatus");
const updateTaskOwner = require("./updateTaskOwner");

module.exports = {
  addTask,
  deleteTask,
  getTasksByRange,
  getUncompletedTasksByRange,
  getTasksByDateOrder,
  getTasksByDateInvoice,
  getTasksByDatePayment,
  getTasksByDateETD,
  getTasksByDateETA,
  updateTask,
  updateTaskStatus,
  updateTaskOwner,
};
