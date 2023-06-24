const { User, joiUpdateNameSchema } = require("../../models/userSchema");

const updateName = async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;

  try {
    const { error } = joiUpdateNameSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { name },
      {
        new: true,
      }
    );

    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateName;
