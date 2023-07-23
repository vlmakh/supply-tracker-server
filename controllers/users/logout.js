const { User } = require("../../models/userSchema");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { refreshTokens: [] });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
