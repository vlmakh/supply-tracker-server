const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
const { NotFound, Forbidden } = require("http-errors");

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = await req.cookies;

    if (!refreshToken) {
      throw new NotFound("Invalid refreshToken");
    }

    const { id } = jwt.verify(refreshToken, REFRESH_SECRET);

    const user = await User.findById(id);

    const isRefreshTokenAllowed = user.refreshTokens.includes(refreshToken);

    if (!isRefreshTokenAllowed) {
      throw new Forbidden("Access is denied");
    }

    const accessToken = jwt.sign({ id }, ACCESS_SECRET, {
      expiresIn: "1min",
    });

    const newRefreshToken = jwt.sign({ id }, REFRESH_SECRET, {
      expiresIn: "30d",
    });

    await User.findByIdAndUpdate(id, {
      $push: { refreshTokens: newRefreshToken },
    });

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      token: accessToken,
      refreshToken: newRefreshToken,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = refresh;
