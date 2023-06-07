const { User } = require("../../models/userSchema");
const { NotFound, BadRequest } = require("http-errors");

const verifyBeforeSignup = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    await User.findByIdAndUpdate(user._id, { verify: true });

    const data = {
      message: `Your email was confirmed successfully, now you can login`,
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = verifyBeforeSignup;
