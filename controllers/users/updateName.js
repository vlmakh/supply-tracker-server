const { User, joiUpdateNameSchema } = require("../../models/userSchema");
const { NotFound } = require("http-errors");

const updateName = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const { error } = joiUpdateNameSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name },
      {
        new: true,
      }
    );

    if (!user) {
      throw NotFound(`User with ${email} was not found`);
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateName;
