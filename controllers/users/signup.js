const { User, joiRegSchema } = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { uid } = require("uid");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res, next) => {
  try {
    const { error } = joiRegSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email: ${email} in use`);
    }

    const verificationToken = uid();

    await sendEmail({
      to: `${email}`,
      from: "vlmakh@meta.ua",
      subject: "Confirm registration in MyNotes",
      html: `<a href="http://vlmakh.github.io/my-notes-react/verify/${verificationToken}" target="_blank">To confirm ${email} please follow this link</a>`,
    });

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const data = await User.create({
      name,
      email,
      password: hashPassword,
      verificationToken,
    });

    res.status(201).json({
      message: "User registered successfully, verification email sent",
      name: data.name,
      email: data.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
