const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const refresh = require("./refresh");
const getUsers = require("./getUsers");

const updateName = require("./updateName");
const updatePass = require("./updatePass");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  refresh,
  getUsers,
  updateName,
  updatePass,
};
