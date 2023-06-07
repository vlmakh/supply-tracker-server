const { User, joiLoginSchema } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Unauthorized } = require("http-errors");
const { SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Unknown email");
    }

    const passCheck = bcrypt.compareSync(password, user.password);

    if (!passCheck) {
      throw new Unauthorized("Password is wrong");
    }

    if (!user.verify) {
      throw new Unauthorized("Email is not verified yet");
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
