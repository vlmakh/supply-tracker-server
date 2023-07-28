const { User } = require("../../models/userSchema");

const getUsers = async (req, res, next) => {
  const { role } = await req.user;

  if (role === "HEAD" || role === "ADMIN") {
    try {
      const data = await User.find({}, { name: 1 });

      res.json(data);
    } catch (error) {
      next(error);
    }
  } else {
    res.json([]);
  }
};

module.exports = getUsers;
