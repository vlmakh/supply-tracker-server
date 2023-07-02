const getTasks = require("./getTasks");
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const updateTask = require("./updateTask");
const updateTaskStatus = require("./updateTaskStatus");
const getTasksByRange = require("./getTasksByRange");
const getTasksByDateOrder = require("./getTasksByDateOrder");
const getTasksByDateInvoice = require("./getTasksByDateInvoice");
const getTasksByDatePayment = require("./getTasksByDatePayment");
const getTasksByDateETD = require("./getTasksByDateETD");
const getTasksByDateETA = require("./getTasksByDateETA");

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  getTasksByRange,
  getTasksByDateOrder,
  getTasksByDateInvoice,
  getTasksByDatePayment,
  getTasksByDateETD,
  getTasksByDateETA,
};
