const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const verifyBeforeSignup = require("./verifyBeforeSignup");
const verifyRepeat = require("./verifyRepeat");
const updateName = require("./updateName");
const updatePass = require("./updatePass");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  verifyBeforeSignup,
  verifyRepeat,
  updateName,
  updatePass,
};
