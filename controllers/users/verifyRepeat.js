const { User } = require("../../models/userSchema");
const { NotFound, Conflict } = require("http-errors");
const sendEmail = require("../../helpers/sendEmail");

const verifyRepeat = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verify) {
      throw new Conflict("User is already verified");
    }

    await sendEmail({
      to: `${email}`,
      from: "vlmakh@meta.ua",
      subject: "Confirm registration in MyNotes",
      html: `<a href="http://vlmakh.github.io/my-notes-react/verify/${user.verificationToken}" target="_blank">To confirm ${email} please follow this link</a>`,
    });

    const data = {
      message: "Verification email sent",
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = verifyRepeat;
