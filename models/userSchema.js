const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 4,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshTokens: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ["MANAGER", "HEAD", "ADMIN"],
      required: true,
      default: "MANAGER",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiUpdatePassSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

const joiUpdateNameSchema = Joi.object({
  name: Joi.string().min(4).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegSchema,
  joiLoginSchema,
  joiUpdatePassSchema,
  joiUpdateNameSchema,
};
