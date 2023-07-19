const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { ACCESS_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Unauthorized by Bearer");
    }

    const { id } = jwt.verify(token, ACCESS_SECRET);

    const user = await User.findById(id);

    if (!user) {
      throw new Unauthorized("Unauthorized by user");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
