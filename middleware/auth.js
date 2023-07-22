const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = process.env;
const { NotFound, Unauthorized } = require("http-errors");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    if (!token) {
      throw new Unauthorized("Unauthorized");
    }

    const { id } = jwt.verify(token, ACCESS_SECRET);

    const user = await User.findById(id);

    if (!user) {
      throw new NotFound("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 404;
    }

    if (error.message === "jwt expired") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
