const { User, joiLoginSchema } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Forbidden } = require("http-errors");
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
// const uid = require("uid");

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
      throw new Forbidden("Unknown email");
    }

    const passCheck = bcrypt.compareSync(password, user.password);

    if (!passCheck) {
      throw new Forbidden("Password is wrong");
    }

    const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, {
      expiresIn: "10min",
    });

    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
      expiresIn: "30d",
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { refreshTokens: refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      token: accessToken,
      refreshToken,
      user: {
        email: email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
