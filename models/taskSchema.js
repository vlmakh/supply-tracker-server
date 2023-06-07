const { Schema, model } = require("mongoose");
const Joi = require("joi");

const taskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTaskSchema = Joi.object({
  name: Joi.string().required(),
  todos: Joi.array().required(),
  color: Joi.string().required(),
});

const joiTaskStatusSchema = Joi.object({
  color: Joi.boolean().required(),
});

const Task = model("task", taskSchema);

module.exports = {
  Task,
  joiTaskSchema,
  joiTaskStatusSchema,
};
